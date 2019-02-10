import { Component } from "react";
import React from "react";

class Messages extends Component {
  renderMessage(message) {
    const { user, text } = message;
    const { currentUser } = this.props;
    const myMessage = user.id === currentUser.id;
    const messageClass = myMessage ? "message my-message" : "message";
    return (
      <li className={messageClass}>
        <span
          className="avatar"
          style={ {backgroundColor: user.color} }
        />
        <div className="message-content">
          <div className="username">
            {user.username}
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
        { messages.map(m => this.renderMessage(m)) }
      </ul>
    );
  }
}

export default Messages;
