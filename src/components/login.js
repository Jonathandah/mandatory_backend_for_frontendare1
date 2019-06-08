import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { login$, updateLogin } from "../store/storeLogin";
import { updateUser } from "../store/storeUser";
import { Redirect } from "react-router-dom";

function reducer(state, action) {}

function Login() {
  let [username, setUsername] = useState("");
  let [login, setLogin] = useState(false);
  let [openRegister, updateOpenRegister] = useState(false);
  let [state, dispatch] = useReducer(reducer, {
    showModal: false
  });

  function changeUsername(e) {
    setUsername(e.target.value);
    console.log(username);
  }

  useEffect(() => {
    if (login$.value !== null) {
      setLogin(true);
    }
  }, []);

  function onRegister(e) {
    e.preventDefault();
    axios.post("/register", { user: username }).then(response => {
      console.log(response.data);
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    axios.get(`/login/${username}`).then(response => {
      console.log(response);
      updateUser(response.data);
      if (response.data === username) {
        updateLogin(true);
        setLogin(true);
      }
    });
  }

  return login ? (
    <Redirect to="/" />
  ) : (
    <div className="Login">
      {openRegister ? (
        <div>
          <p>Register</p>
          <form onSubmit={onRegister}>
            <p>Username</p>
            <input onChange={changeUsername} />
            <button type="submit">Register</button>
          </form>
        </div>
      ) : null}

      <p>Login</p>
      <form onSubmit={onSubmit}>
        <input onChange={changeUsername} value={username} required />
        <button type="submit">Login</button>
      </form>
      <button
        className="Login__register"
        onClick={() =>
          !openRegister ? updateOpenRegister(true) : updateOpenRegister(false)
        }
      >
        Register
      </button>
    </div>
  );
}

export default Login;
