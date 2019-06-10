import React, { useState } from "react";
import axios from "axios";
import { user$ } from "../store/storeUser";
import "./css/chat.css";

function listMessages(message) {
  if (user$.value === message.from) {
    return (
      <li
        key={message.id}
        className="Chat__main__messagesList__item--userMessage"
      >
        <p className="Chat__main__messagesList__item__user">{message.from}</p>
        <p className="Chat__main__messagesList__item__text">{message.value}</p>
      </li>
    );
  } else {
    return (
      <li key={message.id} className="Chat__main__messagesList__item">
        <p className="Chat__main__messagesList__item__user">{message.from}</p>
        <p className="Chat__main__messagesList__item__text">{message.value}</p>
      </li>
    );
  }
}

function listUsers(user) {
  return (
    <li className="Chat__sidebar__list__name" key={user}>
      {user}
    </li>
  );
}

function Chat(props) {
  let [sidebar, updateSidebar] = useState(false);
  let [message, updateMessage] = useState("");
  let currentRoom = props.currentRoom;

  function writeMessage(e) {
    updateMessage(e.target.value);
  }

  function sendMessage() {
    if (currentRoom) {
      axios
        .post(`/chats/${currentRoom.id}/message`, {
          user: user$.value,
          value: message
        })
        .then(response => {
          console.log(response);
          updateMessage("");
          /*
          props.socket.emit(
            "new_message",
            {
              ...response.data,
              id: currentRoom.id
            },
            function(res) {
              console.log(res);
            }
          );
          */
        });
    }
  }

  return (
    <div className="Chat">
      {!sidebar ? null : (
        <div className="Chat__sidebar">
          <ul className="Chat__sidebar__list">
            {!currentRoom
              ? null
              : currentRoom.uniqeUsers.map(user => listUsers(user))}
          </ul>
        </div>
      )}
      <header className="Chat__header">
        {!currentRoom ? null : (
          <>
            <h2 className="Chat__header__title">{currentRoom.name}</h2>
            <button
              className="Chat__header__info"
              onClick={() =>
                !sidebar ? updateSidebar(true) : updateSidebar(false)
              }
            >
              i
            </button>
          </>
        )}
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
