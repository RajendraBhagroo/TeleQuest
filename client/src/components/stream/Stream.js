import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import io from "socket.io-client";
const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let namespace="";
/*main url being where the website is being hosted as well as the specified porition of that website
* since rooms are virtuilized in the namespace the url won't change
*/
const mainURL=`http://${host}:${socket_port}/`+namespace;
let socket=io.connect(mainURL);

//occurs in the event of a err response from the server
socket.on('err',function(data){
  console.log(data);
});

//@desc occurs in the event of a success
socket.on('success',function(data){
  console.log(data);
});

//@desc occurs in the event of a response
socket.on('response',function(data){
  console.log(data);
});
socket.on('streaming',function(data){
  const video = document.querySelector("streamingVid");

});
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
  CreateClassRoom(room){
    socket.emit('newClass',room);
  }

  /*Function thats called when a student clicks on a classroom that exists
  * joins the specified room that the user clicked on
  */
  JoinClassRoom(room){
    socket.emit('joinRoom',room);
  }

  /*@desc returns the current avaiable rooms/classes in the namespace
  */
  GetRooms(){
    socket.emit('currentClasses');
  }

  /*@desc emits the start of the stream to those in the room
  */
  StartStream(data){
    socket.emit('stream',data);
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
            <video id="streamingVid" autoPlay={true} />
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
