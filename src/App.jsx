// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import MovieDetails from "./pages/MovieDetails"; 
import { WatchlistProvider } from "./context/WatchlistContext"; 
import Watchlist from "./pages/Watchlist";

function App() {
  return (
     <BrowserRouter>
        <WatchlistProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/welcome" element={<Welcome />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
    <footer style={{
  background: '#0d0d0d',  // dark background
  color: '#f2f2f2',        // soft white text
  textAlign: 'center',
  padding: '1.5rem 1rem',
  borderTop: '1px solid #222',
  fontSize: '0.9rem'
}}>
  <p style={{ margin: 0 }}>
    © {new Date().getFullYear()} <span style={{ color: '#e50914', fontWeight: 'bold' }}>Movie Explorer</span>. All rights reserved.
  </p>
  <p style={{ margin: 0, marginTop: '0.3rem', color: '#aaa' }}>
    Made with <span style={{ color: '#e50914' }}>❤️</span> by Kanika Garg
  </p>
</footer>

       </WatchlistProvider>
       </BrowserRouter>
  );
}
export default App;
