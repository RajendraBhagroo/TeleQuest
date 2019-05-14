import io from "socket.io-client";

const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
const namespace = "NYIT";
const mainURL = `http://${host}:${socket_port}/${namespace}`;
const webRtcConfig = {
  iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }]
};

let outBoundStream;
let peerConnections = {};
let streaming = false;
let mediaRecorder;
let chunks = [];
let socket = io.connect(mainURL);

/** @type {MediaStreamConstraints} */
const constraints = {
  audio: true,
  video: { facingMode: "user" }
};

/*
 * This method handles
 *   -Getting the users media
 *   -creating a new class, in future implementations this method will be seperated
 *   -Starting the stream by emitting a ProfIn to the server
 */
let StartStream = () => {
  let video = document.getElementById("videoElement");
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      video.srcObject = stream;
      outBoundStream = stream;
      video.play();
      socket.emit("newClass", "Math");
      socket.emit("ProfIn");
      streaming = true;
      startRecording();
    })
    .catch(error => console.error(error));
};

/*
 * Stops the streaming, by stopping all the associated tracks of the
 * outboundstream
 * Then it clears the video element, so the user doesn't see their paused face
 */
let stopStream = () => {
  if (streaming) {
    let video = document.getElementById("videoElement");
    let tracks = outBoundStream.getTracks();
    tracks.forEach(track => track.stop());
    video.pause();
    video.removeAttribute("src");
    video.load();
    endRecording();
    socket.emit("StreamEnd");
  }
};

/*
 * Handles the recording process by creating a new mediaRecorder object
 * it obtains the data via the outBoundStream which represents the user's media
 * upon new data the mediaRecorder pushes the data onto an array named chunks.
 * Then upon the mediaRecorder stopping, a new vodClip is created, and named after
 * the current calendar date. This vodClip is then appended onto the users page for viewing or download
 */
let startRecording = () => {
  mediaRecorder = new MediaRecorder(outBoundStream);
  mediaRecorder.start();
  console.log(mediaRecorder.state);
  mediaRecorder.ondataavailable = e => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = e => {
    console.log("ENDING");

    let vodClips = document.querySelector(".vod-clips");
    let date = new Date();
    let vodName =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    let vodContainer = document.createElement("article");
    let vodLabel = document.createElement("p");
    let video = document.createElement("video");
    let deleteButton = document.createElement("button");
    let bookmarkButton = document.createElement("button");

    vodContainer.classList.add("Vod");
    vodContainer.classList.add("p-2");
    video.setAttribute("controls", "");
    deleteButton.innerHTML = "Delete Vod";
    bookmarkButton.innerHTML = "Set BookMark";
    vodLabel.innerHTML = vodName;

    vodContainer.appendChild(video);
    vodContainer.appendChild(vodLabel);
    vodContainer.appendChild(deleteButton);
    vodContainer.appendChild(bookmarkButton);
    vodClips.appendChild(vodContainer);

    let blob = new Blob(chunks, { type: "video/mp4" });
    chunks = [];
    let vodURL = window.URL.createObjectURL(blob);
    video.src = vodURL;
    video.width = 350;
    video.height = 350;

    bookmarkButton.onclick = e => {
      let bookmark = document.createElement("p");
      bookmark.innerHTML = `Bookmarked Time: ${Math.floor(video.currentTime)}s`;
      vodContainer.appendChild(bookmark);
    };

    deleteButton.onclick = e => {
      let evtTgt = e.target;
      evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    };
  };
};

let endRecording = () => {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
};

/*
 * Invoked when the client has received an answer from the remote peer.
 * Sets the associated peer's, remoteDescription with the provided information
 * The specific connection is associated with the given id.
 */
socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
});

/*
 * Upon receiving a Join_Stream event from the server
 * The user's client begins to create a new RTCPeerConnection
 * which is stored in the peerConnections array, and is identified by the given id
 * the RTCPeerConnection is configured with the webRtcConfig data
 * Once the peer is created the users mediaStream is appended onto the connection * to be sent to the new connection.
 * After this the peer creates an offer which will be sent back to the original
 * sender, and current peer sets their localDescription
 * Additionally an onicecandiate event is invoked once the peer has set their
 * localDescription, then emits to  the server that a new candidate is available  * to connected to.
 */
socket.on("Join_Stream", id => {
  const pc = new RTCPeerConnection(webRtcConfig);
  console.log(`Client Recieved Join Stream; Client ID: ${id}`);
  peerConnections[id] = pc;
  outBoundStream
    .getTracks()
    .forEach(track => pc.addTrack(track, outBoundStream));
  pc.createOffer()
    .then(sdp => pc.setLocalDescription(sdp))
    .then(() => {
      socket.emit("offer", id, pc.localDescription);
    });
  pc.onicecandidate = event => {
    if (event.candidate) {
      console.log("Professor emitting candidiate");
      socket.emit("candidate", id, event.candidate);
    }
  };
});

/*
 * Reacts upon a new candidate, the new candidate is added to the associated
 * candidate. The connection is referenced via the id.
 */
socket.on("candidate", (id, candidate) => {
  try {
    peerConnections[id]
      .addIceCandidate(candidate)
      .then(console.log("Successfully added Candidate"));
  } catch (e) {
    console.log("Error Occured" + e);
  }
});

socket.on("bye", id => {
  peerConnections[id] && peerConnections[id].close();
  delete peerConnections[id];
});
export { StartStream, startRecording, stopStream, endRecording };
