import { Component } from "react";
import React from "react";

class Input extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    }
  }

  onChange(e) {
    this.setState({ text: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }

  render() {
    return (
      <div className="message-form">
        <form onSubmit={ e => this.onSubmit(e) }>
          <input
            onChange={ e => this.onChange(e) }
            value={ this.state.text }
            type="text"
            placeHolder="Aa"
            autofocus="true"
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
