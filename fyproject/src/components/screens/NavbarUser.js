import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function NavbarUser() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const handleLogout = () => {
    localStorage.clear();
  }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" id="landinglink" className="nav-logo">
            Wrist Wear
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/user/home"
                activeClassName="active"
                id="userhomelink"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/user/mybooking"
                activeClassName="active"
                id="mybookinglink"
                className="nav-links"
                onClick={handleClick}
              >
                My booking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                id="logoutlink"
                className="nav-links"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarUser;
