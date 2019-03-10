import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../resources/images/TeleQuest_Logo.png";

const styles = {
  Logo: {
    width: "100px",
    height: "30px"
  }
};

class Navbar extends React.Component {
  state = {};

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <Link className="navbar-brand mr-4" to="/">
          <img style={styles.Logo} src={Logo} alt="TeleQuest Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggle"
          aria-controls="navbarToggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarToggle">
          <div className="navbar-nav mr-auto">
            <Link className="nav-item nav-link" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link" to="/about">
              About
            </Link>
            <Link className="nav-item nav-link" to="/course">
              Course
            </Link>
            <Link className="nav-item nav-link" to="/mypage">
              My page
            </Link>
          </div>
          <div className="navbar-nav">
            <Link className="nav-item nav-link mr-2" to="/login">
              Login
              <i className="fas fa-sign-in-alt ml-2" />
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
