import React from "react";
import "./css/modal.css";
function Modal(props) {
  return (
    <div className="Modal">
      <main className="Modal__container">
        <header className="Modal__container__header">
          <h3 className="Modal__container__header__text">Add Chatroom</h3>
        </header>
        <div className="Modal__container__content">
          <button
            className="Modal__container__content__cancel"
            onClick={() => props.dispatch({ type: "show_modal" })}
          >
            Cancel
          </button>
          <button className="Modal__container__content__submit">Submit</button>
        </div>
      </main>
    </div>
  );
}

export default Modal;
