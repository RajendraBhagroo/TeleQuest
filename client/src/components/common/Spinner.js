import React from "react";
import Spinner from "../../resources/images/Spinner.gif";

export default () => {
  return (
    <div>
      <img
        src={Spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading"
      />
    </div>
  );
};