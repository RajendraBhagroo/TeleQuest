import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteExperience } from "../../redux/actions/profileActions";

class ExperienceTab extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const Experience = (
      <div>
        {this.props.exp.map(experience => (
          <div
            key={experience._id}
            action="##"
            method="post"
            id="experiencePage"
          >
            <div className="form-group row">
              <div className="col">
                <h5>Title</h5>
                <h6 className="font-weight-light">{experience.title}</h6>
              </div>
              <div className="col">
                <h5>Company</h5>
                <h6 className="font-weight-light">{experience.company}</h6>
              </div>
            </div>
            <br />

            <div className="form-group">
              <h5>Location</h5>
              <h6 className="font-weight-light">{experience.location}</h6>
            </div>
            <br />

            <div className="form-group">
              <h5>Is It Your Current Job?</h5>
              <h6 className="font-weight-light">
                {experience.isCurrent ? "Yes" : "No"}
              </h6>
            </div>
            <br />

            <div className="form-group row">
              <div className="col">
                <h5>From</h5>
                <h6 className="font-weight-light">
                  {experience.from.slice(0, 10)}
                </h6>
              </div>
              <div className="col">
                <h5>To</h5>
                <h6 className="font-weight-light">
                  {experience.isCurrent ? (
                    "Current job"
                  ) : (
                    <div>{experience.to.slice(0, 10)}</div>
                  )}
                </h6>
              </div>
            </div>
            <br />

            <div className="form-group">
              <h5>Description</h5>
              <h6 className="font-weight-light">{experience.description}</h6>
            </div>
            <br />

            <div>
              <Link
                onClick={this.onDeleteClick.bind(this, experience._id)}
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

    return <div>{Experience}</div>;
  }
}

ExperienceTab.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(ExperienceTab);
