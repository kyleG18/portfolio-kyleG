import React, { useState, useEffect, useRef, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import LanyardScene from './LanyardScene';
import LanyardFallback from './LanyardFallback';
import { personalInfo } from '../../data/personalInfo';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './InteractiveLanyard.css';

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <LanyardFallback />;
    }
    return this.props.children;
  }
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function InteractiveLanyard() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const [webglSupported, setWebglSupported] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleToggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="lanyard-viewport"
      aria-label="Interactive 3D John Paul College Lanyard and Student ID Card"
    >
      {webglSupported ? (
        <WebGLErrorBoundary>
          <Canvas
            className="lanyard-canvas"
            camera={{ position: [0, 0.05, 5.0], fov: 41 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance'
            }}
          >
            <LanyardScene
              profilePhotoUrl={personalInfo.assets.profilePhoto}
              lanyardPhotoUrl={personalInfo.assets.lanyardPhoto}
              isFlipped={isFlipped}
              onToggleFlip={handleToggleFlip}
              resetSignal={resetSignal}
              reducedMotion={reducedMotion}
              isVisible={isVisible}
            />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <LanyardFallback />
      )}
    </div>
  );
}
