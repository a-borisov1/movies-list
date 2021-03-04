import React, { useState, useRef } from "react";

import { AutocompleteForm } from "./AutocompleteForm";
import { Filter } from "./Filter";
import { useOutsideClick } from "../utils/useOutsideClick";

import "../styles/style.scss";

export const MainForm = () => {
  const [currentVal, setCurrentVal] = useState("");
  const [isRatingFilterVisible, setRatingFilterVisible] = useState(false);
  const [isGenreFilterVisible, setGenreFilterVisible] = useState(false);
  const [currentRating, setCurrentRating] = useState([]);
  const [currentGenre, setCurrentGenre] = useState([]);
  const [isAutocompleteVisible, setAutocompleteVisible] = useState(false);

  const ratingFilter = useRef(null);
  const genreFilter = useRef(null);
  const autoCompleteList = useRef(null);

  useOutsideClick(autoCompleteList, () => {
    setAutocompleteVisible(false);
  });

  useOutsideClick(ratingFilter, () => {
    setRatingFilterVisible(false);
  });

  useOutsideClick(genreFilter, () => {
    setGenreFilterVisible(false);
  });

  const pickMovie = (movie) => {
    setCurrentVal(movie);
  };

  const handleOpen = (flag) => {
    if (flag) {
      setRatingFilterVisible(!isRatingFilterVisible);
      setGenreFilterVisible(false);
    } else {
      setRatingFilterVisible(false);
      setGenreFilterVisible(!isGenreFilterVisible);
    }
  };

  return (
    <div>
      <div className="settings">
        <div className="settings__input">
          <input
            className="settings__input__field"
            ref={autoCompleteList}
            onFocus={() => setAutocompleteVisible(true)}
            value={currentVal}
            onChange={(e) =>
              setCurrentVal(e.currentTarget.value.replace("  ", " "))
            }
            placeholder="Enter movie name"
            autoComplete="off"
          />
          {currentVal.length > 0 && (
            <div
              className="settings__input__clear"
              onClick={() => setCurrentVal("")}
            >
              x
            </div>
          )}
          {isAutocompleteVisible && (
            <div className="form">
              <AutocompleteForm
                pickMovie={pickMovie}
                searchValue={currentVal}
                currentRating={currentRating}
                currentGenre={currentGenre}
              />
            </div>
          )}
        </div>
        <div className="settings__filter" ref={ratingFilter}>
          <button
            className="settings__filter__button"
            onClick={() => handleOpen(true)}
          >
            <span> Rating </span>
            {isRatingFilterVisible ? "˄" : "v"}
          </button>
          {isRatingFilterVisible && (
            <div className="filter_body">
              <Filter
                setCurrent={setCurrentRating}
                current={currentRating}
                type="rating"
              />
            </div>
          )}
        </div>
        <div className="settings__filter" ref={genreFilter}>
          <button
            className="settings__filter__button"
            onClick={() => handleOpen(false)}
          >
            <span> Genre </span> {isGenreFilterVisible ? "˄" : "v"}
          </button>
          {isGenreFilterVisible && (
            <div className="filter_body">
              <Filter
                setCurrent={setCurrentGenre}
                current={currentGenre}
                type="genre"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
