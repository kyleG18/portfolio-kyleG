import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useActiveSection } from '../../hooks/useActiveSection';
import {
  isSoundEnabled,
  toggleSound,
  playClickSound
} from '../../utils/soundEffects';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id), 240);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    playClickSound();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav className="floating-navbar" aria-label="Main Navigation">
      <div className="floating-navbar__pill">
        <ul className="floating-navbar__list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="floating-navbar__item">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`floating-navbar__link ${
                    isActive ? 'floating-navbar__link--active' : ''
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="floating-nav-pill"
                      className="floating-navbar__active-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="floating-navbar__text">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Audio Toggle Button with Sound Effects */}
        <button
          type="button"
          className="floating-navbar__audio-btn"
          onClick={handleToggleSound}
          title={soundOn ? 'Sound is ON (Click to mute)' : 'Sound is OFF (Click to enable sound effects)'}
          aria-label={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
        >
          {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </div>
    </nav>
  );
}
