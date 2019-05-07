import io from "socket.io-client";

const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
let namespace = "NYIT";
let outBoundStream;
const webRtcConfig={'iceServers': [{'urls': ['stun:stun.l.google.com:19302']}]};
let studentConnection = new RTCPeerConnection(webRtcConfig);
let peerConnections=[];
let streaming = false;
let avaiableCourse = [];
let mediaRecorder;
let chunks = [];
const peerConnections = {};
const mainURL = `http://${host}:${socket_port}/${namespace}`;
let socket = io.connect(mainURL);

/** @type {MediaStreamConstraints} */
const constraints = {
	// audio: true,
	video: {facingMode: "user"}
};

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
    let video = document.getElementById("videoElement");
	video.srcObject = stream;
	socket.emit('broadcaster');
}).catch(error => console.error(error));

socket.on('answer', function(id, description) {
	peerConnections[id].setRemoteDescription(description);
});

socket.on('Join Stream', function(id) {
    console.log("Client Recieved Join Stream");
	const pc = new RTCPeerConnection(webRtcConfig);
	peerConnections[id] = pc;
	outBoundStream.getTracks().forEach(track => pc.addTrack(track, outBoundStream));
	pc.createOffer()
	.then(sdp => pc.setLocalDescription(sdp))
	.then(function () {
		socket.emit('offer', id, pc.localDescription);
	});
	pc.onicecandidate = function(event) {
		if (event.candidate) {
			socket.emit('new_streamer', id, event.candidate);
		}
	};
});

socket.on('candidate', function(id, candidate) {
	peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on('bye', function(id) {
	peerConnections[id] && peerConnections[id].close();
	delete peerConnections[id];
});