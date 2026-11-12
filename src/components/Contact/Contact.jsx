import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  GitBranch,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (key, text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 300);
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">
            <Mail size={14} aria-hidden="true" />
            <span>Get In Touch</span>
          </span>
          <h2 id="contact-heading" className="section-title">
            Let&apos;s Connect &amp; Collaborate
          </h2>
          <p className="section-subtitle">
            Interested in discussing IT internship opportunities, entry-level developer roles, or academic project collaborations? Reach out through any of the channels below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Professional Channels */}
          <motion.div
            className="contact-channels"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45 }}
          >
            <div className="contact-intro-card">
              <h3 className="contact-intro-card__title">
                Professional Contact Channels
              </h3>
              <p className="contact-intro-card__desc">
                Contact links are currently configured as safe placeholders to protect private information. Update them anytime in <code>src/data/personalInfo.js</code>.
              </p>

              <div className="contact-channel-list">
                {/* Email Channel */}
                <div className="contact-channel-item">
                  <span className="contact-channel-item__icon" aria-hidden="true">
                    <Mail size={19} />
                  </span>
                  <div className="contact-channel-item__info">
                    <span className="contact-channel-item__label">
                      {personalInfo.contact.email.label}
                    </span>
                    <strong className="contact-channel-item__value">
                      {personalInfo.contact.email.value}
                    </strong>
                    <span className="contact-channel-item__note">
                      {personalInfo.contact.email.note}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() =>
                      handleCopy('email', personalInfo.contact.email.value)
                    }
                    aria-label="Copy email address placeholder"
                    title="Copy value"
                  >
                    {copiedKey === 'email' ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                {/* GitHub Channel */}
                <div className="contact-channel-item">
                  <span className="contact-channel-item__icon" aria-hidden="true">
                    <GitBranch size={19} />
                  </span>
                  <div className="contact-channel-item__info">
                    <span className="contact-channel-item__label">
                      {personalInfo.contact.github.label}
                    </span>
                    <strong className="contact-channel-item__value">
                      {personalInfo.contact.github.value}
                    </strong>
                    <span className="contact-channel-item__note">
                      {personalInfo.contact.github.note}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() =>
                      handleCopy('github', personalInfo.contact.github.value)
                    }
                    aria-label="Copy GitHub profile placeholder"
                    title="Copy value"
                  >
                    {copiedKey === 'github' ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                {/* LinkedIn Channel */}
                <div className="contact-channel-item">
                  <span className="contact-channel-item__icon" aria-hidden="true">
                    <Linkedin size={19} />
                  </span>
                  <div className="contact-channel-item__info">
                    <span className="contact-channel-item__label">
                      {personalInfo.contact.linkedin.label}
                    </span>
                    <strong className="contact-channel-item__value">
                      {personalInfo.contact.linkedin.value}
                    </strong>
                    <span className="contact-channel-item__note">
                      {personalInfo.contact.linkedin.note}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={() =>
                      handleCopy('linkedin', personalInfo.contact.linkedin.value)
                    }
                    aria-label="Copy LinkedIn profile placeholder"
                    title="Copy value"
                  >
                    {copiedKey === 'linkedin' ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="contact-channel-item">
                  <span className="contact-channel-item__icon" aria-hidden="true">
                    <MapPin size={19} />
                  </span>
                  <div className="contact-channel-item__info">
                    <span className="contact-channel-item__label">Location</span>
                    <strong className="contact-channel-item__value">
                      {personalInfo.education.institution} • {personalInfo.contact.location}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <h3 className="contact-form__title">Send a Direct Message</h3>
              <p className="contact-form__subtitle">
                Fill out the form below to draft an inquiry.
              </p>

              {submitted && (
                <div className="contact-form__alert" role="status">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <div>
                    <strong>Message Draft Recorded!</strong>
                    <p>
                      Thank you for reaching out. Once your official email address is configured in <code>personalInfo.js</code>, this form can route directly to your inbox.
                    </p>
                  </div>
                </div>
              )}

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name">Your Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Juan Dela Cruz"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="contact-email">Your Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="IT Internship / Web Development Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Hello Kyle, I would like to connect regarding..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn--primary contact-form__submit">
                <Send size={16} aria-hidden="true" />
                <span>Send Message</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
