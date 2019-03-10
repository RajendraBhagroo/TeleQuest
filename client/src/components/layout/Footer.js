import React from "react";

const Footer = props => {
  return (
    <div>
      <footer className="sticky-bottom" style={styles.footer}>
        <p style={styles.footercolor}>&copy; TeleQuest {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Footer;

const styles = {
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },

  footercolor:{
    color: '#ff8738'
  }
};
