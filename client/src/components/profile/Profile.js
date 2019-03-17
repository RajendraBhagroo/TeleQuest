import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Profile extends React.Component {
  state = {};

  render() {
    const { userName } = this.props.auth.user;

    return (
      <div>
        <h1>Hello {userName}</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Profile);
