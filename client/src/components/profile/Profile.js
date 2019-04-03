import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class Profile extends React.Component {
  state = {};

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
                  <Link to="#" className="card-link">
                    Youtube
                  </Link>
                  <br />
                  <Link to="#" className="card-link">
                    Twitter
                  </Link>
                  <br />
                  <Link to="#" className="card-link">
                    Linked in
                  </Link>
                  <br />
                  <Link to="#" className="card-link">
                    Facebook
                  </Link>
                  <br />
                  <Link to="#" className="card-link">
                    Instagram
                  </Link>
                  <br />
                  <Link to="#" className="card-link">
                    Github
                  </Link>
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
                        <h6 className="font-weight-light">{user.firstName}</h6>
                      </div>
                      <div className="col">
                        <h5>Last name</h5>
                        <h6 className="font-weight-light">{user.lastName}</h6>
                      </div>
                    </div>
                    <br />

                    <div className="form-group row">
                      <div className="col">
                        <h5>Email</h5>
                        <h6 className="font-weight-light">{user.email}</h6>
                      </div>
                      <div className="col">
                        <h5>Ocupation</h5>
                        <h6 className="font-weight-light">Change</h6>
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
                  <Link
                    type="button"
                    className="btn btn-primary pull-right"
                    to="/profileUpdate"
                  >
                    Update Profile
                  </Link>
                </div>
                {/* ----------------------------------Experience tab---------------------------------------------------- */}
                <div className="tab-pane fade" role="tabpanel" id="Experience">
                  <form
                    className="form"
                    action="##"
                    method="post"
                    id="experiencePage"
                  >
                    <div className="form-group row">
                      <div className="col">
                        <h5>Title</h5>
                        <h6 className="font-weight-light">Student</h6>
                      </div>
                      <div className="col">
                        <h5>Company</h5>
                        <h6 className="font-weight-light">NYIT</h6>
                      </div>
                    </div>
                    <br />

                    <div className="form-group">
                      <h5>Location</h5>
                      <h6 className="font-weight-light">
                        Northern Blvd, Old Westbury, NY 11568
                      </h6>
                    </div>
                    <br />

                    <div className="form-group">
                      <h5>Is It Your Current Job?</h5>
                      <h6 className="font-weight-light">No</h6>
                    </div>
                    <br />

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
                  </form>
                </div>

                {/* ----------------------------------Education tab---------------------------------------------------- */}
                <div className="tab-pane fade" role="tabpanel" id="Education">
                  <form
                    className="form"
                    action="##"
                    method="post"
                    id="educationPage"
                  >
                    <div className="form-group row">
                      <div className="col">
                        <h5>School</h5>
                        <h6 className="font-weight-light">NYIT</h6>
                      </div>
                      <div className="col">
                        <h5>Degree</h5>
                        <h6 className="font-weight-light">Bachelor</h6>
                      </div>
                    </div>
                    <br />

                    <div className="form-group">
                      <h5>Location</h5>
                      <h6 className="font-weight-light">
                        Northern Blvd, Old Westbury, NY 11568
                      </h6>
                    </div>
                    <br />

                    <div className="form-group">
                      <h5>Is It Your Current Job?</h5>
                      <h6 className="font-weight-light">Yes</h6>
                    </div>
                    <br />

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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div style={styles.Limite}>{publicProfile}</div>;
  }
}

Profile.propTypes = {
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
)(Profile);
