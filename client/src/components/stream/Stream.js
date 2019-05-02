import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import io from "socket.io-client";

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

const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let namespace = "NYIT";
var outBoundStream;
let peer1 = new RTCPeerConnection();
let peer2 = new RTCPeerConnection();
let streaming = false;
let avaiableCourse = [];
let mediaRecorder;
let chunks = [];

/*
 * main url being where the website is being hosted as well as the specified porition of that website
 * since rooms are virtuilized in the namespace the url won't change
 */
const mainURL = `http://${host}:${socket_port}/${namespace}`;
let socket = io.connect(mainURL);

socket.on("err", data => {
  console.log(data);
});

socket.on("success", data => {
  console.log(data);
});

socket.on("response", data => {
  console.log(data);
});

socket.on("response_offer", async data => {
  console.log("Recieved Data Offer:");
  console.log(data);
  await peer2
    .setRemoteDescription(data)
    .then(() => peer2.createAnswer())
    .then(sdp => peer2.setLocalDescription(sdp))
    .then(() => {
      socket.emit("answer", peer2.localDescription);
    });
});

socket.on("remote_answer", async data => {
  console.log("Recieved Data Answer:");
  console.log(data);
  await peer1.setRemoteDescription(data);
});

socket.on("avaiableCourse", data => {
  avaiableCourse = data;
});

let startVideo = () => {
  const constraints = { audio: true, video: { width: 400, height: 300 } };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      streaming = true;
      let video = document.getElementById("videoElement");
      let startRecording = document.getElementById("startRecord");
      video.srcObject = stream;
      outBoundStream = stream;
      video.play();
    })
    .catch(err => {
      throw Error("An error occurred: " + err);
    });
};

let startRecording = () => {
  mediaRecorder = new MediaRecorder(outBoundStream);
  mediaRecorder.start();
  console.log(mediaRecorder.state);
  mediaRecorder.ondataavailable = e => {
    chunks.push(e.data);
  };
  mediaRecorder.onStop = e => {
    let blob = new Blob(chunks, { type: "video/mp4" });
    let vod = prompt("Enter a name for your stream VOD");
    chunks = [];
  };
};

let endRecording = () => {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
};

peer1.addEventListener("icecandidate", e => onIceCandidate(peer1, e));
peer2.addEventListener("icecandidate", e => onIceCandidate(peer2, e));
peer1.addEventListener("iceconnectionstatechange", e =>
  onIceStateChange(peer1, e)
);
peer2.addEventListener("iceconnectionstatechange", e =>
  onIceStateChange(peer2, e)
);

let getName = pc => {
  return pc === peer1 ? "peer1" : "peer2";
};

let getOtherPc = pc => {
  return pc === peer1 ? peer2 : peer1;
};

let onIceCandidate = async (pc, event) => {
  try {
    await getOtherPc(pc).addIceCandidate(event.candidate);
    onAddIceCandidateSuccess(pc);
  } catch (e) {
    onAddIceCandidateError(pc, e);
  }
  console.log(
    `${getName(pc)} ICE candidate:\n${
      event.candidate ? event.candidate.candidate : "(null)"
    }`
  );
};

let onAddIceCandidateSuccess = pc => {
  console.log(`${getName(pc)} addIceCandidate success`);
};

let onAddIceCandidateError = (pc, error) => {
  console.log(
    `${getName(pc)} failed to add ICE Candidate: ${error.toString()}`
  );
};

let onIceStateChange = (pc, event) => {
  if (pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    console.log("ICE state change event: ", event);
  }
};

let onCreateSessionDescError = error => {
  console.log(`Failed to create session description: ${error.toString()}`);
};

/*
 * Function that is called when a teacher clicks on a classroom
 * using the clicked on class creates a room
 * the streamingURL is a combination of the host, socketport
 * and the name of the class that was clicked
 */
let CreateClassRoom = room => {
  socket.emit("newClass", room);
};

/*
 * Function thats called when a student clicks on a classroom that exists
 * joins the specified room that the user clicked on
 */
let JoinClassRoom = room => {
  socket.emit("joinRoom", room);
};

// returns the current avaiable rooms/classes in the namespace
let GetRooms = () => {
  socket.emit("currentClasses");
};

// emits the start of the stream to those in the room
let startStream = async data => {
  CreateClassRoom("Test");
  if (streaming) {
    peer2.ontrack = event => {
      console.log("recieving foriegn stream");
      let incomeVid = document.getElementById("ForiegnVid");
      incomeVid.srcObject = event.streams[0];
      incomeVid.play();
    };
    outBoundStream
      .getTracks()
      .forEach(track => peer1.addTrack(track, outBoundStream));
    try {
      console.log("peer1 createOffer start");
      await peer1
        .createOffer()
        .then(sdp => peer1.setLocalDescription(sdp))
        .then(() => {
          console.log("Peer1 LocalDescription:");
          console.log(peer1.localDescription);
          socket.emit("offer", peer1.localDescription);
        });
    } catch (e) {
      console.log(e);
    }
  }
};

let stopStream = () => {
  if (streaming) {
    console.log(outBoundStream);
    let tracks = outBoundStream.getTracks();

    tracks.forEach(track => track.stop());
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
        streamPage = (
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
