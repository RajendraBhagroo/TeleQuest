import React from "react";
import { Link } from "react-router-dom";

const ProfileNotFound = props => {
  return (
    <div>
      <center>
        <h4>
          There is no profile in this account. Please create your profile.
        </h4>
        <Link
          type="button"
          className="btn btn-primary pull-right"
          to="/profileUpdate"
        >
          Create Profile
        </Link>
      </center>
    </div>
  );
};

export default ProfileNotFound;
