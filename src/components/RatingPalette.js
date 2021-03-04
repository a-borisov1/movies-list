import React from "react";

import halfStar from "../assets/halfStar.svg";

export const RatingPalette = ({ rating }) => {
  const emptyStarString = "☆☆☆☆☆☆☆☆☆☆";
  const fullStarString = "★★★★★★★★★★";
  const floorRate = Math.floor(rating);
  const rate = fullStarString.slice(0, floorRate);

  const rule = Math.floor(rating) === rating;
  const restRate = rule
    ? emptyStarString.slice(0, 10 - floorRate)
    : emptyStarString.slice(0, 9 - floorRate);
  return (
    <div>
      {rule ? (
        rate + restRate
      ) : (
        <div>
          {rate}
          <img
            className="star-image"
            style={{ width: 13, position: "relative", top: 1 }}
            src={halfStar}
            alt="half-star"
          />
          {restRate}
        </div>
      )}
    </div>
  );
};
