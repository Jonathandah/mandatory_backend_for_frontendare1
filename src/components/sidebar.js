import React from "react";
import "./css/sidebar.css";

function listRooms(chatRoom, loadRoom, deleteRoom) {
  return (
    <li className="Sidebar__list__item" key={chatRoom.id}>
      <p
        className="Sidebar__list__item__name"
        onClick={loadRoom}
        id={chatRoom.id}
      >
        {chatRoom.name}
      </p>
      <button onClick={deleteRoom} value={chatRoom.id}>
        X
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
          onClick={() => props.updateModal(true)}
        >
          +
        </button>
      </span>
      <ul className="Sidebar__list">
        {props.chatRooms
          ? props.chatRooms.map(chatroom =>
              listRooms(chatroom, props.loadRoom, props.deleteRoom)
            )
          : null}
      </ul>
    </div>
  );
}

export default Sidebar;
