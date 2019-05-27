const express = require("express");
const uuid = require("uuid/v1");
const app = express();
const port = 3000;

app.use(express.json());

let user;
let chatRooms = [];

app.post("/chat", (req, res) => {
  //skapa nytt rum
  let body = req.body;
  let chatRoom = {
    id: uuid(),
    name: body.name,
    array: []
  };
  chatRooms.push(chatRoom);
  res.status("200").send(chatRoom);
});

app.post("/chat/:id/message", (req, res) => {
  //posta nytt meddelande
  let id = req.params.id;
  let body = req.body;
  for (let index in chatRooms) {
    if (chatRooms[index].id === id) {
      let message = {
        from: user,
        value: body.value,
        id: uuid()
      };
      chatRooms[index].array.push(message);
      res.status(200).send(message);
      return;
    }
  }
  res.status(404).end();
});

app.post("/auth", (req, res) => {
  if (req.bod.user) {
    user = req.body.user;
    res.status(200).send(user);
  }
  res.status(401).end();
});

app.delete("/chat/:id", (req, res) => {
  let id = req.params.id;
  // set chatroom to find id method, then check if it doesent return -1 and THEN splice chatRooms on index
  for (let index in chatRooms) {
    if (chatRooms[index].id === id) {
    }
  }
});

app.get("/", (req, res) => {
  if (req.body) {
    // check if it works
    res.staus(200).send({ chatRooms: chatRooms });
  }
  res.status(500).end();
});

app.get("/chat/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let body = req.body;
  for (let index in chatRooms) {
    if (chatRooms[index].id === id) {
      res.status(200).send(chatRooms[index]);
      return;
    }
  }
  res.status(404).end();
});

app.listen(port, () => console.log("listening on port", port));
