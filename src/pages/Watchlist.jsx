import React from "react";
import { useWatchlist } from "../context/WatchlistContext";
import { Link } from "react-router-dom";
import "../styles/Watchlist.css";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="watchlist-page">
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div key={movie.imdbID} className="watchlist-card">
            <img
  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
  alt={movie.Title}
/>
              <h3>{movie.Title}</h3>
              <Link to={`/movie/${movie.imdbID}`} className="details-link">
                View Details
              </Link>
              <button
                className="remove-btn"
                onClick={() => removeFromWatchlist(movie.imdbID)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Watchlist;
