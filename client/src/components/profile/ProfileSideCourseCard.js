import React, { Component } from "react";

class ProfileSideCourseCard extends Component {
  render() {
    const ProfileSideCourseCard = (
      <ul className="list-group list-group-flush">
        {this.props.course.map(list => (
          <li
            key={list._id}
            className="list-group-item"
            action="##"
            method="post"
            id="courseEnrolledPage"
          >
            {list.type} {list.number}
          </li>
        ))}
      </ul>
    );

    return <div>{ProfileSideCourseCard}</div>;
  }
}

export default ProfileSideCourseCard;
