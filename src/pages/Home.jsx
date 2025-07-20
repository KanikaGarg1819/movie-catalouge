import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";



function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const genres = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Romance"];
  const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019"];

  const navigate = useNavigate();

 useEffect(() => {
  const auth = localStorage.getItem("isAuthenticated");
  if (auth === "true") {
    setIsAuthenticated(true);
    setLoading(false);
  } else {
    setIsAuthenticated(false);
    setLoading(false);
  }
}, [navigate]);


  // Fetch movies initially
  useEffect(() => {
    fetchMovies("super");
  }, []);

  // If searchTerm is cleared, reset movies
  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchMovies("super");
    }
  }, [searchTerm]);

  // Filtering
  useEffect(() => {
    let filtered = movies;

    if (genreFilter !== "All") {
      filtered = filtered.filter((movie) => movie.Genre?.includes(genreFilter));
    }

    if (yearFilter !== "All") {
      filtered = filtered.filter((movie) => movie.Year === yearFilter);
    }

    setFilteredMovies(filtered);
  }, [genreFilter, yearFilter, movies]);

  const fetchMovies = async (query) => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=eb4afa3d&s=${query}&type=movie`);
      const data = await res.json();

      if (data.Search) {
        const detailedResults = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?apikey=eb4afa3d&i=${movie.imdbID}`);
            return await res.json();
          })
        );
        setMovies(detailedResults);
        setFilteredMovies(detailedResults);
      } else {
        setMovies([]);
        setFilteredMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchMovies(searchTerm);
    }
  };

  const handleHomeReset = () => {
    setSearchTerm("");
    setGenreFilter("All");
    setYearFilter("All");
  };

  // 🔒 Show lock screen if not authenticated (before redirect)
  if (!isAuthenticated) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          backdropFilter: "blur(5px)",
        }}
      >
        <FaLock size={60} />
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          Please Sign In to Access Home Page
        </p>
        <button
          onClick={() => navigate("/SignUp")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          SignIn
        </button>
      </div>
    );
  }
 if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h1 style={{ cursor: "pointer" }} onClick={handleHomeReset}>
        🎬 Movie Explorer
      </h1>

      {/* Search Bar & Filters */}
      <div className="navbar-controls">
        <div className="search-and-filter" style={{ textAlign: "center", marginTop: "1rem" }}>
          <div style={{ display: "inline-block", marginBottom: "0.5rem" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies..."
              className="search-input"
              style={{
                padding: "0.5rem 1rem",
                width: "250px",
                marginRight: "0.5rem",
                borderRadius: "5px",
                border: "none",
              }}
            />
            <button
              onClick={handleSearch}
              className="search-button"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Search
            </button>
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "0.5rem",
            }}
          >
            <div>
              <label style={{ color: "white", marginRight: "0.3rem" }}>Genre:</label>
              <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
                {genres.map((genre) => (
                  <option key={genre}>{genre}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ color: "white", marginRight: "0.3rem" }}>Year:</label>
              <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <h2 style={{ cursor: "pointer" }} onClick={handleHomeReset}>
          Top Trending
        </h2>
      </div>

      {/* Movie Cards */}
      {filteredMovies.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.slice(0, 15).map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
