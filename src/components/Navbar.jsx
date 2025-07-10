import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/mint', label: 'Minting' },
  { to: '/work', label: 'Work Experience' },
  { to: '/portfolio', label: 'Portfolio' },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="navbar-logo">SkillPass</span>
        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={
                  'navbar-link' + (location.pathname === link.to ? ' active' : '')
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 