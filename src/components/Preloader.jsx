import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 350);
          return 100;
        }
        const increment = Math.floor(Math.random() * 14) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: 'easeInOut' } }}
        >
          <div className="preloader-content">
            <motion.div
              className="preloader-percentage"
              key={progress}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.08 }}
            >
              {progress}
              <span className="preloader-symbol">%</span>
            </motion.div>
            <p className="preloader-subtext">Loading assets...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
