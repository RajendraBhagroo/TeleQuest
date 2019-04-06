import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addCourseTeaching } from "../../redux/actions/profileActions";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class AddCourseTeaching extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      type: "",
      number: "",
      description: "",
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

    const courseTeachingInfo = {
      name: this.state.name,
      type: this.state.type,
      number: this.state.number,
      description: this.state.description
    };

    this.props.addCourseTeaching(courseTeachingInfo);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { user } = this.props.auth;
    const { isStudent } = this.props.profile;
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
              <em>{isStudent ? "Student" : "Teacher"}</em>
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
                        <h4>Add Teaching Course</h4>
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
                              placeholder="Course Name"
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
                              placeholder="Course Type"
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
                              placeholder="Course Number"
                              name="number"
                              value={this.state.number}
                              onChange={this.onChange}
                              error={errors.number}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Description
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Description"
                              name="description"
                              value={this.state.description}
                              onChange={this.onChange}
                              error={errors.description}
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
                              Add Teaching Course
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

AddCourseTeaching.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addCourseTeaching: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCourseTeaching }
)(AddCourseTeaching);
