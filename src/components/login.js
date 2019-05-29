import React, { useState } from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import axios from "axios";
import { login$ } from "../store/storeLogin.js";

function Login() {
  let [login, updateLogin] = useState(login$.value);
  let [username, updateUsername] = useState("");

  function changeUsername(e) {
    updateUsername(e.target.value);
    console.log(username);
  }
  function onSubmit(e) {
    e.preventDefault();
    axios.get("/").then(response => {
      console.log(response);
    });
  }

  return (
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
