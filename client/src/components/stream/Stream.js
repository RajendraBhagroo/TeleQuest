import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import { Redirect } from "react-router-dom";
import ProfileNotFound from "../common/ProfileNotFound";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

class Stream extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;
    let streampage;

    if (profile === null || loading) {
      return (streampage = <Spinner />);
    } else {
      if (profile.handle === undefined) {
        streampage = <ProfileNotFound />;
      } else {
        streampage = (
          <div>
            <p>Redirecting...</p>
            {profile.isStudent ? (
              <Redirect to="/studentStream" />
            ) : (
              <Redirect to="/profStream" />
            )}
          </div>
        );
      }
      return streampage;
    }
  }
}

Stream.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Stream);
