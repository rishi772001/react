import React, { Component, useState } from "react";
import Message from "./Message";
import Player from "./Player";
import "../css/Style.css";

import rock from "../assets/rock.jpeg";
import paper from "../assets/paper.jpeg";
import scissor from "../assets/scissor.jpeg";
import playerrock from "../assets/playerrock.jpeg";
import playerpaper from "../assets/playerpaper.jpeg";
import playerscissor from "../assets/playerscissor.jpeg";
import comrock from "../assets/comrock.jpeg";
import compaper from "../assets/compaper.jpeg";
import comscissor from "../assets/comscissor.jpeg";

// initial state
const initialState = {
  playerName: "Player",
  playerChoice: "None",
  playerPoints: 0,
  computerName: "Computer",
  computerChoice: "None",
  computerPoints: 0,
  Message: "Lets begin the game",
};

class Main extends React.Component {
  state = initialState; // initializing state
  choice = { PAPER: 0, ROCK: 1, SCISSORS: 2 };
  results = [
    ["t", "c", "u"], // t= tie, c = computer, u = user
    ["u", "t", "c"],
    ["c", "u", "t"],
  ];

  reset = () => {
    this.setState(initialState); // reset state to default
  };

  playGame = () => {
    this.generateComputerChoice();
  };

  // Onclick event for player choice
  updateChoice = (playerChoice) => {
    if (playerChoice == "ROCK")
      document.getElementById("imageOne").src = playerrock;
    if (playerChoice == "PAPER")
      document.getElementById("imageOne").src = playerpaper;
    if (playerChoice == "SCISSORS")
      document.getElementById("imageOne").src = playerscissor;
    this.setState({ playerChoice: playerChoice }, function () {
      console.log(this.state.playerChoice);
    });
  };

  // Generate choice for user randomly
  generateComputerChoice() {
    let choice = Math.floor(Math.random() * Math.floor(3));
    if (choice == 0) {
      this.setState({ computerChoice: "PAPER" }, function () {
        document.getElementById("imageTwo").src = compaper;
        console.log("Computer Choice =>", this.state.ComputerChoice);
      });
    } else if (choice == 1) {
      this.setState({ computerChoice: "ROCK" }, function () {
        document.getElementById("imageTwo").src = comrock;
        console.log("Computer Choice =>", this.state.ComputerChoice);
      });
    } else {
      this.setState({ computerChoice: "SCISSORS" }, function () {
        document.getElementById("imageTwo").src = comscissor;
        console.log("Computer Choice =>", this.state.ComputerChoice);
      });
    }

    setTimeout(() => {
      this.predictWin();
    }, 500);
  }

  // calculate win of the game
  predictWin() {
    var choice1 = this.choice[this.state.playerChoice];
    var choice2 = this.choice[this.state.computerChoice];
    var output = this.results[choice2][choice1];

    if (output == "t") {
      this.setState({ Message: "Uh Oh! its a tie" });
    } else if (output == "u") {
      this.setState({ Message: "HAHA! Player wins" });
      this.setState((prevState) => ({
        playerPoints: prevState.playerPoints + 1,
      }));
    } else if (output == "c") {
      this.setState({ Message: "You cant beat a computer!!!!!" });
      this.setState((prevState) => ({
        computerPoints: prevState.computerPoints + 1,
      }));
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="header">ROCK PAPER SCISSORS</div>

          <table className="table centered" border="0">
            <thead>
              <tr>
                <td>
                  <Player
                    name={this.state.playerName}
                    choice={this.state.playerChoice}
                    points={this.state.playerPoints}
                  ></Player>
                </td>
                <td></td>
                <td>
                  <Player
                    name={this.state.computerName}
                    choice={this.state.computerChoice}
                    points={this.state.computerPoints}
                  ></Player>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="3">
                  <img id="imageOne" src={playerrock} />
                  <img id="imageTwo" src={comrock} />
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <button onClick={() => this.updateChoice("ROCK")}>
                    <img src={rock} />
                  </button>
                  <button onClick={() => this.updateChoice("PAPER")}>
                    <img src={paper} />
                  </button>
                  <button onClick={() => this.updateChoice("SCISSORS")}>
                    <img src={scissor} />
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="3">
                  <button className="btn" onClick={() => this.playGame()}>
                    Play
                  </button>
                  <button className="btn" onClick={() => this.reset()}>
                    Reset
                  </button>
                </td>
              </tr>

              <tr>
                <td colSpan="3">
                  <Message message={this.state.Message} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;
