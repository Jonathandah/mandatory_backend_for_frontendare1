import React, { useState, useEffect } from "react";
import axios from "axios";
import { login$, updateUserLogin } from "../store/storeLogin";
import { updateUser } from "../store/storeUser";
import { Redirect } from "react-router-dom";

function Login() {
  let [username, setUsername] = useState("");
  let [login, setLogin] = useState(false);

  function changeUsername(e) {
    setUsername(e.target.value);
    console.log(username);
  }

  useEffect(() => {
    if (login$.value !== null) {
      setLogin(true);
    }
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    axios.post("/login", { user: username }).then(response => {
      console.log(response);
      updateUser(response.data);
    });
    updateUserLogin(true);
    setLogin(true);
  }

  return login ? (
    <Redirect to="/" />
  ) : (
    <div className="Login">
      <p>Login</p>
      <form onSubmit={onSubmit}>
        <input onChange={changeUsername} value={username} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
