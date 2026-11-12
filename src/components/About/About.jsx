import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Award,
  Trophy,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Mail
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './About.css';

export default function About() {
  const [isSpiderHovered, setIsSpiderHovered] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <section id="about" className="ref-about-section" aria-labelledby="about-title">
      <div className="container">
        {/* Section Heading with Glowing Typography */}
        <div className="ref-section-title-wrap">
          <h2 id="about-title" className="ref-section-title">
            About Me
          </h2>
        </div>

        {/* 3-Column Hero Bio Row Matching Reference */}
        <div className="ref-about-hero-grid">
          {/* Left Column: Greeting & CTA */}
          <motion.div
            className="ref-about-col ref-about-col--left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="ref-about-greeting">Hi, I&apos;m</span>
            <h3 className="ref-about-name">{personalInfo.name}</h3>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="btn-hero btn-hero--primary ref-about-cta"
            >
              <Mail size={16} aria-hidden="true" />
              <span>Get In Touch</span>
            </button>
          </motion.div>

          {/* Center Column: Portrait with Easter Egg Hover Morph */}
          <motion.div
            className="ref-about-col ref-about-col--center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div
              className="ref-portrait-container"
              onMouseEnter={() => setIsSpiderHovered(true)}
              onMouseLeave={() => setIsSpiderHovered(false)}
            >
              <div className="ref-portrait-aura" aria-hidden="true" />
              <div className="ref-portrait-frame">
                <img
                  src={personalInfo.assets.profilePhoto}
                  alt={personalInfo.name}
                  className={`ref-portrait-img ${
                    isSpiderHovered ? 'ref-portrait-img--easter' : ''
                  }`}
                />
                {/* Spider-Man Suit Easter Egg Overlay */}
                <div
                  className={`ref-portrait-easter-overlay ${
                    isSpiderHovered ? 'ref-portrait-easter-overlay--active' : ''
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ref-spider-mask-svg"
                  >
                    <path
                      d="M20 38C20 22 34 10 50 10C66 10 80 22 80 38C80 58 64 78 50 90C36 78 20 58 20 38Z"
                      fill="#DC2626"
                      stroke="#18181B"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M26 36C34 36 44 45 44 48C44 50 36 54 28 48C24 45 23 39 26 36Z"
                      fill="#FFFFFF"
                      stroke="#0F172A"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M74 36C66 36 56 45 56 48C56 50 64 54 72 48C76 45 77 39 74 36Z"
                      fill="#FFFFFF"
                      stroke="#0F172A"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M50 10V90M20 38Q50 48 80 38M25 58Q50 68 75 58"
                      stroke="#0F172A"
                      strokeWidth="1.2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Narrative Bio */}
          <motion.div
            className="ref-about-col ref-about-col--right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="ref-about-narrative">
              I am a fourth-year Bachelor of Science in Information Technology student at <strong>John Paul College</strong> with an active focus on web development, relational database systems, API engineering, and AI automation workflows.
            </p>
            <p className="ref-about-narrative">
              With React, Three.js, Node.js, and modern web tools, I transform complex ideas into reliable, interactive digital solutions that are functional, accessible, and enjoyable to use.
            </p>
            <button
              type="button"
              onClick={() => scrollTo('portfolio')}
              className="ref-about-link-btn"
            >
              <span>Explore Projects</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Education & Experience 2-Card Row */}
        <div className="ref-edu-exp-grid">
          <motion.div
            className="ref-glass-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="ref-glass-card__header">
              <GraduationCap size={20} className="ref-card-icon" />
              <h4 className="ref-glass-card__title">Education</h4>
            </div>
            <div className="ref-timeline-item">
              <div className="ref-timeline-crest">JPC</div>
              <div className="ref-timeline-info">
                <strong>John Paul College</strong>
                <span>Bachelor of Science in Information Technology</span>
                <span className="ref-timeline-badge">4th-Year Student • Philippines</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ref-glass-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <div className="ref-glass-card__header">
              <Briefcase size={20} className="ref-card-icon" />
              <h4 className="ref-glass-card__title">Academic Journey</h4>
            </div>
            <div className="ref-timeline-item">
              <div className="ref-timeline-crest">DEV</div>
              <div className="ref-timeline-info">
                <strong>Full-Stack &amp; API Development</strong>
                <span>PermitEase Capstone Lead &amp; Laboratory Researcher</span>
                <span className="ref-timeline-badge">Web • Database • AI Automation</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Metric Counter Cards Matching Reference */}
        <div className="ref-stats-grid">
          <motion.div
            className="ref-stat-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <div className="ref-stat-card__left">
              <Code2 size={24} className="ref-stat-icon" />
              <div>
                <span className="ref-stat-label">PROJECTS</span>
                <p className="ref-stat-sub">Live Systems Built</p>
              </div>
            </div>
            <span className="ref-stat-number">3</span>
          </motion.div>

          <motion.div
            className="ref-stat-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 }}
          >
            <div className="ref-stat-card__left">
              <Award size={24} className="ref-stat-icon" />
              <div>
                <span className="ref-stat-label">CERTIFICATES</span>
                <p className="ref-stat-sub">Skills Validated</p>
              </div>
            </div>
            <span className="ref-stat-number">4</span>
          </motion.div>

          <motion.div
            className="ref-stat-card"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <div className="ref-stat-card__left">
              <Trophy size={24} className="ref-stat-icon" />
              <div>
                <span className="ref-stat-label">AWARDS</span>
                <p className="ref-stat-sub">Academic Standing</p>
              </div>
            </div>
            <span className="ref-stat-number">4th</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
