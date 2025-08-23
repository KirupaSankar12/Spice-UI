import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiEdit, FiGrid } from "react-icons/fi";
import "./css/NavBar.css";

function NavBar({ onLogout }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutConfirm = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <nav className="navbar-container">
      {/* Brand */}
      <div className="navbar-brand">
        <Link to={token ? "/home" : "/"}>SPICE MERCHANTS</Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        {role === "ROLE_USER" && (
          <>
            <NavLink to="/home" className="nav-link">Dashboard</NavLink>
            <NavLink to="/apply" className="nav-link">Apply for Franchise</NavLink>
          </>
        )}

        {role === "ROLE_ADMIN" && (
          <>
            <NavLink to="/admin/dashboard" className="nav-link">Admin Dashboard</NavLink>
            <NavLink to="/admin/merchants" className="nav-link">Manage Merchants</NavLink>
            <NavLink to="/admin/reports" className="nav-link">Reports</NavLink>
          </>
        )}

        {token && (
          <>
            <NavLink to="/about-us" className="nav-link">About Us</NavLink>
            <NavLink to="/faq" className="nav-link">FAQ</NavLink>
          </>
        )}
      </div>

      {/* Authentication Buttons */}
      <div className="navbar-auth">
        {token ? (
          <button onClick={() => setShowLogoutConfirm(true)} className="btn-logout">
            Logout
          </button>
        ) : (
          <>
            <div className="login-menu-container" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="btn-login"
              >
                Login
              </button>

              {isDropdownOpen && (
                <div className="login-dropdown">
                  <Link
                    to="/signup"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiEdit className="dropdown-item-icon" />
                    <div>
                      <strong>Application Portal</strong>
                      <span>Fill out our Application</span>
                    </div>
                  </Link>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiGrid className="dropdown-item-icon" />
                    <div>
                      <strong>Merchant Portal</strong>
                      <span>Access your account</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button onClick={() => navigate("/signup")} className="btn-signup">
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="logout-popup">
          <div className="popup-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="popup-actions">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="btn-no"
              >
                No, Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="btn-yes"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
