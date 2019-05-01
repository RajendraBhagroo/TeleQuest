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
var outBoundStream;
let thisPC;
let streaming=false;
let avaiableCourse=[];
let mediaRecorder;
let chunks=[];
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

socket.on("avaiableCourse", function(data){
  avaiableCourse=data;
});

function getSelectedSdpSemantics() {
  const sdpSemanticsSelect = document.querySelector('#sdpSemantics');
  const option = sdpSemanticsSelect.options[sdpSemanticsSelect.selectedIndex];
  return option.value === '' ? {} : {sdpSemantics: option.value};
};

function startVideo(){
  const constraints = { audio: true, video: { width: 400, height: 300 } };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      streaming=true;
      let video = document.getElementById("videoElement");
      let startRecording = document.getElementById("startRecord");
      video.srcObject=stream;
      outBoundStream=stream;
      video.play();

    })
    .catch(function(err) {
      throw Error("An error occurred: " + err);
    });
};

function startRecording(){
    mediaRecorder = new MediaRecorder(outBoundStream);
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    mediaRecorder.ondataavailable=function(e){
      chunks.push(e.data);
    };
    mediaRecorder.onStop=function(e){
      let blob = new Blob(chunks,{'type':'video/mp4'})
      chunks=[];
    };
};

function endRecording(){
    mediaRecorder.stop();
    console.log(mediaRecorder.state);
    
};
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
  function startStream(data) {
    socket.emit("stream", data);

  }

  //create a new peer
  function createPeer(){
    let configuration = getSelectedSdpSemantics();
    thisPC = new RTCPeerConnection(configuration); 
  }

  function stopStream(){
    if(streaming)
    {
      console.log(outBoundStream);
      let tracks=outBoundStream.getTracks();

      tracks.forEach(track=>track.stop());
    }
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
              id="startVideo"
              onClick={function() {
                startVideo();
              }}
            >
              Start Video
            </button>
            <button
              id="startStream"
              onClick={function() {
                startStream();
              }}
            >
              Start Stream
            </button>
            <button
              id="stopStream"
              onClick={function() {
                stopStream();
              }}
            >
              Stop Stream
            </button>
            <button
              id="startRecord"
              onClick={function(){
                startRecording();
              }}
            >
              Start Recording
            </button>
            <button
              id="stopRecording"
              onClick={function(){
                endRecording();
              }}
            >
              Stop Recording
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
