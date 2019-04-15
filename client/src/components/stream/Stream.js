import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Stream extends Component{
    /*Upon mounting of stream, the user's video, and audio will be obtained
    * Even thought most browsers support navigator.getUserMedia
    * Its better to include the other four just incase
    */
    componentDidMount(){
        navigator.getUserMedia = navigator.getUserMedia || 
                                 navigator.webkitGetUserMedia ||
                                 navigator.mozGetUserMedia ||
                                 navigator.msGetUserMedia || 
                                 navigator.oGetUserMedia;
        if(navigator.getUserMedia){
            navigator.getUserMedia({video:true,audio:true},this.handleVid,this.vidError);
        }
    }
    
    handleVid(stream){
        this.setState({videoSrc:window.URL.createObjectURL(stream)});
    }

    vidError(e){
        console.log(e);
    }
    render(){
        return <div>
          <video src={this.state.videoSrc} autoPlay="true" />
        </div>;
        }
}