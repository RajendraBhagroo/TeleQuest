import io from "socket.io-client";

const host = process.env.HOST || `127.0.0.1`;
const socket_port = process.env.SOCKET_PORT || 3002;
const webRtcConfig={'iceServers': [{'urls': ['stun:stun.l.google.com:19302']}]};
let namespace = "NYIT";
const mainURL = `http://${host}:${socket_port}/${namespace}`;
let peerConnection;

/* This function assumes that the professor has already created a room, and emits
*  a join_stream event to notify the professor or remote client to begin the handshake process
*
*/
let JoinStream = () =>{
    let socket=io.connect(mainURL);
    /*When the student Client knows that the professor has started a stream
* It notifies the professors client to begin the handshake process to establish
* a conenction
*/
socket.on("ProfIn",function(){
    socket.emit("Join_Stream");
});
/* Upon recieving an offer request from a remote peer typically the professor's client
*  The local client creates a new RTCPeerConnection with the specified webRtcConfig
*  Next it sets its remoteDescription to what was offered by the remote peer
*  Then creates an answer to send to the remote peer. Before that though it sets its localDescription
*  As stated in the professors streamfunctions, the onicecandidate is invoked when the client
*  sets its local description. When this event occurs it sends its candidate information to the remote peer
*  To establish the connection.
*  The ontrack event is triggered when streaming data is recieved, the client takes this streaming data and
*  Displays it on the specifed video element.
*/
socket.on("offer",function(id,offer){
    console.log("Student Recieved Offer");
    peerConnection = new RTCPeerConnection(webRtcConfig);
    peerConnection.setRemoteDescription(offer)
    .then(()=>peerConnection.createAnswer())
    .then((sdp)=>peerConnection.setLocalDescription(sdp))
    .then(function(){
        socket.emit("answer",id, peerConnection.localDescription);
    });

    peerConnection.onicecandidate = function(event) {
		if (event.candidate) {
            console.log("student emitting candidate offer");
			socket.emit('candidate', id, event.candidate);
        }};

    peerConnection.ontrack = event => {
        console.log("Recieving video");
        let video = document.getElementById("ForiegnVid");
            video.srcObject = event.streams[0];
            video.play();
          };
});

socket.on('StreamEnd',function(){
    let video = document.getElementById("ForiegnVid");
    video.pause();
    video.removeAttribute("src");
    video.load();
})
/*Reacts upon a new candidate, the new candidate is added to the associated
* candidate. The connection is referenced via the id.
*/
socket.on('candidate', function(id, candidate) {
	try{
        console.log("student recieving candidate offer");
	    peerConnection.addIceCandidate((candidate))
	    .then(console.log("Successfully added Candidate"));
	}
	catch(e)
	{
		console.log("Error Occured"+e);
	}
    });
    
    socket.emit("joinRoom","Math");
    socket.emit("Join_Stream");
};


export{JoinStream}