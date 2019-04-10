import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCourseEnrolledIn } from "../../redux/actions/profileActions";
import PropTypes from "prop-types";

class CoursesEnrolledInTab extends Component {
  onDeleteClick(id) {
    this.props.deleteCourseEnrolledIn(id);
  }

  render() {
    const CoursesEnrolledIn = (
      <div>
        {this.props.course.map(enrolled => (
          <div
            key={enrolled._id}
            action="##"
            method="post"
            id="courseEnrolledPage"
          >
            <div className="form-group row">
              <div className="col">
                <h5>Course Name</h5>
                <h6 className="font-weight-light">{enrolled.name}</h6>
              </div>
              <div className="col">
                <h5>Course Type/Number</h5>
                <h6 className="font-weight-light">
                  {enrolled.type} {enrolled.number}
                </h6>
              </div>
            </div>

            <br />

            <div className="form-group">
              <h5>Professor's Name</h5>
              <h6 className="font-weight-light">
                {enrolled.teacher.firstName} {enrolled.teacher.lastName}
              </h6>
            </div>
            <br />
            <div>
              <Link
                onClick={this.onDeleteClick.bind(this, enrolled._id)}
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

    return (
      <div>
        <div>{CoursesEnrolledIn}</div>
      </div>
    );
  }
}

CoursesEnrolledInTab.propTypes = {
  deleteCourseEnrolledIn: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCourseEnrolledIn }
)(CoursesEnrolledInTab);
