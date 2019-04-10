import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addCourseEnrolledIn } from "../../redux/actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class AddCourseEnrolledIn extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      number: "",
      firstName: "",
      lastName: "",
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

    const courseEnrolledInInfo = {
      name: this.state.name,
      type: this.state.type,
      number: this.state.number,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    };

    this.props.addCourseEnrolledIn(courseEnrolledInInfo);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { errors } = this.state;

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
              <h3>{user.userName}</h3>
              <em>{profile.isStudent ? "Student" : "Teacher"}</em>
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
                        <h4>Add Enrolled Course</h4>
                      </center>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Course Name
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Senior Project"
                              name="name"
                              value={this.state.name}
                              onChange={this.onChange}
                              error={errors.name}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Course Type
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="CSCI"
                              name="type"
                              value={this.state.type}
                              onChange={this.onChange}
                              error={errors.type}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Course Number
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="330"
                              name="number"
                              value={this.state.number}
                              onChange={this.onChange}
                              error={errors.number}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Professor's First Name
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Professor's First Name"
                              name="firstName"
                              value={this.state.firstName}
                              onChange={this.onChange}
                              error={errors.firstName}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Professor's Last Name
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Professor's Last Name"
                              name="lastName"
                              value={this.state.lastName}
                              onChange={this.onChange}
                              error={errors.lastName}
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
                              Add Enrolled Course
                            </button>
                          </div>
                        </div>
                      </form>
                      <br />
                      <Link className="btn btn-success" to="/profile">
                        Return to Profile
                      </Link>
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

AddCourseEnrolledIn.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addCourseEnrolledIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCourseEnrolledIn }
)(AddCourseEnrolledIn);
