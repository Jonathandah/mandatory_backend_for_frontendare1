const express = require("express");
const fs = require("fs");
const uuid = require("uuid/v1");
const history = require("./history.json");
const users = require("./users.json");
const app = express();
const port = 8000;

app.use(express.json());

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

app.post("/chats/add", (req, res) => {
  //skapa nytt rum
  //fixa valedering för värdena som skickas in och om man glömer att skicka in någon nyckel, gäller alla post anrop
  let body = req.body;
  let chatRoom = {
    id: uuid(),
    name: body.name,
    arrayMessages: []
  };
  history.chatRooms.push(chatRoom);
  res.status("200").send(chatRoom);
});

app.post("/chats/:roomId/message", (req, res) => {
  //posta nytt meddelande
  let id = req.params.roomId;
  let body = req.body;
  for (let index in history.chatRooms) {
    console.log("history", history.chatRooms[index].id);
    console.log("posting", id);
    if (history.chatRooms[index].id === id) {
      let message = {
        from: body.user,
        value: body.value,
        id: uuid()
      };
      history.chatRooms[index].arrayMessages.push(message);
      res.status(200).send(message);
      return;
    }
  }
  res.status(404).end();
});

app.post("/register", (req, res) => {
  console.log(req.body.user);
  let newUser = req.body.user;
  let newUserLetter = newUser.charAt(0);
  console.log(newUserLetter);
  if (users[newUserLetter]) {
    for (let user of users[newUserLetter]) {
      if (user === newUser) {
        res.status(400).send("this name is already taken");
        return;
      }
    }
    users[newUserLetter].push(newUser);
    res.status(200).send(newUser);
    writeFile();
    console.log(users);
    return;
  }
  users[newUserLetter] = [req.body.user];
  console.log(users);
  writeFile();
  res.status(200).send(newUser);
});

app.get("/login/:userid", (req, res) => {
  let userId = req.params.userid;
  let userIdLetter = userId.charAt(0);

  if (users[userIdLetter]) {
    for (let user of users[userIdLetter]) {
      if (userId === user) {
        res.status(200).send(user);
        return;
      }
    }
  } else {
    res.status(400).send("user not found");
  }
});

app.delete("/chats/:id", (req, res) => {
  let id = req.params.id;
  // set chatroom to find id method, then check if it doesent return -1 and THEN splice chatRooms on index
  for (let index in history.chatRooms) {
    if (history.chatRooms[index].id === id) {
    }
  }
});

app.get("/", (req, res) => {
  res.status(200).send("connected");
});

app.get("/chats", (req, res) => {
  console.log(history);
  res.status(200).send(history);
  //res.status(500).end();
});

app.get("/chats/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let body = req.body;
  for (let index in history.chatRooms) {
    if (history.chatRooms[index].id === id) {
      res.status(200).send(history.chatRooms[index]);
      return;
    }
  }
  res.status(404).end();
});

app.listen(port, () => console.log("listening on port", port));
