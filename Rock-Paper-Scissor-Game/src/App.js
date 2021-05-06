import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Main />;
  }
}
export default App;
