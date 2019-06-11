import React from "react";
import "./css/modal.css";
import { removePropertiesDeep } from "@babel/types";
function Modal(props) {
  return (
    <div className="Modal">
      <form className="Modal__container" onSubmit={props.addRoom}>
        <header className="Modal__container__header">
          <h3 className="Modal__container__header__text">Add Chatroom</h3>
        </header>
        <p className="Modal__container__text">Chatroom name:</p>
        {props.errMsg ? (
          <p className="Modal__container__text--error">This name is taken</p>
        ) : null}
        <input
          onChange={e => props.updateRoomName(e.target.value)}
          value={props.roomName}
        />
        <div className="Modal__container__content">
          <button
            className="Modal__container__content__cancel"
            onClick={() => {
              props.updateRoomName("");
              props.updateErrMsg(false);
              props.updateModal(false);
            }}
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
