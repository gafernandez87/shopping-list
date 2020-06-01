import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./index.css";
import Landing from "./Components/Landing";
import Room from "./Components//Room/Room";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/room/:roomId" exact>
          <Room />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);