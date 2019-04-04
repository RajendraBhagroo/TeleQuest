import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import EducationTab from "./EducationTab";
import ExperienceTab from "./ExperienceTab";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class Profile extends React.Component {
  state = {};

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let publicProfile;

    if (profile === null || loading) {
      publicProfile = <Spinner />;
    } else {
      if (profile.isStudent === true || false) {
        publicProfile = (
          <div className="container">
            <br />
            <div className="row">
              <div className="col-sm-10">
                <h1>{user.userName}</h1>
              </div>
            </div>
            <br />

            <div className="row">
              <div className="col-sm-3">
                <div className="text-center">
                  <img
                    className="rounded-circle ml-2"
                    src={user.avatar}
                    alt={user.userName}
                    title="You must have a Gravatar connected to your email to display an image"
                  />
                </div>

                <br />

                <div className="card">
                  <div className="card-header">
                    <strong>Course</strong>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">CSCI 455</li>
                    <li className="list-group-item">IENG 320</li>
                    <li className="list-group-item">IENG 400</li>
                  </ul>
                </div>
                <br />

                <div className="card">
                  <div className="card-header">
                    <strong>Social Media</strong>
                  </div>
                  <div className="card-body">
                    <a href={`${profile.social.youtube}`} className="card-link">
                      Youtube
                    </a>
                    <br />
                    <a href={`${profile.social.twitter}`} className="card-link">
                      Twitter
                    </a>
                    <br />
                    <a
                      href={`${profile.social.linkedin}`}
                      className="card-link"
                    >
                      Linked in
                    </a>
                    <br />
                    <a
                      href={`${profile.social.facebook}`}
                      className="card-link"
                    >
                      Facebook
                    </a>
                    <br />
                    <a
                      href={`${profile.social.istagram}`}
                      className="card-link"
                    >
                      Instagram
                    </a>
                    <br />
                    <a href={`${profile.social.github}`} className="card-link">
                      Github
                    </a>
                  </div>
                </div>
                <br />
              </div>

              <div className="col-sm-9">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="profile"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="true"
                      href="#Profile"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="expereince"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="experince"
                      aria-selected="false"
                      href="#Experience"
                    >
                      Experience
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="education"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="education"
                      aria-selected="false"
                      href="#Education"
                    >
                      Education
                    </a>
                  </li>
                </ul>
                <br />

                <div className="tab-content">
                  {/* ----------------------------------Profile tab---------------------------------------------------- */}
                  <div
                    className="tab-pane fade show active"
                    role="tabpanel"
                    id="Profile"
                  >
                    <form
                      className="form"
                      action="##"
                      method="post"
                      id="profilePage"
                    >
                      <div className="form-group row">
                        <div className="col">
                          <h5>First name</h5>
                          <h6 className="font-weight-light">
                            {user.firstName}
                          </h6>
                        </div>
                        <div className="col">
                          <h5>Last name</h5>
                          <h6 className="font-weight-light">{user.lastName}</h6>
                        </div>
                      </div>
                      <br />
                      {console.log(user)}
                      <div className="form-group row">
                        <div className="col">
                          <h5>Email</h5>
                          <h6 className="font-weight-light">{user.email}</h6>
                        </div>
                        <div className="col">
                          <h5>Ocupation</h5>
                          <div>{profile.isStudent ? "Student" : "Teacher"}</div>
                        </div>
                      </div>
                      <br />

                      <div className="form-group">
                        <h5>Bio</h5>
                        <h6 className="font-weight-light">{profile.bio}</h6>
                      </div>
                      <br />

                      <div className="form-group">
                        <h5>Skills</h5>
                        <h6 className="font-weight-light">
                          {profile.skills.join(", ")}
                        </h6>
                      </div>
                    </form>
                    <br />
                    <div>
                      <Link
                        type="button"
                        className="btn btn-primary pull-right"
                        to="/profileUpdate"
                      >
                        Update Profile
                      </Link>
                    </div>
                    <br />
                    <div>
                      <button
                        onClick={this.onDeleteClick.bind(this)}
                        className="btn btn-danger"
                      >
                        Delete My Account
                      </button>
                    </div>
                  </div>

                  {/* ----------------------------------Experience tab---------------------------------------------------- */}
                  <div
                    className="tab-pane fade"
                    role="tabpanel"
                    id="Experience"
                  >
                    <div>
                      <ExperienceTab exp={profile.experience} />
                    </div>

                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        <Link
                          type="button"
                          className="btn btn-primary pull-right"
                          to="/addExperience"
                        >
                          Add New Experience
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* ----------------------------------Education tab---------------------------------------------------- */}
                  <div className="tab-pane fade" role="tabpanel" id="Education">
                    <div>
                      <EducationTab edu={profile.education} />
                    </div>

                    <div className="form-group">
                      <div className="col-xs-12">
                        <br />
                        <Link
                          type="button"
                          className="btn btn-primary pull-right"
                          to="/addEducation"
                        >
                          Add New Education
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
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
    }

    return <div style={styles.Limite}>{publicProfile}</div>;
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Profile);
