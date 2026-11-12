import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  Compass,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { skillCategories } from '../../data/skills';
import './Skills.css';

const CATEGORY_ICONS = {
  Layout,
  Server,
  Database,
  Wrench,
  Compass
};

export default function Skills() {
  const [filter, setFilter] = useState('all');

  const filteredCategories = skillCategories.filter((cat) => {
    if (filter === 'all') return true;
    return cat.statusType === filter;
  });

  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <div className="container">
        <div className="skills-header-row">
          <div className="section-header skills-section-header">
            <span className="section-eyebrow">
              <Code2 size={14} aria-hidden="true" />
              <span>Technical Stack</span>
            </span>
            <h2 id="skills-heading" className="section-title">
              Technologies &amp; Areas of Exploration
            </h2>
            <p className="section-subtitle">
              Clearly organized into technologies I actively build with in academic and personal projects versus fields I am currently exploring.
            </p>
          </div>

          {/* Filter Toggle Buttons */}
          <div className="skills-filter" role="group" aria-label="Filter skills by usage status">
            <button
              type="button"
              className={`skills-filter-btn ${filter === 'all' ? 'skills-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Categories
            </button>
            <button
              type="button"
              className={`skills-filter-btn ${filter === 'active' ? 'skills-filter-btn--active' : ''}`}
              onClick={() => setFilter('active')}
            >
              <CheckCircle size={14} aria-hidden="true" />
              <span>Actively Used</span>
            </button>
            <button
              type="button"
              className={`skills-filter-btn ${filter === 'exploring' ? 'skills-filter-btn--active' : ''}`}
              onClick={() => setFilter('exploring')}
            >
              <Sparkles size={14} aria-hidden="true" />
              <span>Actively Exploring</span>
            </button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="skills-grid">
          {filteredCategories.map((category, idx) => {
            const IconComponent = CATEGORY_ICONS[category.iconName] || Code2;
            const isExploring = category.statusType === 'exploring';

            return (
              <motion.article
                key={category.id}
                className={`skill-category-card ${
                  isExploring ? 'skill-category-card--exploring' : ''
                }`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div className="skill-category-card__top">
                  <div className="skill-category-card__title-group">
                    <span className="skill-category-card__icon" aria-hidden="true">
                      <IconComponent size={20} />
                    </span>
                    <div>
                      <h3 className="skill-category-card__title">{category.title}</h3>
                      <p className="skill-category-card__desc">{category.description}</p>
                    </div>
                  </div>

                  <span
                    className={`skill-status-badge ${
                      isExploring
                        ? 'skill-status-badge--exploring'
                        : 'skill-status-badge--active'
                    }`}
                  >
                    {isExploring ? (
                      <>
                        <Sparkles size={12} aria-hidden="true" />
                        <span>Exploring</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={12} aria-hidden="true" />
                        <span>Actively Used</span>
                      </>
                    )}
                  </span>
                </div>

                <ul className="skill-items-list">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="skill-item">
                      <div className="skill-item__header">
                        <span className="skill-item__dot" aria-hidden="true" />
                        <span className="skill-item__name">{skill.name}</span>
                      </div>
                      <p className="skill-item__context">{skill.context}</p>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
