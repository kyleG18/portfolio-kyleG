import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Award,
  Trophy,
  Cpu,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Layers,
  Database,
  Globe,
  Terminal,
  Zap,
  Server,
  Wrench,
  FileCode,
  ShieldCheck,
  Gamepad2,
  Compass,
  Plane,
  Activity,
  X
} from 'lucide-react';
import { featuredProjects } from '../../data/projects';
import { certificationsData } from '../../data/certifications';
import {
  playClickSound,
  playPopSound,
  playWhooshSound
} from '../../utils/soundEffects';
import './PortfolioSection.css';

// Tech stack items with official colors matching reference video
const TECH_STACK_ITEMS = [
  { name: 'React', icon: Globe, color: '#61DAFB', desc: 'Component Architecture & State' },
  { name: 'JavaScript', icon: FileCode, color: '#F7DF1E', desc: 'ES6+ Logic & Async Services' },
  { name: 'HTML5', icon: Globe, color: '#E34F26', desc: 'Semantic Markup & Accessibility' },
  { name: 'CSS3', icon: Layers, color: '#1572B6', desc: 'Responsive Design & Animations' },
  { name: 'Node.js', icon: Server, color: '#339933', desc: 'Server Runtime & Automation' },
  { name: 'Express.js', icon: Zap, color: '#60A5FA', desc: 'REST API & Routing Layer' },
  { name: 'MySQL', icon: Database, color: '#4479A1', desc: 'Relational Schema & Query Optimization' },
  { name: 'PostgreSQL', icon: Database, color: '#336791', desc: 'Structured Data Persistence' },
  { name: 'Python', icon: Terminal, color: '#3776AB', desc: 'Backend Logic & Data Scripts' },
  { name: 'Groq AI API', icon: Cpu, color: '#F97316', desc: 'LLM Guidance & Permit Assistant' },
  { name: 'Git', icon: GitBranch, color: '#F05032', desc: 'Distributed Version Control' },
  { name: 'GitHub', icon: GitBranch, color: '#E2E8F0', desc: 'Collaboration & CI/CD Pipelines' },
  { name: 'VS Code', icon: Wrench, color: '#007ACC', desc: 'Development Environment' },
  { name: 'Vite', icon: Zap, color: '#646CFF', desc: 'Next-Gen Frontend Tooling' }
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [confirmVisitUrl, setConfirmVisitUrl] = useState(null);

  const handleTabChange = (tab) => {
    playPopSound();
    setActiveTab(tab);
  };

  const handleOpenProject = (proj) => {
    playWhooshSound();
    setSelectedProject(proj);
  };

  const handleBackToProjects = () => {
    playClickSound();
    setSelectedProject(null);
    setConfirmVisitUrl(null);
  };

  const handlePromptVisit = (url) => {
    playPopSound();
    setConfirmVisitUrl(url);
  };

  const handleConfirmNavigate = () => {
    playClickSound();
    if (confirmVisitUrl) {
      window.open(confirmVisitUrl, '_blank', 'noopener,noreferrer');
      setConfirmVisitUrl(null);
    }
  };

  const getProjectIcon = (id) => {
    switch (id) {
      case 'permitease':
        return <ShieldCheck size={36} className="preview-hero-icon" />;
      case 'gacula-gaminglab':
      case 'gacula-gaminglabs':
        return <Gamepad2 size={36} className="preview-hero-icon" />;
      case 'lakbay-alalay':
        return <Compass size={36} className="preview-hero-icon" />;
      case 'once-travelagency':
        return <Plane size={36} className="preview-hero-icon" />;
      default:
        return <Activity size={36} className="preview-hero-icon" />;
    }
  };

  return (
    <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-title">
      <div className="container">
        {/* Section Heading */}
        <div className="ref-section-title-wrap">
          <h2 id="portfolio-title" className="ref-section-title">
            Portfolio
          </h2>
        </div>

        {/* ================= DEDICATED PROJECT DETAIL VIEW (WITH CONFIRMATION MODAL) ================= */}
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key="project-details-view"
              className="project-detail-view"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Back Button & Breadcrumbs */}
              <div className="project-detail-top">
                <button
                  type="button"
                  className="btn-back"
                  onClick={handleBackToProjects}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Back to Projects</span>
                </button>
                <div className="project-breadcrumb">
                  <span>Projects</span>
                  <span className="breadcrumb-separator">&gt;</span>
                  <span className="breadcrumb-current">{selectedProject.shortTitle}</span>
                </div>
              </div>

              {/* Project Detail Grid */}
              <div className="project-detail-grid">
                {/* Left Column: Info & Action Buttons */}
                <div className="project-detail-left">
                  <div className="project-detail-status-pill">
                    <span className="pulse-dot" />
                    <span>{selectedProject.status}</span>
                  </div>

                  <h3 className="project-detail-title">{selectedProject.title}</h3>
                  <p className="project-detail-summary">{selectedProject.summary}</p>
                  <p className="project-detail-desc">{selectedProject.solutionOverview}</p>

                  <div className="project-detail-block">
                    <h4 className="project-detail-subheading">Technologies Used</h4>
                    <div className="tech-badge-pills">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="tech-badge-pill">
                          <CheckCircle2 size={13} aria-hidden="true" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-detail-block">
                    <h4 className="project-detail-subheading">Key Highlights</h4>
                    <ul className="project-detail-features">
                      {selectedProject.features.map((feat) => (
                        <li key={feat}>
                          <CheckCircle2 size={15} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="project-detail-actions">
                    {selectedProject.liveUrl ? (
                      <button
                        type="button"
                        className="btn-hero btn-hero--primary btn-visit-live"
                        onClick={() => handlePromptVisit(selectedProject.liveUrl)}
                      >
                        <ExternalLink size={16} />
                        <span>Visit Live Project ({new URL(selectedProject.liveUrl).hostname})</span>
                      </button>
                    ) : (
                      <span className="project-placeholder-pill">
                        API Lab Benchmark Project
                      </span>
                    )}

                    {selectedProject.links?.github && (
                      <a
                        href={selectedProject.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-hero btn-hero--secondary"
                      >
                        <GitBranch size={16} />
                        <span>GitHub Repo</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Visual Mockup / Real Screenshot */}
                <div className="project-detail-right">
                  <div className="project-mockup-frame">
                    <div className="mockup-header-bar">
                      <div className="mockup-dots">
                        <span className="dot dot--red" />
                        <span className="dot dot--yellow" />
                        <span className="dot dot--green" />
                      </div>
                      <span className="mockup-address-bar">
                        {selectedProject.liveUrl || `https://${selectedProject.id}.local/dashboard`}
                      </span>
                    </div>

                    <div className="mockup-screen-content">
                      {selectedProject.image ? (
                        <div
                          className="mockup-real-screenshot-wrap"
                          onClick={() => handlePromptVisit(selectedProject.liveUrl)}
                          title="Click to visit live website"
                        >
                          <img
                            src={selectedProject.image}
                            alt={`${selectedProject.title} Live Interface`}
                            className="mockup-real-screenshot"
                          />
                          <div className="mockup-image-hover-overlay">
                            <ExternalLink size={24} />
                            <span>Previewing Live Site — Click to Visit</span>
                          </div>
                        </div>
                      ) : (
                        <div className="mockup-dashboard-preview">
                          <div className="mockup-banner">
                            <span className="mockup-status-dot" />
                            <strong>{selectedProject.shortTitle} • Live Interface</strong>
                          </div>
                          <div className="mockup-metrics-row">
                            <div className="mockup-metric-box">
                              <span>Deployment</span>
                              <strong>Vercel Edge</strong>
                            </div>
                            <div className="mockup-metric-box">
                              <span>Frontend</span>
                              <strong>React + Vite</strong>
                            </div>
                            <div className="mockup-metric-box">
                              <span>Status</span>
                              <strong>Active 100%</strong>
                            </div>
                          </div>
                          <div className="mockup-chart-box">
                            <div className="mockup-chart-header">
                              <span>Latency &amp; Response Benchmark</span>
                              <span>&lt; 28ms</span>
                            </div>
                            <div className="mockup-fake-bars">
                              <span style={{ height: '50%' }} />
                              <span style={{ height: '75%' }} />
                              <span style={{ height: '60%' }} />
                              <span style={{ height: '90%' }} />
                              <span style={{ height: '65%' }} />
                              <span style={{ height: '100%' }} />
                              <span style={{ height: '85%' }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="portfolio-tabs-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Filter Tab Bar Matching Reference Video */}
              <div className="portfolio-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'projects'}
                  className={`portfolio-tab ${activeTab === 'projects' ? 'portfolio-tab--active' : ''}`}
                  onClick={() => handleTabChange('projects')}
                >
                  <Code2 size={16} />
                  <span>Projects ({featuredProjects.length})</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'certificates'}
                  className={`portfolio-tab ${activeTab === 'certificates' ? 'portfolio-tab--active' : ''}`}
                  onClick={() => handleTabChange('certificates')}
                >
                  <Award size={16} />
                  <span>Certificates</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'achievements'}
                  className={`portfolio-tab ${activeTab === 'achievements' ? 'portfolio-tab--active' : ''}`}
                  onClick={() => handleTabChange('achievements')}
                >
                  <Trophy size={16} />
                  <span>Achievements</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'techstack'}
                  className={`portfolio-tab ${activeTab === 'techstack' ? 'portfolio-tab--active' : ''}`}
                  onClick={() => handleTabChange('techstack')}
                >
                  <Cpu size={16} />
                  <span>Tech Stack</span>
                </button>
              </div>

              {/* Tab 1: All Projects Grid (Including Vercel Deployed Projects) */}
              {activeTab === 'projects' && (
                <div className="projects-grid-modern">
                  {featuredProjects.map((proj, idx) => (
                    <motion.article
                      key={proj.id}
                      className="ref-project-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                    >
                      {/* Mockup Preview Top */}
                      <div
                        className="ref-project-preview"
                        onClick={() => handleOpenProject(proj)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleOpenProject(proj);
                        }}
                      >
                        {proj.image ? (
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="ref-project-preview-thumb"
                          />
                        ) : (
                          <div className="ref-project-preview-overlay">
                            {getProjectIcon(proj.id)}
                            <span className="preview-tag-title">{proj.shortTitle}</span>
                          </div>
                        )}

                        <div className="preview-live-pill">
                          <span className="pulse-dot" />
                          <span>{proj.status}</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="ref-project-body">
                        <span className="ref-project-category">{proj.category}</span>
                        <h3 className="ref-project-title">{proj.shortTitle}</h3>
                        <p className="ref-project-desc">{proj.summary}</p>

                        <div className="ref-project-footer-row">
                          <button
                            type="button"
                            className="ref-project-details-btn"
                            onClick={() => handleOpenProject(proj)}
                          >
                            <span>Preview &amp; Details</span>
                            <ArrowRight size={14} />
                          </button>

                          {proj.liveUrl && (
                            <button
                              type="button"
                              className="ref-project-quick-link"
                              onClick={() => handlePromptVisit(proj.liveUrl)}
                              title={`Visit ${proj.shortTitle} on Vercel`}
                            >
                              <ExternalLink size={14} />
                              <span>Live</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Tab 2: Certificates Grid */}
              {activeTab === 'certificates' && (
                <div className="credentials-grid-ref">
                  {certificationsData.slice(0, 3).map((cert, idx) => (
                    <motion.div
                      key={cert.id}
                      className="ref-cert-card"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                    >
                      <div className="ref-cert-header">
                        <Award size={24} className="ref-cert-icon" />
                        <span className="ref-cert-badge">Verified Credential</span>
                      </div>
                      <h4 className="ref-cert-title">{cert.title}</h4>
                      <p className="ref-cert-issuer">{cert.issuer}</p>
                      <p className="ref-cert-desc">{cert.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Tab 3: Achievements Grid */}
              {activeTab === 'achievements' && (
                <div className="credentials-grid-ref">
                  <motion.div
                    className="ref-cert-card"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="ref-cert-header">
                      <Trophy size={24} className="ref-cert-icon" />
                      <span className="ref-cert-badge">Academic Milestone</span>
                    </div>
                    <h4 className="ref-cert-title">BSIT 4th-Year Capstone Leadership</h4>
                    <p className="ref-cert-issuer">John Paul College</p>
                    <p className="ref-cert-desc">
                      Lead developer and researcher for PermitEase (officially deployed at permitease.vercel.app), bridging academic computing with real-world municipal business permit automation.
                    </p>
                  </motion.div>
                </div>
              )}

              {/* Tab 4: Tech Stack Grid */}
              {activeTab === 'techstack' && (
                <div className="tech-stack-grid-ref">
                  {TECH_STACK_ITEMS.map((item, idx) => {
                    const IconComp = item.icon;
                    return (
                      <motion.div
                        key={item.name}
                        className="tech-stack-card-ref"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.04 }}
                      >
                        <div
                          className="tech-stack-icon-wrap"
                          style={{ color: item.color }}
                        >
                          <IconComp size={32} />
                        </div>
                        <strong className="tech-stack-name">{item.name}</strong>
                        <span className="tech-stack-desc">{item.desc}</span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= VISIT CONFIRMATION MODAL ================= */}
        <AnimatePresence>
          {confirmVisitUrl && (
            <div
              className="confirm-modal-overlay"
              onClick={() => setConfirmVisitUrl(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-modal-title"
            >
              <motion.div
                className="confirm-modal-box"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.2 }}
              >
                <div className="confirm-modal-header">
                  <div className="confirm-modal-icon">
                    <ExternalLink size={20} />
                  </div>
                  <h4 id="confirm-modal-title">Visit External Live Project?</h4>
                  <button
                    type="button"
                    className="confirm-modal-close"
                    onClick={() => setConfirmVisitUrl(null)}
                    aria-label="Close dialog"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="confirm-modal-body">
                  <p>
                    You are about to open the live deployed application at:
                  </p>
                  <code className="confirm-url-pill">{confirmVisitUrl}</code>
                  <p className="confirm-subtext">
                    This project is actively hosted on Vercel. Would you like to proceed in a new tab or stay on this portfolio preview?
                  </p>
                </div>

                <div className="confirm-modal-footer">
                  <button
                    type="button"
                    className="btn-modal btn-modal--secondary"
                    onClick={() => {
                      playClickSound();
                      setConfirmVisitUrl(null);
                    }}
                  >
                    Stay on Preview
                  </button>
                  <button
                    type="button"
                    className="btn-modal btn-modal--primary"
                    onClick={handleConfirmNavigate}
                  >
                    <span>Proceed to Live Site</span>
                    <ExternalLink size={15} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
