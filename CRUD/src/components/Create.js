import React, { Component } from "react";
import fire from "../fire";
import { Button } from "react-bootstrap";
import "../css/style.css";
import ReadDelUpdate from "./ReadDelUpdate.js";

const initialState = {
  title: "",
  author: "",
  isbn: "",
};

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  //Opens or close modals
  add = () => {
    document.getElementById("blank").style.display = "block";
    document.getElementById("modal1").style.display = "block";
    document.getElementById("main").style.display = "none";
  };

  close = () => {
    document.getElementById("modal1").style.display = "none";
    document.getElementById("blank").style.display = "none";
    document.getElementById("main").style.display = "block";
  };

  // handles dynamic input changes
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  // sets input to default
  reset = () => {
    this.setState(initialState);
  };

  // adds new car to db
  handleSubmit = () => {
    const ref = fire.database().ref();
    ref.push(this.state);
    this.reset();
    alert("Inserted");
  };

  render() {
    return (
      <div>
        <div id="main">
          <h2 className="header">
            <img src={"logo.png"} className="logo"></img>cars MANAGEMENT
            SYSTEM
          </h2>
          <center>
            <div id="workspace">
              <p>
                <Button
                  variant="success"
                  id="addbutton"
                  size="lg"
                  onClick={this.add}
                >
                  New<sup>+</sup>
                </Button>

                <br />
              </p>
              <hr />
              {/* Call read, update, delete function */}
              <ReadDelUpdate></ReadDelUpdate>
            </div>
          </center>
        </div>
        {/* To blur background when modal open */}
        <div id="blank"></div>
        <div id="modal1" className="modal1">
          <form>
            <button onClick={this.close} className="cross">
              X
            </button>
            <br></br>
            <center>
              <h1>
                <u>ADD A NEW car</u>
              </h1>
            </center>
            <br></br>
            <br></br>
            <p>
              <span id="inputname">car Name : </span>
              <input
                type="text"
                name="title"
                onChange={(event) => this.handleChange(event)}
                defaultValue={this.state.title}
              ></input>
            </p>
            <br></br>
            <p>
              <span id="inputname">Author : </span>
              <input
                type="text"
                name="author"
                onChange={(event) => this.handleChange(event)}
                defaultValue={this.state.author}
              />
            </p>
            <br></br>
            <p>
              <span id="inputname">isbn : </span>
              <input
                type="text"
                name="isbn"
                onChange={(event) => this.handleChange(event)}
                defaultValue={this.state.isbn}
              />
            </p>
            <br></br>
            <Button id="submitbutton" onClick={this.handleSubmit}>
              Store
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
