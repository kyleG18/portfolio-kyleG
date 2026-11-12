import profilePhoto from '../assets/profile-kyle.jpg';
import lanyardPhoto from '../assets/jpc-lanyard-ref.jpg';

export const personalInfo = {
  name: 'Kyle Andre Gacula',
  uppercaseName: 'KYLE ANDRE GACULA',
  headline: '4th-Year BSIT Student | Aspiring IT Professional',
  roles: [
    'Aspiring IT Professional',
    'Web Developer',
    'AI Automation Enthusiast'
  ],
  tagline:
    'Building practical digital solutions through web development, technology, and continuous learning.',
  education: {
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    shortDegree: 'BS in Information Technology',
    yearLevel: '4th-Year Student',
    institution: 'John Paul College',
    campusLocation: 'Roxas, Oriental Mindoro',
    country: 'Philippines'
  },
  availability: {
    status: 'Available for IT Internships & Entry-Level Roles',
    isAvailable: true
  },
  assets: {
    profilePhoto,
    lanyardPhoto
  },
  about: {
    lead: 'I am a fourth-year Bachelor of Science in Information Technology student at John Paul College with an interest in web development, database management, AI automation, and IT infrastructure.',
    supporting:
      'I enjoy building practical applications, exploring emerging technologies, and continuously improving my technical abilities through academic projects and independent learning.',
    pillars: [
      {
        id: 'academic',
        title: 'Academic Background',
        description:
          'Currently in my 4th year of BS Information Technology at John Paul College (Philippines), translating foundational computing principles into working web systems and database-backed applications.'
      },
      {
        id: 'interests',
        title: 'Technical Interests',
        description:
          'Focused on full-stack web development, relational database management (MySQL, PostgreSQL), AI-assisted workflow automation, and foundational IT infrastructure & networking.'
      },
      {
        id: 'approach',
        title: 'Development Approach',
        description:
          'Emphasizes clean architecture, structured relational data, reliable REST APIs, and responsive user interfaces that solve real-world administrative and operational problems.'
      },
      {
        id: 'aspirations',
        title: 'Career Aspirations',
        description:
          'Prepared to contribute to software engineering, web development, or IT operations teams while continuously growing through hands-on problem solving and technical mentorship.'
      }
    ]
  },
  contact: {
    email: {
      label: 'Email Address',
      value: 'kyleandregacula@email.placeholder',
      isPlaceholder: true,
      note: 'Placeholder — Replace with official email address'
    },
    github: {
      label: 'GitHub Profile',
      value: 'github.com/kyle-gacula-placeholder',
      url: '#contact',
      isPlaceholder: true,
      note: 'Placeholder — Link to GitHub profile'
    },
    linkedin: {
      label: 'LinkedIn Profile',
      value: 'linkedin.com/in/kyle-andre-gacula-placeholder',
      url: '#contact',
      isPlaceholder: true,
      note: 'Placeholder — Link to LinkedIn profile'
    },
    location: 'Philippines'
  }
};
