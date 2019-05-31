const express = require("express");
const fs = require("fs");
const uuid = require("uuid/v1");
const history = require("./history.json");
const app = express();
const port = 8000;

app.use(express.json());

let user;

setInterval(() => {
  fs.writeFile("./history.json", JSON.stringify(history), function(err) {
    if (err) throw err;
    console.log("done with fs writeFile", history);
  });
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

app.post("/chats/:id/message", (req, res) => {
  //posta nytt meddelande
  let id = req.params.id;
  let body = req.body;
  for (let index in history.chatRooms) {
    if (history.chatRooms[index].id === id) {
      let message = {
        from: user,
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

app.post("/login", (req, res) => {
  console.log(req.body.user);
  if (req.body.user) {
    user = req.body.user;
    res.status(200).send(user);
  }
  res.status(401).end();
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
