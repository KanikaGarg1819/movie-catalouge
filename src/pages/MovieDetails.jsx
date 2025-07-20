// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MovieDetails.css";
import { useWatchlist } from "../context/WatchlistContext";

const MovieDetails = () => {
  const { id } = useParams(); // imdbID from URL
  const [movie, setMovie] = useState(null);
  const { addToWatchlist } = useWatchlist(); // ✅ Called INSIDE the component
  const apiKey = "eb4afa3d";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="details">
        <h2>{movie.Title}</h2>
        <p><strong>Released:</strong> {movie.Released}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
        <button onClick={() => addToWatchlist(movie)} className="watchlist-btn">
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};
export default MovieDetails;
