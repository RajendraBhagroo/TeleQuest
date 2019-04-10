import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCourseTeaching } from "../../redux/actions/profileActions";
import PropTypes from "prop-types";

class CoursesTeachingTab extends Component {
  onDeleteClick(id) {
    this.props.deleteCourseTeaching(id);
  }

  render() {
    const CoursesTeaching = (
      <div>
        {this.props.courseTeaching.map(teaching => (
          <div
            key={teaching._id}
            action="##"
            method="post"
            id="courseTeachingPage"
          >
            <div className="form-group row">
              <div className="col">
                <h5>Course Name</h5>
                <h6 className="font-weight-light">{teaching.name}</h6>
              </div>
              <div className="col">
                <h5>Course Type/Number</h5>
                <h6 className="font-weight-light">
                  {teaching.type} {teaching.number}
                </h6>
              </div>
            </div>
            <br />

            <div className="form-group">
              <h5>Course Description</h5>
              <h6 className="font-weight-light">{teaching.description}</h6>
            </div>
            <br />
            <div>
              <Link
                onClick={this.onDeleteClick.bind(this, teaching._id)}
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

    return <div>{CoursesTeaching}</div>;
  }
}

CoursesTeachingTab.propTypes = {
  deleteCourseTeaching: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourseTeaching }
)(CoursesTeachingTab);
