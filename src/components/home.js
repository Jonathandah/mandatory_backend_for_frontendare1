import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { user$, updateUser } from "../store/storeUser";
import axios from "axios";
import io from "socket.io-client";
import "./css/home.css";
import Modal from "./modal";
import Sidebar from "./sidebar";
import Chat from "./chat";

const socket = io.connect("http://localhost:8000");

function Home() {
  let [roomName, updateRoomName] = useState("");
  let [chatRooms, updateChatRooms] = useState(null); //alla chatroom som kommer att listas vid sidebaren.
  let [currentRoom, updateCurrentRoom] = useState(null);
  let [loggedIn, updateLoggedIn] = useState(user$.value);
  let [modal, updateModal] = useState(false);

  useEffect(() => {
    if (currentRoom) {
      socket.on("new_message", data => {
        if (currentRoom.id === data.id) {
          console.log(data);
          updateCurrentRoom(c => {
            return {
              ...c,
              arrayMessages: c.arrayMessages.concat(data.message)
            };
          });
        }
      });
    }
    return () => {
      socket.off("new_message");
    };
  }, [currentRoom]);

  useEffect(() => {
    axios ///körs endast första gången.
      .get("/chats")
      .then(response => {
        console.log(response);
        updateChatRooms(response.data.chatRooms);
      })
      .catch(error => {
        console.log(error);
      });

    socket.on("new_room", data => {
      //körs resten av gångerna
      updateChatRooms(c => {
        //c==chatroom;
        if (c) {
          return c.concat(data.chatRoom);
        }
        return c;
      });
    });

    socket.on("delete_room", data => {
      updateChatRooms(data.chatRooms);
    });

    return () => {
      socket.off("new_room");
      socket.off("delete_room");
    };
  }, []);

  function loadRoom(e) {
    let roomId = e.target.id;
    socket.emit("join", roomId);
    console.log(roomId);
    axios
      .get(`/chats/${roomId}`)
      .then(response => {
        updateCurrentRoom(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function deleteRoom(e) {
    console.log("hafka kh");
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
    e.preventDefault();
    axios
      .post("/chats/add", { name: roomName })
      .then(response => {
        console.log(response.data);
        updateModal(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function logout(e) {
    updateUser(null);
    updateLoggedIn(null);
  }

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="Home">
      {modal ? (
        <Modal
          updateModal={updateModal}
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
          updateModal={updateModal}
          chatRooms={chatRooms}
          loadRoom={loadRoom}
          deleteRoom={deleteRoom}
        />
        <Chat currentRoom={currentRoom} socket={socket} />
      </main>
    </div>
  );
}

export default Home;
