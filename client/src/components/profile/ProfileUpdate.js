import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { updateProfile } from "../../redux/actions/profileActions";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class ProfileUpdate extends React.Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      isStudent: "",
      studentId: "",
      teacherId: "",
      bio: "",
      skills: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      github: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileInfo = {
      handle: this.state.handle,
      isStudent: this.state.isStudent,
      studentId: this.state.studentId,
      teacherId: this.state.teacherId,
      bio: this.state.bio,
      skills: this.state.skills,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram,
      github: this.state.github
    };

    this.props.updateProfile(profileInfo);
  };

  onCheck = e => {
    this.setState({ isStudent: e.target.checked });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    const { userName } = this.props.auth.user;

    return (
      <div style={styles.Limite}>
        <div className="container">
          <div className="span3 well">
            <center>
              <img
                className="rounded-circle ml-2"
                src={user.avatar}
                alt={user.userName}
                title="You must have a Gravatar connected to your email to display an image"
              />
              <h3>{userName}</h3>
              <em>Student</em>
            </center>
          </div>
        </div>

        <hr />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <center>
                        <h4>Update Profile</h4>
                      </center>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">Handle</label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Put your name"
                              name="handle"
                              value={this.state.handle}
                              onChange={this.onChange}
                              error={errors.handle}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Occupation
                          </label>
                          <div className="col-8">
                            <div className="form-check form-check-inline">
                              <div className="checkbox">
                                <label
                                  data-toggle="collapse"
                                  data-target="#isStudent"
                                  aria-expanded="true"
                                  aria-controls="isStudent"
                                >
                                  <input
                                    type="checkbox"
                                    onChange={this.onCheck}
                                  />
                                  Are you Student?
                                </label>
                              </div>
                            </div>
                            <div id="isStudent" className="collapse">
                              <div className="well">
                                <TextFieldGroup
                                  placeholder="Student ID"
                                  name="studentId"
                                  value={this.state.studentId}
                                  onChange={this.onChange}
                                  error={errors.studentId}
                                />
                              </div>
                            </div>
                            <div id="isStudent" className="collapse show">
                              <div className="well">
                                <TextFieldGroup
                                  placeholder="Teacher ID"
                                  name="teacherId"
                                  value={this.state.teacherId}
                                  onChange={this.onChange}
                                  error={errors.teacherId}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">Bio</label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Bio"
                              name="bio"
                              value={this.state.bio}
                              onChange={this.onChange}
                              error={errors.bio}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">Skills</label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Skills"
                              name="skills"
                              value={this.state.skills}
                              onChange={this.onChange}
                              error={errors.skills}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">Social</label>
                          <div className="col-8">
                            Youtube
                            <TextFieldGroup
                              placeholder="Youtube"
                              name="youtube"
                              value={this.state.youtube}
                              onChange={this.onChange}
                              error={errors.youtube}
                            />
                            Twitter
                            <TextFieldGroup
                              placeholder="Twitter"
                              name="twitter"
                              value={this.state.twitter}
                              onChange={this.onChange}
                              error={errors.twitter}
                            />
                            Facebook
                            <TextFieldGroup
                              placeholder="Facebook"
                              name="facebook"
                              value={this.state.facebook}
                              onChange={this.onChange}
                              error={errors.facebook}
                            />
                            Linked In
                            <TextFieldGroup
                              placeholder="Linked in"
                              name="linkedin"
                              value={this.state.linkedin}
                              onChange={this.onChange}
                              error={errors.linkedin}
                            />
                            Instagram
                            <TextFieldGroup
                              placeholder="Instagram"
                              name="instagram"
                              value={this.state.instagram}
                              onChange={this.onChange}
                              error={errors.instagram}
                            />
                            Github
                            <TextFieldGroup
                              placeholder="Github"
                              name="github"
                              value={this.state.github}
                              onChange={this.onChange}
                              error={errors.github}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="offset-4 col-8">
                            <button
                              name="submit"
                              type="submit"
                              className="btn btn-primary"
                            >
                              Update My Profile
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileUpdate.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile }
)(ProfileUpdate);
