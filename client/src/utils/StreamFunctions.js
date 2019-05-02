import io from "socket.io-client";

const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let namespace = "NYIT";
let outBoundStream;
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

let startVideo = () => {
  const constraints = { audio: true, video: { width: 400, height: 300 } };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      streaming = true;
      let video = document.getElementById("videoElement");
      video.srcObject = stream;
      outBoundStream = stream;
      video.play();
    })
    .catch(err => {
      throw Error("An error occurred: " + err);
    });
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
    let tracks = outBoundStream.getTracks();
    tracks.forEach(track => track.stop());
    let incomeVid = document.getElementById("ForiegnVid");
    let video = document.getElementById("videoElement");
    incomeVid.pause();
    video.pause();
    incomeVid.removeAttribute("src");
    video.removeAttribute("src");
    incomeVid.load()
    video.load();
  }
};

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
    let vodName = prompt("Enter a name for your stream VOD");
    let vodContainer = document.createElement("article");
    let vodLabel = document.createElement("p");
    let video = document.createElement("video");
    let deleteButton = document.createElement("button");
    let bookmarkButton = document.createElement("button");

    vodContainer.classList.add("Vod");
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

    deleteButton.onclick = function(e) {
      let evtTgt = e.target;
      evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    };
  };
};

let endRecording = () => {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
};

export { startVideo, startStream, stopStream, startRecording, endRecording };
