import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="logo">
        <a href="#hero" className="logo-link" onClick={closeMenu}>
          <img src="/favicon.png" alt="AM Logo" className="nav-logo-img" />
          <div className="logo-text-wrapper">
            <span className="main-logo">Abhishek</span>
            <span className="sub-logo">
              M.Sc. CS & IT | Cloud Data Management
            </span>
          </div>
        </a>
      </div>

      <div
        className={`hamburger ${menuOpen ? "toggle" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <ul className={`nav-links ${menuOpen ? "nav-active" : ""}`}>
        <li><a href="#hero" onClick={closeMenu}>Home</a></li>
        <li><a href="#education" onClick={closeMenu}>Education</a></li>
        <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;