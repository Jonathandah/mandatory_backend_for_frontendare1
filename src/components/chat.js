import React, { useState } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { user$ } from "../store/storeUser";
import "./css/chat.css";

function listMessages(message) {
  return (
    <li key={message.id} className="Chat__messageList__item">
      <p className="Chat__messageList__item__user">{message.from}</p>
      <p className="Chat__messageList__item__text">{message.value}</p>
    </li>
  );
}

function Chat(props) {
  let [message, updateMessage] = useState("");
  let currentRoom = props.currentRoom;

  function writeMessage(e) {
    updateMessage(e.target.value);
  }

  function sendMessage() {
    axios(`/chats/${currentRoom.id}/message`, {
      user: user$,
      value: message
    }).then(response => {
      console.log(response);
    });
  }

  return (
    <div className="Chat">
      <header className="Chat__header">
        <h2 className="Chat__header__title">
          {!currentRoom ? null : currentRoom.name}
        </h2>
      </header>
      <main className="Chat__main">
        <ul className="Chat__main__messagesList">
          {!currentRoom
            ? null
            : currentRoom.arrayMessages.map(message => listMessages(message))}
        </ul>
      </main>

      <div className="Chat__inputField">
        <input
          className="Chat__inputField__input"
          onChange={writeMessage}
          value={message}
        />
        <button className="Chat__inputField__send" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
