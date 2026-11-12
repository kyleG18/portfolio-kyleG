# Kyle Andre Gacula — Personal Developer Portfolio

A creative, modern, high-performance personal developer portfolio website inspired by [alfari.my.id](https://www.alfari.my.id/), built for **Kyle Andre Gacula**, 4th-Year Bachelor of Science in Information Technology (BSIT) student at **John Paul College** (Roxas, Oriental Mindoro, Philippines).

---

## ✨ Features

- **Interactive 3D Lanyard & Student ID Badge:**
  - Procedurally textured John Paul College royal blue strap with authentic typography (*"JOHN PAUL COLLEGE / ROXAS, ORIENTAL MINDORO"*), woven fabric micro-bump map, metal clip, rivets, and student ID card with Kyle's portrait and details.
  - Realistic physics simulation: draggable, swingable, throwable with velocity damping, and double-sided card flip.
  - Initial hanging fall-down / slide-down physics entrance animation on page load.
  - Fully responsive: full-bleed panoramic pan on desktop, dedicated framed interactive showcase on mobile & tablet devices.
- **Deep Space Twinkling Starfield:**
  - Procedural 2D canvas background with twinkling, drifting stars and occasional shooting star animations across a `#030712` cosmic void.
- **Glassmorphic Floating Island Navbar:**
  - Floating pill with active section indicator, smooth section scrolling, and Web Audio API synthesizer sound effects toggle.
- **Dynamic Role Typewriter Ticker:**
  - Cycling roles: *3D Creative Developer*, *React & Three.js Enthusiast*, *4th-Year BSIT Student*, *Aspiring IT Professional*.
- **Interactive Spotify-Style Music Section:**
  - Custom audio player with spinning vinyl disc, animated equalizer bars, and tracklist.
- **Flagship Deployed Projects Showcase:**
  1. [**PermitEase**](https://permitease.vercel.app/) — Official Business Permit Preparation & Readiness Support Portal for the Municipality of Roxas, Oriental Mindoro.
  2. [**Gacula Gaming Labs**](https://gacula-gaminglab.vercel.app/) — Interactive Precision Gaming Hardware Platform & Direct Lab Access.
  3. [**Once Travel Agency**](https://once-travelagency.vercel.app/) — Curated Philippine Tourism & Escapes Booking Portal.
  - In-portfolio technical detail view with authentic UI screenshots and safe external link confirmation prompts.
- **Interactive Guestbook & Contact Section:**
  - Live visitor comment feed with instant client-side post preview and emoji avatar selector.
  - Direct inquiry form and social channels (*GitHub, LinkedIn, Email*).
- **Zero Heavy UI Libraries:**
  - Crafted strictly in **Vanilla CSS** with fluid typography (`clamp()`), modern CSS Grid, and Flexbox for complete responsive compatibility across all screen sizes.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Bundler & Build Tool:** Vite 6
- **3D Graphics & Physics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations:** `framer-motion`
- **Icons:** `lucide-react`
- **Audio:** Web Audio API Procedural Synthesizer
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, Grid)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18+ recommended)
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/kyleG18/portfolio-kyleG.git

# Navigate into the project directory
cd portfolio-kyleG

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:5173/`.

### Production Build

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
