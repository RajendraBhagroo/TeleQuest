import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import TextFieldGroup from "../common/TextFieldGroup";
import {
  updateProfile,
  getCurrentProfile
} from "../../redux/actions/profileActions";
import isEmpty from "../../utils/is-empty";

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
      isStudent: true,
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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesnt exist, make empty string
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.isStudent = !isEmpty(profile.isStudent)
        ? profile.isStudent
        : false;
      profile.studentFields = !isEmpty(profile.studentFields)
        ? profile.studentFields
        : {};
      profile.studentFields.studentId = !isEmpty(
        profile.studentFields.studentId
      )
        ? String(profile.studentFields.studentId)
        : "";
      profile.teacherFields = !isEmpty(profile.teacherFields)
        ? profile.teacherFields
        : {};
      profile.teacherFields.teacherId = !isEmpty(
        profile.teacherFields.teacherId
      )
        ? String(profile.teacherFields.teacherId)
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.social.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.social.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.social.github = !isEmpty(profile.social.github)
        ? profile.social.github
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        isStudent: profile.isStudent,
        studentId: profile.studentFields.studentId,
        teacherId: profile.teacherFields.teacherId,
        bio: profile.bio,
        skills: skillsCSV,
        youtube: profile.social.youtube,
        twitter: profile.social.twitter,
        facebook: profile.social.facebook,
        linkedin: profile.social.linkedin,
        instagram: profile.social.instagram,
        github: profile.social.github
      });
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
    const { profile, loading } = this.props.profile;
    const { errors } = this.state;

    let updateProfilePage;

    if (profile === null || loading) {
      updateProfilePage = <Spinner />;
    } else {
      updateProfilePage = (
        <div style={styles.Limite}>
          <div className="container">
            <div className="span3 well">
              <center>
                <img
                  className="rounded-circle ml-2 mb-2"
                  src={user.avatar}
                  alt={user.userName}
                  title="You must have a Gravatar connected to your email to display an image"
                />
                <h3>{user.userName}</h3>
                <em>{this.state.isStudent ? "Student" : "Teacher"}</em>
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
                            <label className="col-4 col-form-label">
                              Handle
                            </label>
                            <div className="col-8">
                              <TextFieldGroup
                                placeholder="Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info={"This Determines Your Unique URL"}
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
                                      defaultChecked={true}
                                    />
                                    Are You Currently A Student?
                                  </label>
                                </div>
                              </div>
                              <div id="isStudent" className="collapse show">
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
                              <div id="isStudent" className="collapse">
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
                            <label className="col-4 col-form-label">
                              Skills
                            </label>
                            <div className="col-8">
                              <TextFieldGroup
                                placeholder="Skills"
                                name="skills"
                                info={
                                  "Comma Seperated Values [Ex. Python, Public Speaking, Accounting]"
                                }
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-4 col-form-label">
                              Social Media
                            </label>
                            <div className="col-8">
                              <i className="fab fa-twitter mr-2" />
                              Youtube
                              <TextFieldGroup
                                placeholder="https://www.youtube.com/user/"
                                name="youtube"
                                value={this.state.youtube}
                                onChange={this.onChange}
                                error={errors.youtube}
                              />
                              <i className="fab fa-twitter mr-2" />
                              Twitter
                              <TextFieldGroup
                                placeholder="https://twitter.com/"
                                name="twitter"
                                value={this.state.twitter}
                                onChange={this.onChange}
                                error={errors.twitter}
                              />
                              <i className="fab fa-facebook mr-2" />
                              Facebook
                              <TextFieldGroup
                                placeholder="https://www.facebook.com/"
                                name="facebook"
                                value={this.state.facebook}
                                onChange={this.onChange}
                                error={errors.facebook}
                              />
                              <i className="fab fa-linkedin mr-2" />
                              Linked In
                              <TextFieldGroup
                                placeholder="https://www.linkedin.com/in/"
                                name="linkedin"
                                value={this.state.linkedin}
                                onChange={this.onChange}
                                error={errors.linkedin}
                              />
                              <i className="fab fa-instagram mr-2" />
                              Instagram
                              <TextFieldGroup
                                placeholder="https://www.instagram.com/"
                                name="instagram"
                                value={this.state.instagram}
                                onChange={this.onChange}
                                error={errors.instagram}
                              />
                              <i className="fab fa-github mr-2" />
                              Github
                              <TextFieldGroup
                                placeholder="https://github.com/"
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
    return <div style={styles.Limite}>{updateProfilePage}</div>;
  }
}

ProfileUpdate.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile, getCurrentProfile }
)(ProfileUpdate);
