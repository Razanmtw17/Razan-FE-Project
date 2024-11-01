import React, { useState } from 'react';
import './NavBar.css';
import logo from '../../images/full stack logo.png';
import toggle from '../../images/toggle.png';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Badge from '@mui/material/Badge';
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // State for toggling navigation

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <marquee className="head">20% off for your first purchase</marquee>
      <nav className="navbar">
        <div className="logo-toggle"> {/* Combined logo and toggle container */}
          <div className="logo">
            <img src={logo} alt="Modern furniture store logo" />
          </div>

          <div>
          <img className = "toogle"src={toggle} onClick={handleToggleClick} width='20px' alt="Menu toggle" />
          </div>    
        </div>
        <div className={`nav-links ${isOpen ? 'show' : ''}`}> {/* Conditional rendering */}
          <ul>
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/blog" color='balck'>Blog</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>
        <div className={`actions nav-links${isOpen ? 'show' : ''}`}>
          <ul>
            <li>
              <a href="/favorites">
                <Badge badgeContent={6} color="primary">
                  <FavoriteBorderOutlinedIcon sx={{color: 'black'}}/>
                </Badge>
              </a>
            </li>
            <li>
              <a href="/cart"> 
                <Badge badgeContent={2} color="primary">
                  <LocalMallOutlinedIcon sx={{color: 'black'}}/>
                </Badge>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}