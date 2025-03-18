import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, User, LogOut, Sun, Moon } from "lucide-react";
import "./Navbar.css"; // Nhập CSS

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className={`navbar ${darkMode ? "dark-mode" : ""} navbar-link`}>
      <Link to="/" className="navbar-link">
        <Home size={24} />
        <span>Home</span>
      </Link>
      <Link to="/profile" className="navbar-link">
        <User size={24} />
        <span>Profile</span>
      </Link>
      <button onClick={() => setDarkMode(!darkMode)} className="navbar-link">
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        <span>{darkMode ? "Light" : "Dark"}</span>
      </button>
      <Link to="/logout" className="navbar-link">
        <LogOut size={24} />
        <span>Logout</span>
      </Link>
    </nav>
  );
}; 
