import React, { Component } from "react";
import "./App.css";
import Jokelist from "./comps/Jokelist";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Jokelist />
      </div>
    );
  }
}

export default App;
