import React, { useState, useEffect } from "react";
import {
  Route,
  Link,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import { login$, updateUserLogin } from "../store/storeLogin";
import "./css/home.css";

function Home() {
  let [roomName, updateRoomName] = useState("nameless :(");
  let [login, updateLogin] = useState(login$.value);
  /*
  useEffect(() => {
    // håller koll på om url:n har bytt adress, uppdaterar isåfall med nya filer för just den andressen
    let subscriptionLogin = login$.subscribe(login => {
      updateUserLogin(login);
    });

    return () => {
      subscriptionLogin.unsubscribe();
    };
  }, []); //vad useEffect håller koll på
*/

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
