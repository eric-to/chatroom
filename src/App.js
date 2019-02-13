import React, { Component } from 'react';
import './App.css';
import Input from './Input';
import Messages from './Messages';

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
      user: {
        username: this.randomName(),
        color: this.randomColor()
      }
    };

    // Use Scaledrone to listen for messages and deliver them to
    // multiple users
    this.drone = new window.Scaledrone("s0jxI1lyHoY1OTv6", {
      data: this.state.user
    });

    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const user = {...this.state.user};
      user.id = this.drone.clientId;
      this.setState({ user })
    });

    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, user) => {
      const messages = this.state.messages;
      messages.push({ user, text: data });
      this.setState({ messages })
    });

    // Bindings
    this.onSendMessage = this.onSendMessage.bind(this);
  }

  randomName() {
    const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
    const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adjective}_${noun}`;
  }

  randomColor() {
    // Trendy colors in 2019
    const colors = ["#32064A", "#E56B1F", "#FCD02C", "#E42C6A", "#FDD935", "#3EB650", "#E12B38", "#F3E367", "#7DA2A9", "#4BFFA5", "#C19434", "#FB8122", "#D48166", "#5626C4", "#C60021", "#92A332", "#FB9985", "#63BCE5", "#C39EA0", "#F4ABAA", "#7D3780"];
    // return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    return colors[Math.floor(Math.random() * colors.length)];
  }

  onSendMessage(message) {
    this.drone.publish({
      room: "observable-room",
      message
    })
  }

  render() {
    return (
      <div className="app">
        <Messages
          messages={this.state.messages}
          currentUser={this.state.user}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }
}

export default App;
