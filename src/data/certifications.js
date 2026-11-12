export const certificationCategories = [
  { id: 'all', label: 'All Categories' },
  { id: 'certification', label: 'Technical Certifications' },
  { id: 'course', label: 'Online Courses' },
  { id: 'achievement', label: 'Academic Achievements' },
  { id: 'training', label: 'Relevant Training' }
];

export const certificationsData = [
  {
    id: 'cert-placeholder-1',
    category: 'certification',
    categoryLabel: 'Technical Certification',
    title: 'Technical Certification Slot (Placeholder)',
    issuer: 'Issuing Organization / Provider Placeholder',
    status: 'Awaiting Credential Upload',
    description:
      'Reserved for official IT, web development, database, or networking certifications. Update in src/data/certifications.js once verified certificate details are ready.',
    isPlaceholder: true
  },
  {
    id: 'course-placeholder-1',
    category: 'course',
    categoryLabel: 'Online Course',
    title: 'Self-Paced Web Development / AI Automation Course (Placeholder)',
    issuer: 'Learning Platform Placeholder',
    status: 'Awaiting Credential Upload',
    description:
      'Reserved for completed online courses in React, Node.js, SQL, or AI automation workflows. No courses have been fabricated.',
    isPlaceholder: true
  },
  {
    id: 'achievement-placeholder-1',
    category: 'achievement',
    categoryLabel: 'Academic Achievement',
    title: 'BSIT Academic / Capstone Milestone (Placeholder)',
    issuer: 'John Paul College — BSIT Department',
    status: 'Awaiting Official Details',
    description:
      'Reserved for verified academic recognitions, capstone presentation milestones, or department achievements at John Paul College.',
    isPlaceholder: true
  },
  {
    id: 'training-placeholder-1',
    category: 'training',
    categoryLabel: 'Relevant Training',
    title: 'IT Seminar, Workshop, or Technical Bootcamp (Placeholder)',
    issuer: 'Training Host / Institution Placeholder',
    status: 'Awaiting Official Details',
    description:
      'Reserved for attended IT seminars, hands-on laboratory workshops, and industry readiness trainings.',
    isPlaceholder: true
  }
];
