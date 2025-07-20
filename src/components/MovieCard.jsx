import React from "react";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const placeholder = "/demo.png"; // from public folder

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : placeholder}
        alt={movie.Title}
        className="movie-poster"
      />
  <div className="movie-card-content">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <Link to={`/movie/${movie.imdbID}`} className="details-link">
          View Details
        </Link>
      </div>
    </div>
  );
};
export default MovieCard;
