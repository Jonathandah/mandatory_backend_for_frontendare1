import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "./css/sidebar.css";

function listRooms(chatRoom, loadRoom) {
  return (
    <li key={chatRoom.id}>
      <button onClick={loadRoom} value={chatRoom.id}>
        {chatRoom.name}
      </button>
    </li>
  );
}

function Sidebar(props) {
  return (
    <div className="Sidebar">
      <span className="Sidebar__header">
        <p className="Sidebar__header__title">Chats</p>
        <button
          className="Sidebar__header__createRoomButton"
          onClick={() => props.dispatch({ type: "show_modal" })}
        >
          +
        </button>
      </span>
      <ul className="Sidebar__list">
        {props.chatRoomData
          ? props.chatRoomData.map(chatroom =>
              listRooms(chatroom, props.loadRoom)
            )
          : null}
      </ul>
    </div>
  );
}

export default Sidebar;
