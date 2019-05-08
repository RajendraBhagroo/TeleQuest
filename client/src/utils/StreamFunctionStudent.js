import io from "socket.io-client";

const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
const webRtcConfig={'iceServers': [{'urls': ['stun:stun.l.google.com:19302']}]};
let namespace = "NYIT";
const mainURL = `http://${host}:${socket_port}/${namespace}`;
let socket = io.connect(mainURL);
let peerConnection;
let video = document.getElementById("");

socket.on("ProfIn",function(){
    socket.emit("joinRoom","Math");
    socket.emit("Join_Stream");
});

socket.on("offer",function(id,offer){
    peerConnection = new RTCPeerConnection(webRtcConfig);
    peerConnection.setRemoteDescription(offer)
    .then(()=>peerConnection.createAnswer())
    .then((sdp)=>peerConnection.setLocalDescription(sdp))
    .then(function(){
        socket.emit("answer",id, peerConnection.localDescription);
    });

    peerConnection.onicecandidate = function(event) {
		if (event.candidate) {
			socket.emit('candidate', id, event.candidate);
        }};

    peerConnection.ontrack = event => {
            video.srcObject = event.streams[0];
            video.play();
          };
});

socket.on('candidate', function(id, candidate) {
	try{
	    peerConnection.addIceCandidate((candidate))
	    .then(console.log("Successfully added Candidate"));
	}
	catch(e)
	{
		console.log("Error Occured"+e);
	}
});

let JoinStream = () =>{
    socket.emit("joinRoom","Math");
    socket.emit("Join_Stream");
};

export{JoinStream}