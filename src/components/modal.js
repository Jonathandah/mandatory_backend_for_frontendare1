import React from "react";
import "./css/modal.css";
function Modal(props) {
  return (
    <div className="Modal">
      <form className="Modal__container" onSubmit={props.addRoom}>
        <header className="Modal__container__header">
          <h3 className="Modal__container__header__text">Add Chatroom</h3>
        </header>
        <p>Chatroom name:</p>
        <input
          onChange={e => props.updateRoomName(e.target.value)}
          value={props.roomName}
        />
        <div className="Modal__container__content">
          <button
            className="Modal__container__content__cancel"
            onClick={() => props.updateModal(false)}
          >
            Cancel
          </button>
          <button className="Modal__container__content__submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
