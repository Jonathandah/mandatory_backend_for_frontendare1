import React, { useState } from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { login$ } from "../store/storeLogin";

function Home() {
  let [roomName, updateRoomName] = useState("nameless :(");
  let [login, updateLogin] = useState(login$.value);

  function createRoom() {
    return <Link path={`/${roomName}`}>{roomName}</Link>;
  }
  if (!login) {
    return <Redirect to="/login" />;
  }

  return (
    <Router>
      <div className="Home">
        <header className="Home__header">{/*header*/}</header>
        <main className="Home__main">
          <div className="Home__main__sidebar">
            <button className="Home__main__sidebar__createRoomButton">+</button>
          </div>
          <div className="Home__main__chat">{/*show chat*/}</div>
        </main>
      </div>
    </Router>
  );
}

export default Home;
