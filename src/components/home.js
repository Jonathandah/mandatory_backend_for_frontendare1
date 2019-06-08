import React, { useState, useEffect, useReducer } from "react";
import { Redirect } from "react-router-dom";
import { login$, updateLogin } from "../store/storeLogin";
import { user$, updateUser } from "../store/storeUser";
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
  let [roomName, updateRoomName] = useState("");
  let [chatRoomData, updateChatRoomData] = useState(null); //alla chatroom som kommer att listas vid sidebaren.
  //let [login, updateLogin] = useState(login$.value);
  let [currentRoom, updateCurrentRoom] = useState(null);

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

  function loadRoom(e) {
    let roomId = e.target.id;
    console.log(roomId);
    axios
      .get(`/chats/${roomId}`)
      .then(response => {
        console.log(response);
        updateCurrentRoom(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function deleteRoom(e) {
    let roomId = e.target.value;
    axios
      .delete(`/chats/${roomId}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function addRoom(e) {
    axios
      .post("/chats/add", { name: roomName })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function logout(e) {
    updateLogin(null);
    updateUser(null);
  }

  if (!login$.value) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="Home">
      {state.showModal ? (
        <Modal
          dispatch={dispatch}
          updateRoomName={updateRoomName}
          addRoom={addRoom}
          roomName={roomName}
        />
      ) : null}
      <header className="Home__header">
        <h2 className="Home__header__text">Chat</h2>
        <p className="Home__header__user">User: {user$.value}</p>
        <button className="Home__header__logout" onClick={logout}>
          Logout
        </button>
      </header>
      <main className="Home__main">
        <Sidebar
          dispatch={dispatch}
          chatRoomData={chatRoomData}
          loadRoom={loadRoom}
          deleteRoom={deleteRoom}
        />
        <Chat currentRoom={currentRoom} />
      </main>
    </div>
  );
}

export default Home;
