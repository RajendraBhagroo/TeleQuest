import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import io from "socket.io-client";
import { Link } from "react-router-dom";
const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let namespace="NYIT";
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

//function to get user media 
function startVideo(){
    const constraints = { audio: true, video: { width: 400, height: 300 } };
    let video=document.getElementById("videoElement");

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      try{
      video.srcObject= stream;
      console.log("Entering try");
      }
      catch(e)
      {
        console.log("Entering catch");
        console.log(`Error: ${e}`)
      }
      video.play();

    })
    .catch(function(err) {
      console.log("An error occurred: " + err);
    });
};

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
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let publicProfile;
    if (profile === null || loading) {
      console.log("Either profile null or loading")
      return publicProfile =<Spinner />;
    } else {
      if (profile.handle === undefined) {
        console.log("profile.handle prob null")
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
      }
      else{
        console.log("loading vid player");
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
                 <video id="streamingVid"/>
                <button id="startStream" onClick={function(){startVideo()}}>Start</button>
        </div>
      );
    }
  }}
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
