import React from "react";

class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Landing</h1>
        <img
          src={require("../resources/images/TeleQuest_Logo.png")}
          alt="TeleQuest Logo"
        />
      </div>
    );
  }
}

export default Landing;
