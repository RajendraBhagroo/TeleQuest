import React from "react";

const Footer = props => {
  return (
    <div>
      <footer className="sticky-bottom">
        <p>&copy; TeleQuest {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Footer;
