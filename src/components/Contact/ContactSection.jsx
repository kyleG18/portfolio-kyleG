import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { playClickSound, playPopSound } from '../../utils/soundEffects';
import './ContactSection.css';

const INITIAL_COMMENTS = [
  {
    id: 1,
    name: 'Al-Fari Yusuf',
    avatar: '👨‍💻',
    time: '2 hours ago',
    message: 'Awesome portfolio Kyle! The John Paul College 3D lanyard and ID badge swinging physics are incredible.'
  },
  {
    id: 2,
    name: 'BSIT Faculty Mentor',
    avatar: '🎓',
    time: '5 hours ago',
    message: 'Great execution on the PermitEase readiness assessment system architecture and API testing benchmarks.'
  },
  {
    id: 3,
    name: 'Tech Recruiter',
    avatar: '💼',
    time: '1 day ago',
    message: 'Very impressive student developer portfolio with clean Three.js integration and solid full-stack foundation.'
  }
];

const AVATAR_OPTIONS = ['👨‍💻', '🎓', '🚀', '💻', '⚡', '🤖'];

export default function ContactSection() {
  // Inquiry Form State
  const [inquiry, setInquiry] = useState({ name: '', email: '', message: '' });
  const [inquirySent, setInquirySent] = useState(false);

  // Guestbook State
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👨‍💻');

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    playPopSound();
    setInquirySent(true);
    setInquiry({ name: '', email: '', message: '' });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    playPopSound();

    const newComment = {
      id: Date.now(),
      name: guestName.trim(),
      avatar: selectedAvatar,
      time: 'Just now',
      message: guestMessage.trim()
    };

    setComments([newComment, ...comments]);
    setGuestName('');
    setGuestMessage('');
  };

  return (
    <section id="contact" className="ref-contact-section" aria-labelledby="contact-title">
      <div className="container">
        {/* Section Heading */}
        <div className="ref-section-title-wrap">
          <h2 id="contact-title" className="ref-section-title">
            Contact Me
          </h2>
        </div>

        <div className="ref-contact-grid">
          {/* Left Column: Direct Inquiry Form & FIND ME Cards */}
          <div className="ref-contact-left">
            <motion.div
              className="ref-contact-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="ref-card-heading">Get In Touch</h3>
              <p className="ref-card-sub">
                Have an IT internship, project collaboration, or inquiry? Feel free to reach out directly.
              </p>

              {inquirySent && (
                <div className="ref-alert-success">
                  <CheckCircle2 size={16} />
                  <span>Message draft recorded! Thank you for reaching out.</span>
                </div>
              )}

              <form className="ref-inquiry-form" onSubmit={handleInquirySubmit}>
                <div className="ref-form-field">
                  <label htmlFor="inquiry-name">Name</label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                  />
                </div>

                <div className="ref-form-field">
                  <label htmlFor="inquiry-email">Email</label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={inquiry.email}
                    onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                  />
                </div>

                <div className="ref-form-field">
                  <label htmlFor="inquiry-msg">Message</label>
                  <textarea
                    id="inquiry-msg"
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-hero btn-hero--primary ref-submit-btn">
                  <Send size={15} aria-hidden="true" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* FIND ME Cards Matching Reference Video (00:46) */}
            <div className="ref-findme-block">
              <span className="ref-findme-title">FIND ME</span>
              <div className="ref-findme-cards">
                <a
                  href="#contact"
                  className="ref-findme-card"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="ref-findme-icon">
                    <Github size={20} />
                  </div>
                  <div className="ref-findme-text">
                    <strong>GitHub</strong>
                    <span>@kyle-andre-gacula</span>
                  </div>
                  <ArrowUpRight size={17} className="ref-findme-arrow" />
                </a>

                <a
                  href="#contact"
                  className="ref-findme-card"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="ref-findme-icon">
                    <Linkedin size={20} />
                  </div>
                  <div className="ref-findme-text">
                    <strong>LinkedIn</strong>
                    <span>Kyle Andre Gacula</span>
                  </div>
                  <ArrowUpRight size={17} className="ref-findme-arrow" />
                </a>

                <a
                  href="#contact"
                  className="ref-findme-card"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="ref-findme-icon">
                    <Mail size={20} />
                  </div>
                  <div className="ref-findme-text">
                    <strong>Email</strong>
                    <span>kyleandregacula@email.placeholder</span>
                  </div>
                  <ArrowUpRight size={17} className="ref-findme-arrow" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Guestbook Feed (00:45 - 00:48 in video) */}
          <div className="ref-contact-right">
            <motion.div
              className="ref-contact-card ref-guestbook-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <div className="ref-guestbook-header">
                <div className="ref-guestbook-title-row">
                  <MessageSquare size={20} className="ref-guestbook-icon" />
                  <h3 className="ref-card-heading">
                    Guestbook <span>({comments.length})</span>
                  </h3>
                </div>
                <span className="ref-guestbook-pill">
                  <Sparkles size={12} />
                  <span>Leave a note</span>
                </span>
              </div>

              {/* Post Comment Form */}
              <form className="ref-guestbook-form" onSubmit={handleCommentSubmit}>
                <div className="ref-form-field">
                  <label htmlFor="guest-name">Your Name</label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                  />
                </div>

                <div className="ref-form-field">
                  <label htmlFor="guest-msg">Comment</label>
                  <textarea
                    id="guest-msg"
                    rows={3}
                    required
                    placeholder="Leave feedback or say hello here..."
                    value={guestMessage}
                    onChange={(e) => setGuestMessage(e.target.value)}
                  />
                </div>

                {/* Avatar Picker */}
                <div className="ref-avatar-picker-row">
                  <span className="ref-avatar-label">Choose Avatar:</span>
                  <div className="ref-avatars-list">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        className={`ref-avatar-btn ${selectedAvatar === av ? 'ref-avatar-btn--active' : ''}`}
                        onClick={() => {
                          playClickSound();
                          setSelectedAvatar(av);
                        }}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn-hero btn-hero--primary ref-comment-btn">
                  <span>Post Comment</span>
                  <Send size={14} />
                </button>
              </form>

              {/* Scrollable Live Stream of Visitor Comments */}
              <div className="ref-comments-stream">
                {comments.map((c) => (
                  <div key={c.id} className="ref-comment-item">
                    <div className="ref-comment-avatar">{c.avatar}</div>
                    <div className="ref-comment-bubble">
                      <div className="ref-comment-meta">
                        <strong className="ref-comment-author">{c.name}</strong>
                        <span className="ref-comment-time">{c.time}</span>
                      </div>
                      <p className="ref-comment-text">{c.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
