import React from 'react';
import { Terminal, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Footer.css';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', '#home');
  };

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <footer className="ref-footer" role="contentinfo">
      <div className="container ref-footer-container">
        <div className="ref-footer-main">
          {/* Brand Col */}
          <div className="ref-footer-brand-col">
            <a href="#home" onClick={scrollToTop} className="ref-footer-logo">
              <span className="ref-footer-logo-prompt">&gt;_</span>
              <span className="ref-footer-logo-text">Kyle.dev</span>
            </a>
            <p className="ref-footer-tagline">
              Building modern web applications with clean code, sharp typography, and interactive 3D dimensions. 4th-Year BSIT Student at John Paul College.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="ref-footer-nav-col">
            <span className="ref-footer-col-title">NAVIGATION</span>
            <ul className="ref-footer-links">
              <li>
                <a href="#home" onClick={(e) => scrollTo(e, 'home')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollTo(e, 'about')}>
                  About
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={(e) => scrollTo(e, 'portfolio')}>
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollTo(e, 'contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Socials Col */}
          <div className="ref-footer-social-col">
            <span className="ref-footer-col-title">CONNECTED</span>
            <div className="ref-footer-social-icons">
              <a
                href="#contact"
                className="ref-footer-social-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="#contact"
                className="ref-footer-social-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#contact"
                className="ref-footer-social-btn"
                aria-label="Email"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Row with Back to Top */}
        <div className="ref-footer-bottom">
          <p className="ref-footer-copy">
            &copy; {new Date().getFullYear()} Kyle Andre Gacula. All rights reserved.
          </p>

          <button
            type="button"
            className="ref-back-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
