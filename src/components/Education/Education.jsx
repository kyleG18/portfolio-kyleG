import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  BookOpen,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { educationData } from '../../data/education';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <GraduationCap size={14} aria-hidden="true" />
            <span>Academic Background</span>
          </span>
          <h2 id="education-heading" className="section-title">
            Education &amp; Undergraduate Studies
          </h2>
          <p className="section-subtitle">
            Formal Information Technology education focused on software development, database systems, and computing infrastructure.
          </p>
        </div>

        <div className="education-timeline">
          {educationData.map((edu) => (
            <motion.article
              key={edu.id}
              className="education-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
            >
              <div className="education-card__marker" aria-hidden="true">
                <GraduationCap size={22} />
              </div>

              <div className="education-card__content">
                <div className="education-card__header">
                  <div>
                    <div className="education-card__institution-row">
                      <Building2 size={16} aria-hidden="true" />
                      <h3 className="education-card__institution">
                        {edu.institution}
                      </h3>
                    </div>
                    <p className="education-card__degree">{edu.degree}</p>
                  </div>

                  <div className="education-card__badges">
                    <span className="education-status-pill">
                      {edu.currentStatus}
                    </span>
                    <span className="education-location-pill">
                      <MapPin size={13} aria-hidden="true" />
                      <span>{edu.location}</span>
                    </span>
                  </div>
                </div>

                <p className="education-card__summary">{edu.summary}</p>

                <div className="education-card__focus">
                  <div className="education-card__focus-title">
                    <BookOpen size={15} aria-hidden="true" />
                    <span>Core Academic &amp; Laboratory Focus Areas</span>
                  </div>
                  <ul className="education-card__focus-list">
                    {edu.focusAreas.map((area) => (
                      <li key={area} className="education-card__focus-item">
                        <CheckCircle2 size={15} aria-hidden="true" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
