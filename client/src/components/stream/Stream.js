import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import io from "socket.io-client";
const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let room="";
let namespace="";
let mainURL=`http://${host}:${socket_port}/`+namespace;
let socket=io.connect(mainURL);
class Stream extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  /*function that is called when a teacher clicks on a classroom
  * using the clicked on class creates a room
  * the streamingURL is a combination of the host, socketport
  * and the name of the class that was clicked
  */
  CreateClassRoom(){
    room="";
    io.connect(mainURL).emit('new-class',room);
    socket.connect(mainURL);
    socket.send=function(message)
    {
      socket.emit('message',{data:message});
    }
  }
  /*Function thats called when a student clicks on a classroom that exists
  * joins the specified room that the user clicked on
  *
  */
  JoinClassRoom(){
    room="";
    io.connect(mainURL);
    socket.connect(mainURL+room);
    socket.on('connect',function(){
      socket.emit(`${this.user.userName} has joined the classroom!`);
    })
  }

  StartStream(){

  }
  componentDidMount() {
    this.props.getCurrentProfile();
    const constraints = { audio: true, video: { width: 400, height: 300 } };

    const getUserMedia = params =>
      new Promise((successCallback, errorCallback) => {
        navigator.webkitGetUserMedia.call(
          navigator,
          params,
          successCallback,
          errorCallback
        );
      });

    getUserMedia(constraints)
      .then(stream => {
        const video = document.querySelector("videoElement");
        const vendorURL = window.URL || window.webkitURL;

        let binaryData = [];
        binaryData.push(stream);
        vendorURL.srcObject = new Blob(binaryData, {
          type: "application/zip"
        });

        video.play();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    if (profile === null || loading) {
      return <Spinner />;
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

            <video id="videoElement" autoPlay={true} />
          </div>
        </div>
      );
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
