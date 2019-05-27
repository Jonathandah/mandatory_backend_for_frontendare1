import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

function Home() {
  function createRoom() {}

  return (
    <Router>
      <div className="Home">
        <header className="Home__header">{/*header*/}</header>
        <main className="Home__main">
          <div className="Home__main__sidebar">
            <button classname="Home__main__sidebar__createRoomButton">+</button>
          </div>
          <div className="Home__main__chat">{/*show chat*/}</div>
        </main>
      </div>
    </Router>
  );
}

export default Home;
