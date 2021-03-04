import React from "react";

import { RatingPalette } from "./RatingPalette";
import { movies } from "../utils/constants";

export const AutocompleteForm = ({
  pickMovie,
  searchValue,
  currentRating,
  currentGenre
}) => {
  const moviesClone = movies.slice();
  const filteredByName = moviesClone.filter(
    (item) =>
      item.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) &&
      (currentRating.length < 1 ||
        currentRating.includes(Math.floor(item.rating))) &&
      (currentGenre.length < 1 || currentGenre.includes(item.category))
  );

  return (
    <div
      className={`current_filter ${filteredByName.length < 1 ? "d-none" : ""}`}
    >
      {filteredByName.map((movie) => {
        return (
          <div
            className="current_filter__element"
            onClick={() => pickMovie(movie.name)}
            key={movie.name}
          >
            <div>
              <p className="current_filter__element__name"> {movie.name} </p>
              <RatingPalette rating={movie.rating} />
            </div>
            <p className="current_filter__element__category">
              {movie.category}
            </p>
          </div>
        );
      })}
    </div>
  );
};
