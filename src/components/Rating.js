import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 1
              ? "star"
              : value >= 0.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
      </span>

      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 2
              ? "star"
              : value >= 1.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
      </span>

      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 3
              ? "star"
              : value >= 2.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
      </span>

      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 4
              ? "star"
              : value >= 3.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
      </span>

      <span style={{ color }}>
        <FontAwesomeIcon
          icon={
            value >= 5
              ? "star"
              : value >= 4.5
              ? "star-half-alt"
              : ["far", "star"]
          }
        />
      </span>
      {/* if text, show it */}
      <span>{text && text}</span>
    </div>
  );
};

// set default prop values for a component
Rating.defaultProps = {
  color: "#f8e825",
};

// for type checking
Rating.prototype = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
