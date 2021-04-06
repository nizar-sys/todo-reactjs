import React from "react";
const Button = ({ title, onClick, loading }) => {
  // console.log(loading);
  if (loading === true) {
    return (
      <button className="btn btn-primary mt-3" disabled onClick={onClick}>
        Loading...
      </button>
    );
  } else {
    // console.log(loading);
    return (
      <button className="btn btn-primary mt-3" onClick={onClick}>
        {title}
      </button>
    );
  }
};
export default Button;
