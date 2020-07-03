import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
        </Switch>
      </section>
    </Router>
  );
}

export default App;
