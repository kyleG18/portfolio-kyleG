import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { playClickSound } from '../../utils/soundEffects';
import './Hero.css';

const InteractiveLanyard = lazy(() =>
  import('../InteractiveLanyard/InteractiveLanyard')
);

const TICKER_ROLES = [
  '3D Creative Developer',
  'React & Three.js Enthusiast',
  '4th-Year BSIT Student',
  'Aspiring IT Professional'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = TICKER_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 45 : 95;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TICKER_ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollTo = (id) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <section id="home" className="reference-hero" aria-label="Hero Section">
      {/* Deep Space Ambient Glow Gradients */}
      <div className="hero-glow hero-glow--left" aria-hidden="true" />
      <div className="hero-glow hero-glow--right" aria-hidden="true" />

      <div className="container hero-container">
        {/* Left Side: Typography, Dynamic Ticker & CTAs */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-heading-group">
            <span className="hero-welcome">Welcome to</span>
            <h1 className="hero-display-title">My Portfolio</h1>
          </div>

          {/* Dynamic Role Ticker with Glow */}
          <div className="hero-ticker-wrap">
            <span className="hero-ticker-text">{displayText}</span>
            <span className="hero-ticker-cursor" aria-hidden="true">
              |
            </span>
          </div>

          <p className="hero-description">
            Building practical digital solutions through web development, technology, and continuous learning. Passionate about crafting intuitive full-stack web applications and interactive 3D experiences.
          </p>

          {/* Action Buttons Matching Reference */}
          <div className="hero-cta-cluster">
            <button
              type="button"
              onClick={() => scrollTo('portfolio')}
              className="btn-hero btn-hero--primary"
            >
              <span>Explore Projects</span>
              <ArrowRight size={17} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="btn-hero btn-hero--secondary"
            >
              <span>Contact Me</span>
            </button>
          </div>

          {/* FIND ME Social Channels Matching Reference */}
          <div className="hero-socials">
            <span className="hero-socials-label">FIND ME</span>
            <div className="hero-socials-list">
              <a
                href={personalInfo.contact.github.url}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className="hero-social-btn"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <Github size={18} />
              </a>

              <a
                href={personalInfo.contact.linkedin.url}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className="hero-social-btn"
                aria-label="LinkedIn profile"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                className="hero-social-btn"
                aria-label="Email Kyle"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive 3D Lanyard Showcase */}
        <div className="hero-right">
          <div className="hero-3d-wrapper">
            <div className="hero-3d-mobile-badge" aria-hidden="true">
              <span className="hero-3d-badge-pulse" />
              <span>Interactive 3D Badge • Drag to swing</span>
            </div>
            <Suspense fallback={null}>
              <InteractiveLanyard />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
