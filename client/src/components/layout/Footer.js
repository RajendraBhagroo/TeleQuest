import React from "react";

const styles = {
  Footer: {
    width: "100%",
    height: 50,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    btnLocation: 0,
    bottom: 0
  },

  FooterColor: {
    color: "#ff8738"
  }
};

const Footer = props => {
  return (
    <div>
      <footer className="sticky-bottom" style={styles.Footer}>
        <p style={styles.FooterColor}>
          &copy; TeleQuest {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
