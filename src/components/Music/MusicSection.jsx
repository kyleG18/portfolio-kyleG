import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc3, ExternalLink, Heart } from 'lucide-react';
import { playClickSound, playPopSound } from '../../utils/soundEffects';
import './MusicSection.css';

const TRACKS = [
  { id: 1, title: 'Coding Flow & Focus', artist: 'Lo-Fi Chill Beats', duration: '03:45' },
  { id: 2, title: 'Right Now', artist: 'One Direction', duration: '05:20' },
  { id: 3, title: "Love Story (Taylor's Version)", artist: 'Taylor Swift', duration: '03:55' },
  { id: 4, title: 'Payphone', artist: 'Maroon 5', duration: '03:51' }
];

export default function MusicSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(true);

  const activeTrack = TRACKS[activeTrackIndex];

  return (
    <section className="music-section" aria-labelledby="music-title">
      <div className="container music-grid">
        {/* Left Side: Editorial Heading & Message */}
        <motion.div
          className="music-left"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="music-heading-wrap">
            <h2 id="music-title" className="music-title">
              A little music. <br />
              <span>A lot of ideas.</span>
            </h2>
          </div>

          <p className="music-desc">
            Music that fuels my coding sessions and transforms complex problem-solving into clean architecture. Here is a glimpse into the daily playlist that keeps the momentum going.
          </p>

          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero btn-hero--secondary music-spotify-btn"
          >
            <Disc3 size={17} aria-hidden="true" />
            <span>Daily Rotation on Spotify</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </motion.div>

        {/* Right Side: Interactive Music Player Card */}
        <motion.div
          className="music-right"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="music-player-card">
            {/* Player Header */}
            <div className="music-player-top">
              <div className="music-cover-art">
                <div className={`music-vinyl ${isPlaying ? 'music-vinyl--spin' : ''}`}>
                  <Disc3 size={32} />
                </div>
              </div>

              <div className="music-track-meta">
                <div className="music-track-meta-row">
                  <div>
                    <h3 className="music-track-name">{activeTrack.title}</h3>
                    <p className="music-track-artist">{activeTrack.artist}</p>
                  </div>
                  <button
                    type="button"
                    className={`music-heart-btn ${isLiked ? 'music-heart-btn--active' : ''}`}
                    onClick={() => {
                      playPopSound();
                      setIsLiked(!isLiked);
                    }}
                    aria-label="Like song"
                  >
                    <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} />
                  </button>
                </div>

                <div className="music-status-pill">
                  <span className={`music-eq ${isPlaying ? 'music-eq--active' : ''}`}>
                    <span />
                    <span />
                    <span />
                  </span>
                  <span>{isPlaying ? 'Now Playing' : 'Paused'}</span>
                </div>
              </div>
            </div>

            {/* Scrubber Bar */}
            <div className="music-scrubber">
              <div className="music-progress-bar">
                <div
                  className="music-progress-fill"
                  style={{ width: isPlaying ? '58%' : '32%' }}
                />
              </div>
              <div className="music-timestamps">
                <span>02:14</span>
                <span>{activeTrack.duration}</span>
              </div>
            </div>

            {/* Tracklist Items */}
            <div className="music-tracklist" role="list">
              {TRACKS.map((track, idx) => {
                const isCurrent = idx === activeTrackIndex;
                return (
                  <div
                    key={track.id}
                    className={`music-track-row ${isCurrent ? 'music-track-row--active' : ''}`}
                    onClick={() => {
                      playClickSound();
                      setActiveTrackIndex(idx);
                      setIsPlaying(true);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setActiveTrackIndex(idx);
                        setIsPlaying(true);
                      }
                    }}
                  >
                    <div className="music-track-row-left">
                      <span className="music-track-number">{idx + 1}</span>
                      <div>
                        <strong className="music-row-title">{track.title}</strong>
                        <span className="music-row-artist">{track.artist}</span>
                      </div>
                    </div>

                    <div className="music-track-row-right">
                      <span className="music-row-duration">{track.duration}</span>
                      {isCurrent && (
                        <button
                          type="button"
                          className="music-play-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlaying(!isPlaying);
                          }}
                          aria-label={isPlaying ? 'Pause track' : 'Play track'}
                        >
                          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
