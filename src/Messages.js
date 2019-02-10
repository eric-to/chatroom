import { Component } from "react";
import React from "react";

class Messages extends Component {
  renderMessage(message, index) {
    const { user, text } = message;
    const { currentUser } = this.props;
    const myMessage = user.id === currentUser.id;
    const messageClass = myMessage ? "my-message message" : "message";

    return (
      <li className={ messageClass } key={ index }>
        <span
          className="avatar"
          style={ {backgroundColor: user.clientData.color} }
        />
        <div className="message-content">
          <div className="username">
            { user.clientData.username }
          </div>
          <div className="text">{ text }</div>
        </div>
      </li>
    );
  }

  render() {
    const { messages } = this.props;
    return (
      <ul className="messages-list">
        { messages.map((m, index) => this.renderMessage(m, index)) }
      </ul>
    );
  }
}

export default Messages;
