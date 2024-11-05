import React, { useState } from 'react';
import './NavBar.css';
import logo from '../../images/full stack logo.png';
import toggle from '../../images/toggle.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from '@mui/material/Badge';
import { Link } from "react-router-dom";


export default function NavBar({ cartItemsCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home"); // Set initial active link
 

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (linkId) => {
    setActiveLink(linkId);
  };

  return (
    <div>
      <marquee className="head">20% off for your first purchase</marquee>
      <nav className="navbar">
        <div className="logo-toggle">
          <div className="logo">
            <img src={logo} alt="Modern furniture store logo" />
          </div>
          <div>
            <img
              className="toggle"
              src={toggle}
              onClick={handleToggleClick}
              width="20px"
              alt="Menu toggle"
            />
          </div>
        </div>
        <div className={`nav-links ${isOpen ? "show" : ""}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={`nav-link ${activeLink === "home" ? "active" : ""}`}
                onClick={() => handleLinkClick("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`nav-link ${
                  activeLink === "products" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("products")}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`nav-link ${activeLink === "about" ? "active" : ""}`}
                onClick={() => handleLinkClick("about")}
              >
                About us
              </Link>
            </li>
          </ul>
        </div>
        <div className={`actions nav-links ${isOpen ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/cart">
                <Badge badgeContent={cartItemsCount} color="primary">
                  <LocalMallOutlinedIcon sx={{ color: "black" }} />
                </Badge>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}