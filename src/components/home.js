import React, { useState, useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { login$, updateUserLogin } from "../store/storeLogin";
import axios from "axios";
import "./css/home.css";
import Modal from "./modal";
import Sidebar from "./sidebar";
import Chat from "./chat";

function reducer(state, action) {
  switch (action.type) {
    case "show_modal":
      return {
        ...state,
        showModal: !state.showModal ? true : false
      };
    default:
      console.log("something went wrong");
      return;
  }
}

function Home() {
  //let [roomName, updateRoomName] = useState("nameless :(");
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

  if (!login) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="Home">
      {state.showModal ? <Modal dispatch={dispatch} /> : null}
      <header className="Home__header">
        <h2 className="Home__header__text">Chat</h2>
      </header>
      <main className="Home__main">
        <Sidebar dispatch={dispatch} chatRoomData={chatRoomData} />
        <Chat />
      </main>
    </div>
  );
}

export default Home;
