import React from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Ping from "./ping/Ping";

function App() {
  return (
    <div className="App">
      <Link to="/ping">Ping</Link>

      <Switch>
        <Route path="/ping">
          <Ping />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
