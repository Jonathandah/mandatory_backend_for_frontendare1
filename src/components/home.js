import React, { useState, useEffect, useReducer } from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { login$, updateUserLogin } from "../store/storeLogin";
import axios from "axios";
import "./css/home.css";
import Modal from "./modal";
import { dispatch } from "rxjs/internal/observable/pairs";

function reducer(state, action) {
  switch (action.type) {
    case "show_modal":
      return {
        ...state,
        showModal: !state.showModal ? true : false
      };
  }
}

function Home() {
  let [roomName, updateRoomName] = useState("nameless :(");
  let [chatRoomData, updateChatRoomData] = useState(null);
  let [login, updateLogin] = useState(login$.value);

  let [state, dispatch] = useReducer(reducer, {
    showModal: false
  });

  useEffect(() => {
    axios
      .get("/chats")
      .then(response => {
        console.log(response);
        updateChatRoomData(response.data.chatRooms);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
    //gör till en komponent?
    return (
      <li key={chatRoom.id}>
        <Link to={`/${chatRoom.id}`}>{chatRoom.name}</Link>
      </li>
    );
  }

  if (!login) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="Home">
        {state.showModal ? <Modal dispatch={dispatch} /> : null}
        <header className="Home__header">{<h2>Chat</h2>}</header>
        <main className="Home__main">
          <div className="Home__main__sidebar">
            <span className="Home__main__sidebar__header">
              <p className="Home__main__sidebar__header__title">Chats</p>
              <button
                className="Home__main__sidebar__header__createRoomButton"
                onClick={() => dispatch({ type: "show_modal" })}
              >
                +
              </button>
            </span>
            <ul className="Home__main__sidebar__list">
              {chatRoomData
                ? chatRoomData.map(chatroom => listRooms(chatroom))
                : null}
            </ul>
          </div>
          <div className="Home__main__chat">{/*show chat*/}</div>
        </main>
      </div>
    </Router>
  );
}

export default Home;
