import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  CheckCircle2,
  Eye,
  GitBranch,
  ExternalLink,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { featuredProjects } from '../../data/projects';
import ProjectModal from './ProjectModal';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="section section--alt"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <FolderGit2 size={14} aria-hidden="true" />
            <span>Featured Projects</span>
          </span>
          <h2 id="projects-heading" className="section-title">
            Practical Systems &amp; Technical Laboratories
          </h2>
          <p className="section-subtitle">
            Academic and system development projects demonstrating full-stack web architecture, AI API integration, relational database design, and API performance benchmarking.
          </p>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project, index) => {
            const isPermitEase = project.id === 'permitease';

            return (
              <motion.article
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                {/* Visual Preview / Screenshot Placeholder Header */}
                <div
                  className={`project-card__visual ${
                    isPermitEase
                      ? 'project-card__visual--permitease'
                      : 'project-card__visual--bobacraft'
                  }`}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Inspect details for ${project.shortTitle}`}
                >
                  <div className="project-card__visual-top">
                    <span className="project-card__code">{project.code}</span>
                    <span className="project-card__placeholder-pill">
                      Screenshot Placeholder
                    </span>
                  </div>

                  {/* Architectural Schematic Preview */}
                  <div className="project-card__schematic">
                    <div className="project-card__schematic-icon">
                      {isPermitEase ? (
                        <ShieldCheck size={28} />
                      ) : (
                        <Activity size={28} />
                      )}
                    </div>
                    <div className="project-card__schematic-text">
                      <strong>{project.shortTitle}</strong>
                      <span>{project.screenshotPlaceholder.subtitle}</span>
                    </div>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="project-card__body">
                  <div className="project-card__meta">
                    <span className="project-card__status">{project.status}</span>
                  </div>

                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__summary">{project.summary}</p>

                  {/* Technology Tags */}
                  <div className="project-card__tech-list" aria-label="Technologies used">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Highlighted Features Checklist */}
                  <div className="project-card__features-box">
                    <span className="project-card__features-label">
                      Key Highlights:
                    </span>
                    <ul className="project-card__features-list">
                      {project.features.map((feature) => (
                        <li key={feature} className="project-card__feature">
                          <CheckCircle2 size={15} aria-hidden="true" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons & Repository Placeholders */}
                  <div className="project-card__footer">
                    <button
                      type="button"
                      className="btn btn--primary project-card__details-btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Eye size={16} aria-hidden="true" />
                      <span>View Details</span>
                    </button>

                    <div className="project-card__ext-links">
                      {project.links.github ? (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--ghost"
                        >
                          <GitBranch size={15} />
                          <span>GitHub</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--ghost project-card__pending-btn"
                          onClick={() => setSelectedProject(project)}
                          title="Repository URL placeholder — click for project details"
                        >
                          <GitBranch size={15} aria-hidden="true" />
                          <span>Repo (Placeholder)</span>
                        </button>
                      )}

                      {project.links.liveDemo ? (
                        <a
                          href={project.links.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--ghost"
                        >
                          <ExternalLink size={15} />
                          <span>Live Demo</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--ghost project-card__pending-btn"
                          onClick={() => setSelectedProject(project)}
                          title="Live Demo URL placeholder — click for project details"
                        >
                          <ExternalLink size={15} aria-hidden="true" />
                          <span>Demo (Placeholder)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
