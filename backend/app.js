const express = require("express");
const uuid = require("uuid/v1");
const app = express();
const port = 8000;

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
  res.status(400).end();
});

app.post("/auth", (req, res) => {
  if (req.bod.user) {
    user = req.body.user;
    res.status(200).send(user);
  }
  res.status(401).end();
});

app.get("/", (req, res) => {
  res.staus(200).send("connected");
});

app.get("/chat/:id", (req, res) => {
  let id = parseInt(req.params.id);

  res.status(200).send(obj);
});

app.listen(port, () => console.log("listening on port", port));
