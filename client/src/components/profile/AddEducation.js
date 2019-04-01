import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addEducation } from "../../redux/actions/profileActions";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class AddEducation extends React.Component {
  constructor() {
    super();
    this.state = {
      school: "",
      location: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      isCurrent: "",
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

    const educationInfo = {
      school: this.state.school,
      location: this.state.location,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      isCurrent: this.state.isCurrent,
      description: this.state.description
    };

    this.props.addEducation(educationInfo);
  };

  onCheck = e => {
    this.setState({ isCurrent: e.target.checked });
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
                        <h4>Add Education</h4>
                      </center>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            School Name
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="School Name"
                              name="school"
                              value={this.state.school}
                              onChange={this.onChange}
                              error={errors.school}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            School Location
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="School Location"
                              name="location"
                              value={this.state.location}
                              onChange={this.onChange}
                              error={errors.location}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">Degree</label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Degree"
                              name="degree"
                              value={this.state.degree}
                              onChange={this.onChange}
                              error={errors.degree}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Field of Study
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Field of Study"
                              name="fieldOfStudy"
                              value={this.state.fieldOfStudy}
                              onChange={this.onChange}
                              error={errors.fieldOfStudy}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            for="isCurrent"
                            className="col-4 col-form-label"
                          >
                            Is It Your Current Job?
                          </label>
                          <div className="col-8">
                            <div className="form-check form-check-inline">
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  onChange={this.onCheck}
                                />
                                Yes
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label for="from" className="col-4 col-form-label">
                            Working
                          </label>
                          <div className="col-8">
                            From:
                            <br />
                            <br />
                            <TextFieldGroup
                              type="date"
                              placeholder="DD/MM/YYYY"
                              name="from"
                              //value={this.state.}
                              //onChange={this.onChange}
                              //error={errors.}
                            />
                            To: <br />
                            <br />
                            <TextFieldGroup
                              type="date"
                              placeholder="DD/MM/YYYY"
                              name="to"
                              //value={this.state.}
                              //onChange={this.onChange}
                              //error={errors.}
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
                              Add Experience
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

AddEducation.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(AddEducation);
