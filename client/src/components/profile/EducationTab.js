import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEducation } from "../../redux/actions/profileActions";
import PropTypes from "prop-types";

class EducationTab extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const Education = (
      <div>
        {this.props.edu.map(education => (
          <div key={education._id} action="##" method="post" id="educationPage">
            <div className="form-group row">
              <div className="col">
                <h5>School</h5>
                <h6 className="font-weight-light">{education.school}</h6>
              </div>
              <div className="col">
                <h5>Field of Study</h5>
                <h6 className="font-weight-light">{education.fieldOfStudy}</h6>
              </div>
            </div>
            <br />

            <div className="form-group">
              <h5>Location</h5>
              <h6 className="font-weight-light">{education.location}</h6>
            </div>
            <br />

            <div className="form-group row">
              <div className="col">
                <h5>Degree</h5>
                <h6 className="font-weight-light">{education.degree}</h6>
              </div>
              {education.isCurrent ? (
                <div className="col">
                  <h5>Current Educational Institution</h5>
                  <h6 className="font-weight-light">Yes</h6>
                </div>
              ) : (
                ""
              )}
            </div>
            <br />

            <div className="form-group row">
              <div className="col">
                <h5>From</h5>
                <h6 className="font-weight-light">
                  {education.from.slice(0, 10)}
                </h6>
              </div>
              <div className="col">
                <h5>To</h5>
                <h6 className="font-weight-light">
                  {education.isCurrent ? (
                    "Current Education"
                  ) : (
                    <div>{education.to.slice(0, 10)}</div>
                  )}
                </h6>
              </div>
            </div>
            <br />

            <div className="form-group">
              <h5>Description</h5>
              <h6 className="font-weight-light">{education.description}</h6>
            </div>
            <br />
            <div>
              <Link
                onClick={this.onDeleteClick.bind(this, education._id)}
                className="btn btn-danger"
                to="/profile"
              >
                Delete
              </Link>
            </div>
            <br />
            <hr />
          </div>
        ))}
      </div>
    );

    return <div>{Education}</div>;
  }
}

EducationTab.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(EducationTab);
