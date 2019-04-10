import React from "react";
import Spinner from "../../resources/images/Spinner.gif";

const styles = {
  Spinner: {
    width: "200px",
    margin: "auto",
    display: "block"
  }
};

export default () => {
  return (
    <div>
      <img src={Spinner} style={styles.Spinner} alt="Loading" />
    </div>
  );
};
