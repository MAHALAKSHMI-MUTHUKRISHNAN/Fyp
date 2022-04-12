import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function NavBarRetail() {
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
          Fix Mate
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/retail/home"
                activeClassName="active"
                id="retailhomelink"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact
                to="/admin/AddServiceCenter"
                activeClassName="active"
                id="addserviceCenterlink"
                className="nav-links"
                onClick={handleClick}
              >
                Add center
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                exact
                to="/admin/allbooking"
                activeClassName="active"
                id="viewAllBookingLink"
                className="nav-links"
                onClick={handleClick}
              >
                All Booking
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                exact
                to="/admin/usermanagement"
                activeClassName="active"
                id="userManagementLink"
                className="nav-links"
                onClick={handleClick}
              >
                Users
              </NavLink>
            </li> */}
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

export default NavBarRetail;
