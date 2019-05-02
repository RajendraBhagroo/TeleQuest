import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import ProfileNotFound from "../common/ProfileNotFound";
import {
  startVideo,
  startStream,
  stopStream,
  startRecording,
  endRecording
} from "../../utils/StreamFunctions";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

const styles = {
  Card: {
    width: "200px",
    height: "auto"
  },
  Frame: {
    border: "0.2em solid black",
    margin: "0 1em 1em",
    width: "auto"
  },
  Screen: {
    width: "600px",
    height: "300px"
  },
  Cont: {
    width: "100%",
    padding: "20px 50px 20px 50px",
    margin: "0 auto 0 auto"
  },
  Button: {
    margin: "0 0.5em 0"
  },
  Log: {
    width: "300px",
    height: "35%",
    border: "0.2em solid black",
    margin: "0 0 1em"
  },
  Chat: {
    width: "300px",
    height: "55%",
    border: "0.2em solid black",
    margin: "0 0 1em"
  }
};

class Stream extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let streamPage;

    if (profile === null || loading) {
      return (streamPage = <Spinner />);
    } else {
      if (profile.handle === undefined) {
        streamPage = <ProfileNotFound />;
      } else {
        streamPage = (
          <div style={styles.Cont}>
            <div>
              <p>{user.userName}</p>
              <div className="row">
                <div style={styles.Card}>
                  <div className="card">
                    <div className="card-header">
                      <strong>
                        {profile.isStudent
                          ? "Courses Enrolled In"
                          : "Courses Teaching"}
                      </strong>
                    </div>
                    <div>
                      {profile.isStudent ? (
                        <ProfileSideCourseCard
                          course={profile.studentFields.coursesEnrolledIn}
                        />
                      ) : (
                        <ProfileSideCourseCard
                          course={profile.teacherFields.coursesTeaching}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row" style={styles.Frame}>
                    <video id="videoElement" style={styles.Screen}>
                      No Video Stream.....
                    </video>
                    <video id="ForiegnVid" style={styles.Screen} />
                  </div>
                  <div className="center">
                    <button
                      id="startVideo"
                      onClick={() => startVideo()}
                      style={styles.Button}
                    >
                      Start Video
                    </button>
                    <button
                      id="startStream"
                      onClick={() => startStream()}
                      style={styles.Button}
                    >
                      Start Stream
                    </button>
                    <button
                      id="stopStream"
                      onClick={() => stopStream()}
                      style={styles.Button}
                    >
                      Stop Stream
                    </button>
                    <button
                      id="startRecord"
                      onClick={() => startRecording()}
                      style={styles.Button}
                    >
                      Start Recording
                    </button>

                    <button
                      id="stopRecording"
                      onClick={() => endRecording()}
                      style={styles.Button}
                    >
                      Stop Recording
                    </button>
                  </div>
                </div>
                <div>
                  <div style={styles.Log} />
                  <div style={styles.Chat} />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    return streamPage;
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
