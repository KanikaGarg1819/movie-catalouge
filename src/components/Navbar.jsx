// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/watchlist" className="nav-link" style={styles.link}>
  Watchlist
</Link>

      <Link to="/signup" style={styles.link}>Sign Up</Link>
    </nav>
  );
};

const styles = {
  nav: {
    padding: "1rem",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    margin: "0 1rem",
    fontSize: "1.1rem",
  }
};
export default Navbar;
