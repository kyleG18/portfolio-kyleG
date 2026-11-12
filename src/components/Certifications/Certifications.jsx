import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpenCheck,
  Trophy,
  Wrench,
  Clock
} from 'lucide-react';
import {
  certificationCategories,
  certificationsData
} from '../../data/certifications';
import './Certifications.css';

const CATEGORY_ICON_MAP = {
  certification: Award,
  course: BookOpenCheck,
  achievement: Trophy,
  training: Wrench
};

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('all');

  const visibleItems = certificationsData.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section
      id="certifications"
      className="section section--alt"
      aria-labelledby="certifications-heading"
    >
      <div className="container">
        <div className="certifications-top-row">
          <div className="section-header certifications-header">
            <span className="section-eyebrow">
              <Award size={14} aria-hidden="true" />
              <span>Credentials &amp; Training</span>
            </span>
            <h2 id="certifications-heading" className="section-title">
              Certifications &amp; Achievements
            </h2>
            <p className="section-subtitle">
              Structured repository for technical certifications, online courses, academic achievements, and relevant training. Initialized with transparent placeholders until verified credentials are uploaded.
            </p>
          </div>

          <div
            className="certifications-tabs"
            role="group"
            aria-label="Filter credentials by category"
          >
            {certificationCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`certifications-tab ${
                  activeCategory === cat.id ? 'certifications-tab--active' : ''
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="certifications-grid">
          {visibleItems.map((item, idx) => {
            const IconComponent = CATEGORY_ICON_MAP[item.category] || Award;

            return (
              <motion.article
                key={item.id}
                className="cert-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div className="cert-card__top">
                  <span className="cert-card__icon" aria-hidden="true">
                    <IconComponent size={20} />
                  </span>
                  <span className="cert-card__status">
                    <Clock size={12} aria-hidden="true" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <span className="cert-card__category">{item.categoryLabel}</span>
                <h3 className="cert-card__title">{item.title}</h3>
                <p className="cert-card__issuer">{item.issuer}</p>
                <p className="cert-card__desc">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
