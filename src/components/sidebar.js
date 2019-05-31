import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import "./css/sidebar.css";

function listRooms(chatRoom) {
  return (
    <li key={chatRoom.id}>
      <Link to={`/${chatRoom.id}`}>{chatRoom.name}</Link>
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
          ? props.chatRoomData.map(chatroom => listRooms(chatroom))
          : null}
      </ul>
    </div>
  );
}

export default Sidebar;
