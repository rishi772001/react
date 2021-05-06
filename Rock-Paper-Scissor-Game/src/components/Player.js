import React, { Component } from "react";

class Player extends React.Component {
  render() {
    return (
      <section>
        <dd style={{ fontWeight: "bold" }}>{this.props.name}</dd>
        <dd>Choice : {this.props.choice}</dd>
        <dd>Points : {this.props.points}</dd>
      </section>
    );
  }
}

export default Player;
