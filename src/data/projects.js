import permiteaseImg from '../assets/permitease-preview.jpg';
import gaculaGamingImg from '../assets/gacula-gaminglab-preview.jpg';
import onceTravelImg from '../assets/once-travelagency-preview.jpg';

export const featuredProjects = [
  {
    id: 'permitease',
    code: 'PRJ-01',
    shortTitle: 'PermitEase',
    title: 'PermitEase: A Guided Business Permit Preparation and Readiness Assessment System',
    category: 'Full-Stack Web App • Official LGU Roxas Portal',
    status: 'Live on Vercel • Official Capstone',
    summary:
      'Official business permit preparation & support portal for the Municipality of Roxas, Oriental Mindoro. Guides business owners step-by-step through required documents, readiness scores, and tax estimations.',
    problemStatement:
      'Applying for or renewing local business permits often involves complex documentary requirements, unclear fee structures, and repeated visits to local government offices due to incomplete submissions.',
    solutionOverview:
      'PermitEase streamlines preparation before physical submission by guiding business owners step-by-step through required documents, evaluating their application readiness score, estimating local business taxes, and providing an LGU administrative dashboard with QR-based verification.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL', 'Groq AI API', 'Vercel'],
    liveUrl: 'https://permitease.vercel.app/',
    image: permiteaseImg,
    features: [
      'Business permit readiness assessment score',
      'Interactive document checklist & requirement tracking',
      'Local business tax and fee estimation calculation',
      'Application progress & renewal monitoring',
      'LGU administrative management dashboard',
      'AI-powered business permit assistance',
      'QR-based permit verification system'
    ],
    architectureHighlights: [
      {
        label: 'Live Deployment',
        detail: 'Hosted and deployed on Vercel with responsive mobile and desktop support.'
      },
      {
        label: 'Client Layer',
        detail: 'React frontend featuring readiness progress bars, dynamic Tagalog/English localization, and LGU Roxas branding.'
      },
      {
        label: 'AI & Data Services',
        detail: 'Groq AI API integration for instant permit requirement questions alongside MySQL structured storage.'
      }
    ],
    links: {
      github: null,
      liveDemo: 'https://permitease.vercel.app/'
    }
  },
  {
    id: 'gacula-gaminglab',
    code: 'PRJ-02',
    shortTitle: 'Gacula Gaming Labs',
    title: 'Gacula Gaming Labs – Precision Engineering Gaming Hardware Platform',
    category: 'Interactive E-Commerce & Precision Hardware Platform',
    status: 'Live on Vercel',
    summary:
      'High-performance gaming hardware showcase and direct lab access platform featuring precision engineering specs, G-Alpha protocol hardware, and seamless digital commerce.',
    problemStatement:
      'High-tier gaming hardware demands an equally responsive, dark-mode futuristic web presence that highlights 8000Hz polling rates, optical switch mechanics, and weightless chassis specs with low latency.',
    solutionOverview:
      'Engineered the Gacula Gaming Labs platform with modern component architecture, high-contrast cyan cyber visuals, specs comparison, and interactive hardware catalog workflows.',
    technologies: ['React', 'JavaScript', 'CSS3', 'Vite', 'Vercel'],
    liveUrl: 'https://gacula-gaminglab.vercel.app/',
    image: gaculaGamingImg,
    features: [
      'Precision engineering hardware showcase & G-Alpha protocol',
      'Direct lab access build customizer & specs viewer',
      'High-contrast futuristic cyber interface design',
      'Integrated shopping cart and catalog management'
    ],
    architectureHighlights: [
      {
        label: 'Edge Deployment',
        detail: 'Hosted with instant edge caching and global asset distribution on Vercel.'
      },
      {
        label: 'Visual Engineering',
        detail: 'Cyberpunk-inspired UI with custom typography, glowing cyan accents, and precision spec tables.'
      }
    ],
    links: {
      github: null,
      liveDemo: 'https://gacula-gaminglab.vercel.app/'
    }
  },
  {
    id: 'once-travelagency',
    code: 'PRJ-03',
    shortTitle: 'Once Travel Agency',
    title: 'Once Travel Agency – Curated Philippine Travel Experiences & Escapes',
    category: 'E-Commerce & Philippine Tourism Portal',
    status: 'Live on Vercel',
    summary:
      'Curated Philippine travel experiences portal. Discover thoughtfully curated escapes, tour package booking, destination guides, and seamless trip planning.',
    problemStatement:
      'Travelers looking for curated Philippine experiences need an inspiring, high-aesthetic web destination to explore packages, compare itineraries, and plan trips effortlessly.',
    solutionOverview:
      'Designed and deployed an elegant travel portal featuring editorial typography, curated Philippine destination guides, package booking workflows, and trip consultation forms.',
    technologies: ['React', 'JavaScript', 'CSS3', 'Vercel'],
    liveUrl: 'https://once-travelagency.vercel.app/',
    image: onceTravelImg,
    features: [
      'Curated Philippine experiences and destination guides',
      'Tour package explorer & itinerary breakdowns',
      'Interactive "Plan Your Trip" consultation workflow',
      'Editorial travel photography and gallery showcase'
    ],
    architectureHighlights: [
      {
        label: 'Aesthetic Design',
        detail: 'Warm luxury editorial palette with serif display typography and immersive travel photography.'
      },
      {
        label: 'Global Edge Hosting',
        detail: 'Fast static delivery and image caching powered by Vercel.'
      }
    ],
    links: {
      github: null,
      liveDemo: 'https://once-travelagency.vercel.app/'
    }
  }
];
