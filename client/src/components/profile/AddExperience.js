import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addExperience } from "../../redux/actions/profileActions";

const styles = {
  Limite: {
    width: "1000px",
    margin: "auto"
  }
};

class AddExperience extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      isCurrent: false,
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

    const experienceInfo = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      isCurrent: this.state.isCurrent,
      description: this.state.description
    };

    this.props.addExperience(experienceInfo);
  };

  onCheck = e => {
    this.setState({ isCurrent: e.target.checked });
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
                        <h4>Add Experience</h4>
                      </center>
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-md-12">
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">Title</label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Title"
                              name="title"
                              value={this.state.title}
                              onChange={this.onChange}
                              error={errors.title}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Company
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Company"
                              name="company"
                              value={this.state.company}
                              onChange={this.onChange}
                              error={errors.company}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Location
                          </label>
                          <div className="col-8">
                            <TextFieldGroup
                              placeholder="Location"
                              name="location"
                              value={this.state.location}
                              onChange={this.onChange}
                              error={errors.location}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Employment Status
                          </label>
                          <div className="col-8">
                            <div className="form-check form-check-inline">
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  onChange={this.onCheck}
                                />
                                Is This Your Current Job?
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-4 col-form-label">
                            Employment Dates
                          </label>
                          <div className="col-8">
                            From:
                            <br />
                            <br />
                            <TextFieldGroup
                              type="date"
                              placeholder="DD/MM/YYYY"
                              name="from"
                              value={this.state.from}
                              onChange={this.onChange}
                              error={errors.from}
                            />
                            To: <br />
                            <br />
                            <TextFieldGroup
                              type="date"
                              placeholder="DD/MM/YYYY"
                              name="to"
                              value={this.state.to}
                              onChange={this.onChange}
                              error={errors.to}
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

AddExperience.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(AddExperience);
