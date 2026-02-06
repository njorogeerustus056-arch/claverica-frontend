import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./public-navbar-styles.css";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fintech-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* ClaveRica Brand */}
        <Link to="/" className="brand-wrapper">
          <span className="brand-name">ClaveRica</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <div className="nav-links">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="auth-section">
            <Link to="/signin" className="auth-btn signin">
              Sign In
            </Link>
            <Link to="/signup" className="auth-btn primary">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={`bar bar-1 ${isOpen ? "open" : ""}`}></span>
          <span className={`bar bar-2 ${isOpen ? "open" : ""}`}></span>
          <span className={`bar bar-3 ${isOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          <div 
            className="mobile-backdrop" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          <div className="mobile-menu">
            <div className="mobile-content">
              {/* Mobile Navigation Links */}
              <div className="mobile-nav-links">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "mobile-nav-link active" : "mobile-nav-link"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mobile-auth">
                <Link
                  to="/signin"
                  className="mobile-auth-btn signin"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="mobile-auth-btn primary"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}