import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Layers,
  GitBranch,
  ExternalLink,
  Info,
  Image as ImageIcon
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="project-modal-backdrop"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Modal Top Header */}
            <div className="project-modal__header">
              <div>
                <div className="project-modal__meta">
                  <span className="project-modal__code">{project.code}</span>
                  <span className="project-modal__category">{project.category}</span>
                </div>
                <h3 id="modal-project-title" className="project-modal__title">
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                className="project-modal__close"
                onClick={onClose}
                aria-label="Close project details modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="project-modal__body">
              {/* Screenshot Placeholder Banner */}
              <div className="project-modal__preview">
                <div className="project-modal__preview-badge">
                  <ImageIcon size={15} aria-hidden="true" />
                  <span>Screenshot Placeholder</span>
                </div>
                <h4 className="project-modal__preview-title">
                  {project.screenshotPlaceholder.title}
                </h4>
                <p className="project-modal__preview-sub">
                  {project.screenshotPlaceholder.subtitle}
                </p>
              </div>

              {/* Overview & Problem / Solution */}
              <div className="project-modal__grid">
                <div className="project-modal__box">
                  <h4 className="project-modal__section-title">Problem Context</h4>
                  <p>{project.problemStatement}</p>
                </div>
                <div className="project-modal__box">
                  <h4 className="project-modal__section-title">System Solution</h4>
                  <p>{project.solutionOverview}</p>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="project-modal__section">
                <h4 className="project-modal__section-title">Technologies &amp; Tools</h4>
                <div className="project-modal__tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="project-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="project-modal__section">
                <h4 className="project-modal__section-title">Highlighted Features</h4>
                <ul className="project-modal__features">
                  {project.features.map((feat) => (
                    <li key={feat} className="project-modal__feature-item">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture & Implementation Breakdown */}
              <div className="project-modal__section">
                <h4 className="project-modal__section-title">
                  <Layers size={16} aria-hidden="true" />
                  <span>Implementation &amp; Verification Notes</span>
                </h4>
                <div className="project-modal__arch-list">
                  {project.architectureHighlights.map((item) => (
                    <div key={item.label} className="project-modal__arch-item">
                      <strong>{item.label}</strong>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Repository & Live Demo Placeholder Notice */}
              <div className="project-modal__notice">
                <Info size={17} aria-hidden="true" />
                <span>{project.links.placeholderNote}</span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="project-modal__footer">
              <div className="project-modal__footer-links">
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--secondary"
                  >
                    <GitBranch size={16} />
                    <span>GitHub Repository</span>
                  </a>
                ) : (
                  <span className="project-link-placeholder">
                    <GitBranch size={15} />
                    <span>GitHub Repo (Placeholder)</span>
                  </span>
                )}

                {project.links.liveDemo ? (
                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary"
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <span className="project-link-placeholder">
                    <ExternalLink size={15} />
                    <span>Live Demo (Placeholder)</span>
                  </span>
                )}
              </div>

              <button type="button" className="btn btn--ghost" onClick={onClose}>
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
