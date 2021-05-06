import React, { Component } from "react";

class Message extends React.Component {
  render() {
    return (
      <section>
        <h3>{this.props.message}</h3>
      </section>
    );
  }
}

export default Message;
