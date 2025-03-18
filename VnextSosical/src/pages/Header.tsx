// Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header-container">
      <div className="hearder1container">
          <img srcSet="/public/logo.png" alt="VNext Sosical" className="logo" />
          <Link to="/" className="navbar-link">
                  <span>Home</span>
          </Link>
          <Link to="/profile" className="navbar-link">
                  <span>Profile</span>
          </Link>
          <Link to="/profile" className="navbar-link">
                  <span>Find Friend</span>
          </Link>
      </div>
      <div className="search-container">
        <img srcSet="/public/anhhoa.png" alt="User Avatar" className="user-avatar" />
        <div className="search-bar-container">
          <input type="text" placeholder="" className="search-input" />
        </div>
      </div>
    </header>
  );
}
