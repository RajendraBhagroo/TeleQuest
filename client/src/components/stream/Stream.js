import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

class Stream extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
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
