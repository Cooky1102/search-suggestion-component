import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { getMovie } from "../api/movie";
import { debounce, formatData, formatTitle } from "../lib/util";
import { movieType } from "../constants/movie";

export function SearchInput() {
  const [value, setValue] = useState("");
  const [movie, setMovie] = useState([]);
  const [series, setSeries] = useState([]);

  const loadData = useCallback(
    debounce(async (query) => {
      const data = await getMovie({ query });
      setMovie(formatData(data, movieType.movie));
      setSeries(formatData(data, movieType.series));
    }),
    []
  );

  useEffect(() => {
    loadData(value);
  }, [value, loadData]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function renderTitle(Title) {
    return (
      <span dangerouslySetInnerHTML={{ __html: formatTitle(Title, value) }} />
    );
  }

  const suggestionsClass = classNames(
    "px-2 py-2 border-t text-sm text-gray-800",
    {
      hidden: !movie.length && !series.length,
    }
  );
  const movieListClass = classNames("mb-3", {
    hidden: !movie.length,
  });
  const seriesListClass = classNames({
    hidden: !series.length,
  });

  return (
    <div className="shadow-lg rounded-lg overflow-hidden bg-white">
      <input
        id="searchbox"
        className="text-xl block w-full appearance-none bg-white placeholder-gray-400 px-4 py-3 rounded-lg outline-none"
        placeholder="Search for movie"
        value={value}
        onChange={handleChange}
      />

      <div id="suggestions" className={suggestionsClass}>
        <div className={movieListClass}>
          <h3 className="text-xs text-gray-600 pl-2 py-1">Movies</h3>
          <ul>
            {movie.map(({ Title, imdbID }) => {
              return (
                <li key={imdbID}>
                  <a
                    href="#"
                    className="block hover:bg-gray-200 rounded px-2 py-1"
                  >
                    {renderTitle(Title)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={seriesListClass}>
          <h3 className="text-xs text-gray-600 pl-2 py-1">TV Shows</h3>
          <ul>
            {series.map(({ Title, imdbID }) => (
              <li key={imdbID}>
                <a
                  href="#"
                  className="block hover:bg-gray-200 rounded px-2 py-1"
                >
                  {renderTitle(Title)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
