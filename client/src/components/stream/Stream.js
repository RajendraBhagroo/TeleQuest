import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import io from "socket.io-client";


const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let namespace = "NYIT";
let outBoundStream;


/*
 * main url being where the website is being hosted as well as the specified porition of that website
 * since rooms are virtuilized in the namespace the url won't change
 */
const mainURL = `http://${host}:${socket_port}/${namespace}`;
let socket = io.connect(mainURL);

socket.on("err", function(data) {
  console.log(data);
});

socket.on("success", function(data) {
  console.log(data);
});

socket.on("response", function(data) {
  console.log(data);
});

socket.on("streaming", function(data) {
  const video = document.getElementById("streamingVid");
  video.srcObject=data;
});
function startVideo() {
  const constraints = { audio: true, video: { width: 400, height: 300 } };
  let video = document.getElementById("videoElement");

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {

      video.srcObject = stream;
      outBoundStream = stream;
      video.controls = true;
      video.play();
      CreateClassRoom("math");
      //StartStream(stream);
    })
    .catch(function(err) {
      throw Error("An error occurred: " + err);
    });
}
/*
   * Function that is called when a teacher clicks on a classroom
   * using the clicked on class creates a room
   * the streamingURL is a combination of the host, socketport
   * and the name of the class that was clicked
   */
  function CreateClassRoom(room) {
    socket.emit("newClass", room);
  }

  /*
   * Function thats called when a student clicks on a classroom that exists
   * joins the specified room that the user clicked on
   */
  function JoinClassRoom(room) {
    socket.emit("joinRoom", room);
  }

  // returns the current avaiable rooms/classes in the namespace
  function GetRooms() {
    socket.emit("currentClasses");
  }

  // emits the start of the stream to those in the room
  function StartStream(data) {
    socket.emit("stream", data);
  }
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
    let publicProfile;

    if (profile === null || loading) {
      return (publicProfile = <Spinner />);
    } else {
      if (profile.handle === undefined) {
        publicProfile = (
          <div>
            <center>
              <h2>Welcome {user.userName}</h2>
              <h4>
                There is no profile in this account. Please create your profile.
              </h4>
              <Link
                type="button"
                className="btn btn-primary pull-right"
                to="/profileUpdate"
              >
                Create Profile
              </Link>
            </center>
          </div>
        );
      } else {
        return (
          <div>
            <div className="container">
              <p>{user.userName}</p>
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
            <video id="videoElement">No Video Stream.....</video>
            <video id="streamingVid" />
            <button
              id="startStream"
              onClick={function() {
                startVideo();
              }}
            >
              Start
            </button>
          </div>
        );
      }
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
