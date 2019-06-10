const express = require("express");
const fs = require("fs");
const uuid = require("uuid/v1");
const history = require("./history.json");
const users = require("./users.json");
const socket = require("socket.io");

const app = express();
app.use(express.json());
const port = 8000;
const server = app.listen(port, () => console.log("listening on port", port));
const io = socket(server);

let userCount = 0;
/*
io.on("connection", socket => {
  userCount++;
  console.log(userCount);
  console.log("connection established - " + socket.id);

  socket.on("chat", data => {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("user-connect", data => {
    console.log(data);
    io.sockets.emit("user-connect", data);
  });

  socket.on("user-disconnect", data => {
    userCount--;
    io.sockets.emit("user-disconnect", data);
    console.log(userCount);
  });

  socket.on("join", data => {
    console.log(data);
    socket.join(data);
  });

  socket.on("leave", data => {
    socket.leave(data);
    console.log("2gsge");
  });

  socket.on("new_message", (data, cb) => {
    //https://socket.io/docs/rooms-and-namespaces/
    console.log(data);
    cb(data);
    socket.in(data.id).emit("new_message", data);
  });
});
*/
function writeFile(file) {
  if (file === "history") {
    fs.writeFile(`./history.json`, JSON.stringify(history), function(err) {
      if (err) throw err;
    });
  } else {
    fs.writeFile(`./users.json`, JSON.stringify(users), function(err) {
      if (err) throw err;
      console.log("done with fs writeFile", users);
    });
  }
}

setInterval(() => {
  writeFile("history");
}, 30000);

app.get("/", (req, res) => {
  //validering???
  res.status(200).send("connected");
});

app.get("/chats", (req, res) => {
  if (history) {
    res.status(200).send(history);
  }
  res.status(500).end();
});

app.get("/chats/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    for (let index in history.chatRooms) {
      if (history.chatRooms[index].id === id) {
        res.status(200).send(history.chatRooms[index]);
        return;
      }
    }
    res.status(404).end("room not found");
    return;
  }
  res.status(400).end();
});

app.get("/login/:userid", (req, res) => {
  let userId = req.params.userid;
  let userIdLetter = userId.charAt(0);

  if (userId) {
    if (users[userIdLetter]) {
      for (let user of users[userIdLetter]) {
        if (userId === user) {
          res.status(200).send(user);
          return;
        }
      }
      res.status(401).send("user not found");
      return;
    }
    res.status(401).send("user not found");
    return;
  }
  res.status(400).end();
});

app.post("/register", (req, res) => {
  let newUser = req.body.user;
  let newUserLetter = newUser.charAt(0);
  if (newUser) {
    if (users[newUserLetter]) {
      for (let user of users[newUserLetter]) {
        if (user === newUser) {
          res.status(401).send("this name is already taken");
          return;
        }
      }
      users[newUserLetter].push(newUser);
      res.status(201).send(newUser);
      writeFile();
      return;
    }
    users[newUserLetter] = [req.body.user];
    writeFile();
    res.status(201).send(newUser);
    return;
  }
  res.status(400).end();
});

app.post("/chats/add", (req, res) => {
  //skapa nytt rum
  //fixa valedering för värdena som skickas in och om man glömer att skicka in någon nyckel, gäller alla post anrop
  let body = req.body;
  if (body.name) {
    for (let room of history.chatRooms) {
      if (room.name === body.name) {
        res.status(409).send("room already exists");
        return;
      }
    }
    let chatRoom = {
      id: uuid(),
      name: body.name,
      uniqeUsers: [],
      arrayMessages: []
    };
    history.chatRooms.push(chatRoom);
    res.status(201).send(chatRoom);
    return;
  }
  res.status(400).end();
});

app.post("/chats/:roomId/message", (req, res) => {
  //posta nytt meddelande
  //skapa en array med unika användare
  let id = req.params.roomId;
  let body = req.body;

  if (body.user && body.value) {
    for (let index in history.chatRooms) {
      let room = history.chatRooms[index];
      if (room.id === id) {
        let message = {
          from: body.user,
          value: body.value,
          id: uuid()
        };
        if (!room.uniqeUsers.includes(body.user)) {
          room.uniqeUsers.push(body.user);
        }
        room.arrayMessages.push(message);
        res.status(201).send(message);
        io.emit("new_message", { id, message });
        return;
      }
    }
    res.status(404).send("room not found");
    return; //måste man ha en return för att resten av koden inte ska köras?
  }

  res.status(400).end();
});

app.delete("/chats/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  // set chatroom to find id method, then check if it doesent return -1 and THEN splice chatRooms on index
  if (id) {
    for (let index in history.chatRooms) {
      if (history.chatRooms[index].id === id) {
        history.chatRooms.splice(index, 1);
        res.status(200).end();
        return;
      }
    }
    res.status(404).send("room not found");
    return;
  }
  res.status(400).end();
});
