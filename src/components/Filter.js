import React from "react";
import { RatingPalette } from "./RatingPalette";
import { movies } from "../utils/constants";

export const Filter = ({ setCurrent, current, type }) => {
  const items = [];

  const categoriesSet = movies.reduce((acc, cur) => {
    return acc.includes(cur.category) ? acc : [...acc, cur.category];
  }, []);

  for (let i = 1; i <= 10; i++) {
    items.push(
      <div className="current_filter_item" key={i + "rating"}>
        <input
          type="checkbox"
          checked={current.includes(i)}
          onChange={() => handleChange(i)}
        />
        <RatingPalette rating={i} />
      </div>
    );
  }

  const rule =
    type === "rating"
      ? current.length === items.length
      : current.length === categoriesSet.length;

  const handleChange = (value) => {
    if (value === "any") {
      if (rule) {
        return setCurrent([]);
      } else {
        let fullLoadedArray = [];
        if (type === "rating") {
          for (let i = 1; i <= 10; i++) {
            fullLoadedArray.push(i);
          }
          return setCurrent(fullLoadedArray);
        } else {
          return setCurrent(categoriesSet);
        }
      }
    }

    if (current.includes(value)) {
      const filteredResult = current.filter((item) => item !== value);
      setCurrent(filteredResult);
    } else {
      setCurrent([...current, value]);
    }
  };

  return (
    <>
      <div className="current_filter_item">
        <input
          type="checkbox"
          onChange={() => handleChange("any")}
          checked={
            type === "rating"
              ? current.length === items.length
              : current.length === categoriesSet.length
          }
        />
        <p className="any">Any {type}</p>
      </div>
      {type === "rating"
        ? items
        : categoriesSet.map((item) => {
            return (
              <div className="current_filter_item" key={item}>
                <input
                  type="checkbox"
                  onChange={() => handleChange(item)}
                  checked={current.includes(item)}
                />
                {item}
              </div>
            );
          })}
    </>
  );
};
