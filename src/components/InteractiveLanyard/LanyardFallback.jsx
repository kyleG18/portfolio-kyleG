import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';

export default function LanyardFallback() {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -ny * 16, y: nx * 18 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="lanyard-fallback"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Simulated JPC Lanyard Strap & Buckle */}
      <div className="lanyard-fallback__strap" aria-hidden="true">
        <span className="lanyard-fallback__strap-text">JOHN PAUL COLLEGE</span>
      </div>
      <div className="lanyard-fallback__buckle" aria-hidden="true" />
      <div className="lanyard-fallback__clasp" aria-hidden="true" />

      {/* Interactive CSS 3D Student ID Card */}
      <div
        className={`lanyard-fallback__card ${flipped ? 'lanyard-fallback__card--flipped' : ''}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? 180 + tilt.y : tilt.y}deg)`
        }}
        onClick={() => setFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((prev) => !prev);
          }
        }}
        aria-label="Interactive Student ID Card — Click to flip front and back"
      >
        <div className="lanyard-fallback__face lanyard-fallback__face--front">
          <div className="lanyard-fallback__header">
            <span className="lanyard-fallback__school">JOHN PAUL COLLEGE</span>
            <span className="lanyard-fallback__campus">Roxas, Oriental Mindoro</span>
          </div>
          <div className="lanyard-fallback__photo-wrap">
            <img
              src={personalInfo.assets.profilePhoto}
              alt={personalInfo.name}
              className="lanyard-fallback__photo"
            />
          </div>
          <h3 className="lanyard-fallback__name">{personalInfo.uppercaseName}</h3>
          <p className="lanyard-fallback__degree">BS in Information Technology</p>
          <span className="lanyard-fallback__badge">4th-Year Student</span>
        </div>

        <div className="lanyard-fallback__face lanyard-fallback__face--back">
          <span className="lanyard-fallback__school">JOHN PAUL COLLEGE</span>
          <p className="lanyard-fallback__back-note">
            Department of Information Technology — Student Developer Identification
          </p>
          <div className="lanyard-fallback__back-tags">
            <span>React</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MySQL</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="lanyard-control-btn"
        onClick={() => setFlipped((prev) => !prev)}
      >
        <RotateCw size={14} />
        <span>Flip ID Card</span>
      </button>
    </div>
  );
}
