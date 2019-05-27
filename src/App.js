import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/login" component={login} />
        <Route path="/" component={home} />
      </div>
    </Router>
  );
}

export default App;
