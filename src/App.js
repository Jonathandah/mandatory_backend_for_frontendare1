import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
