import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { login$, updateUserLogin } from "../store/storeLogin";
import axios from "axios";
import "./css/home.css";

function modal() {
  return (
    <div className="modal">
      <main className="modal__container">
        <header className="modal__container__header">
          <h3 className="modal__container__header__text">Add Chatroom</h3>
        </header>
        <div className="modal__container__" />
      </main>
    </div>
  );
}

function Home() {
  let [roomName, updateRoomName] = useState("nameless :(");
  let [chatRoomData, updateChatRoomData] = useState(null);
  let [login, updateLogin] = useState(login$.value);
  let [showModal, updateShowModal] = useState(false);

  axios
    .get("/")
    .then(response => {
      console.log(response);
      updateChatRoomData(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  /*
  useEffect(() => {
    // håller koll på om url:n har bytt adress, uppdaterar isåfall med nya filer för just den andressen
    let subscriptionLogin = login$.subscribe(login => {
      updateUserLogin(login);
    });

    return () => {
      subscriptionLogin.unsubscribe();
    };
  }, []); //vad useEffect håller koll på
*/

  function listRooms(chatRoom) {
    return (
      <li key={chatRoom.id}>
        <Link path={`/${chatRoom.id}`}>{roomName}</Link>
      </li>
    );
  }

  if (!login) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="Home">
        {showModal ? modal() : null}
        <header className="Home__header">{<h2>Chat</h2>}</header>
        <main className="Home__main">
          <div className="Home__main__sidebar">
            <span className="Home__main__sidebar__header">
              <button
                className="Home__main__sidebar__header__createRoomButton"
                onClick={updateShowModal(true)}
              >
                +
              </button>
            </span>
            <ul className="Home__main__sidebar__list">
              {chatRoomData.map(chatroom => listRooms)}
            </ul>
          </div>
          <div className="Home__main__chat">{/*show chat*/}</div>
        </main>
      </div>
    </Router>
  );
}

export default Home;
