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
import Question_Button from "../../resources/images/Question_button_red.png";
import Confused_Button from "../../resources/images/Confused_button.png";
import OK_Button from "../../resources/images/OK_button.png";

const styles = {
  Card: {
    width: "200px",
    height: "auto"
  },
  Dual: {
    width: "600px",
    height: "450px",
    margin: "0 1em 0"
  },
  Screen: {
    width: "558px",
    height: "359px"
  },
  Cont: {
    height: "100%",
    minWidth: "1000px",
    padding: "20px 50px 20px 50px"
  },
  Button: {
    margin: "0 0.5em 0"
  },
  Button_Location: {
    padding: "50px 0 50px 0",
    margin: "auto"
  },
  Log: {
    width: "30%",
    height: "250px",
    margin: "0 1em 0 0"
  },
  Button_Log: {
    margin: "0 0 1em"
  },
  Student_Chat: {
    width: "300px",
    height: "55%"
  },
  Chat: {
    width: "65%",
    height: "55%"
  },
  Button_Icon: {
    width: "60px",
    height: "60px"
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
              <div>
                {profile.isStudent ? (
                  //-----------------------Student's View--------------------------------------------
                  <div className="row">
                    <div style={styles.Card}>
                      <div className="card">
                        <div className="card-header">
                          <strong>Courses Enrolled In</strong>
                        </div>
                        <div>
                          <ProfileSideCourseCard
                            course={profile.studentFields.coursesEnrolledIn}
                          />
                        </div>
                      </div>
                    </div>

                    {/*--Stream Screen--*/}
                    <div className="col">
                      <div className="card border-primary">
                        <div className="card-header bg-primary text-white">
                          Professor's Stream
                        </div>
                        <div className="card-body bg-dark">
                          <video id="ForiegnVid" style={styles.Screen} />
                        </div>
                      </div>
                    </div>

                    {/*--Buttons--*/}
                    <div>
                      <div>
                        <div
                          className="card border-primary"
                          style={styles.Button_Log}
                        >
                          <div className="card-body">
                            <button type="button" className="btn btn-link">
                              <img
                                style={styles.Button_Icon}
                                src={Question_Button}
                                alt="Question"
                              />
                            </button>
                            <button type="button" className="btn btn-link">
                              <img
                                style={styles.Button_Icon}
                                src={Confused_Button}
                                alt="Confused"
                              />
                            </button>
                            <button type="button" className="btn btn-link">
                              <img
                                style={styles.Button_Icon}
                                src={OK_Button}
                                alt="OK"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/*--Chat--*/}

                      <div>
                        <div style={styles.Student_Chat}>
                          <div className="card border-primary">
                            <div className="card-header bg-primary text-white">
                              Chat
                            </div>
                            <div className="card-body" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // ---------------------------------Professor's View-----------------------------------------
                  <div>
                    <div className="row">
                      <div style={styles.Card}>
                        <div className="card">
                          <div className="card-header">
                            <strong>Courses Teaching</strong>
                          </div>
                          <div>
                            <ProfileSideCourseCard
                              course={profile.teacherFields.coursesTeaching}
                            />
                          </div>
                        </div>
                      </div>
                      {/*--Stream Screen--*/}

                      <div>
                        <div
                          className="card border-primary"
                          style={styles.Dual}
                        >
                          <div className="card-header bg-primary text-white text-center">
                            Professor's Stream
                          </div>
                          <div className="card-body bg-dark">
                            <video id="videoElement" style={styles.Screen} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="card border-primary"
                          style={styles.Dual}
                        >
                          <div className="card-header bg-primary text-white text-center">
                            Student
                          </div>
                          <div className="card-body bg-dark">
                            <video id="ForiegnVid" style={styles.Screen} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div style={styles.Button_Location}>
                        <button
                          className="btn btn-success mr-2 ml-5"
                          id="startVideo"
                          onClick={function() {
                            startVideo();
                          }}
                        >
                          Start Stream
                        </button>
                        <button
                          className="btn btn-danger mr-2 ml-5"
                          id="stopStream"
                          onClick={function() {
                            stopStream();
                          }}
                        >
                          Stop Stream
                        </button>
                        <button
                          className="btn btn-info"
                          id="startStream"
                          style={{ marginLeft: "480px" }}
                          onClick={function() {
                            startStream();
                          }}
                        >
                          Join Stream
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      {/*--Log--*/}

                      <div style={styles.Log}>
                        <div className="card border-primary">
                          <div className="card-header bg-primary text-white text-center">
                            Log
                          </div>
                          <div className="card-body" />
                        </div>
                      </div>

                      {/*--Chat--*/}

                      <div style={styles.Chat}>
                        <div>
                          <div className="card border-primary">
                            <div className="card-header bg-primary text-white text-center">
                              Chat
                            </div>
                            <div className="card-body" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <article className="vod-clips d-flex" />
                  </div>
                )}
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
