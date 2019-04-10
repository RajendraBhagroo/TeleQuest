import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";
import {clearCurrentProfile} from "../../redux/actions/profileActions";
import Logo from "../../resources/images/TeleQuest_Logo.png";
import PropTypes from "prop-types";


const styles = {
  Logo: {
    width: "100px",
    height: "30px"
  },
  Avatar: {
    width: "25px"
  }
};

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/streams" className="nav-link">
            Streams
            <i className="fas fa-sign-out-alt ml-2" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            My Profile
            <img
              className="rounded-circle ml-2"
              src={user.avatar}
              alt={user.userName}
              style={styles.Avatar}
              title="You must have a Gravatar connected to your email to display an image"
            />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="" onClick={this.onLogoutClick} className="nav-link">
            Logout
            <i className="fas fa-sign-out-alt ml-2" />
          </Link>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
            <i className="fas fa-sign-in-alt ml-2" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
            <i className="fas fa-user-plus  ml-2" />
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
        <div className="container">
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

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-item nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item nav-link" to="/course">
                  Course
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
