import React from "react";
import Proptypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";

const Like = (props) => {
  return (
    <i
      className={props.liked ? "fa fa-heart" : "fa fa-heart-o"}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={props.onLikeClick}
    ></i>
  );
};

Like.propTypes = {
  liked: Proptypes.bool,
  onLikeClick: Proptypes.func.isRequired,
};

export default Like;
