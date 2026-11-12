import React, { useState } from 'react';
import Preloader from './components/Preloader';
import StarfieldBackground from './components/StarfieldBackground';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import MusicSection from './components/Music/MusicSection';
import PortfolioSection from './components/Portfolio/PortfolioSection';
import ContactSection from './components/Contact/ContactSection';
import Footer from './components/Footer/Footer';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setLoadingComplete(true)} />
      <StarfieldBackground />

      <a href="#home" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <MusicSection />
        <PortfolioSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
