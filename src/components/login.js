import React, { useState } from "react";
import axios from "axios";
import { updateUser } from "../store/storeUser";
import { Redirect } from "react-router-dom";
import "./css/login.css";

function Login() {
  let [username, updateUsername] = useState("");
  let [login, updateLogin] = useState(false);
  let [openRegister, updateOpenRegister] = useState(false);
  let [errMsg, updateErrMsg] = useState(false);

  function changeUsername(e) {
    updateUsername(e.target.value);
  }

  function onRegister(e) {
    e.preventDefault();
    axios
      .post("/register", { user: username })
      .then(response => {
        updateOpenRegister(false);
        updateUsername("");
        updateErrMsg(false);
      })
      .catch(err => {
        if (err.response.status === 401) updateErrMsg(true);
      });
  }

  function onLogin(e) {
    e.preventDefault();
    axios
      .get(`/login/${username}`)
      .then(response => {
        updateUser(response.data);
        updateLogin(true);
      })
      .catch(err => {
        if (err.response.status === 401) updateErrMsg(true);
      });
  }

  function onCancel() {
    updateOpenRegister(false);
    updateUsername("");
    updateErrMsg(false);
  }

  return login ? (
    <Redirect to="/" />
  ) : (
    <div className="Login">
      {openRegister ? (
        <div className="Login__modal">
          <main className="Login__modal__content">
            <p className="Login__modal__content__text">Register</p>
            <form className="Login__modal__content__form" onSubmit={onRegister}>
              <p className="Login__modal__content__text">Username</p>
              {errMsg ? (
                <p className="Login__modal__content__text--error">
                  This name is already taken
                </p>
              ) : null}
              <input
                className="Login__modal__content__input"
                onChange={changeUsername}
              />
              <button
                className="Login__modal__content__registerButton"
                type="submit"
              >
                Register
              </button>
            </form>
            <button
              className="Login__modal__content__cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          </main>
        </div>
      ) : null}

      <div className="Login__container">
        <form className="Login__container__form" onSubmit={onLogin}>
          <p className="Login__container__text">Login</p>
          {errMsg ? (
            <p className="Login__container__text--error">User not found</p>
          ) : null}
          <input
            className="Login__container__input"
            onChange={changeUsername}
            value={username}
            required
          />
          <button className="Login__container__submitButton" type="submit">
            Login
          </button>
        </form>
        <div className="Login__container__box">
          <p className="Login__container__box__text">Don't have an account?</p>
          <button
            className="Login__container__box__modal"
            onClick={() => {
              updateErrMsg(false);
              !openRegister
                ? updateOpenRegister(true)
                : updateOpenRegister(false);
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
