import { apiGet, apiSend } from './apiClient';

const STORAGE_KEY = 'sunlit_careers_positions';

const defaultPositions = [
  {
    id: 1,
    title: 'Solar Design Engineer',
    department: 'Engineering',
    location: 'Pune, Maharashtra',
    type: 'Full Time',
    experience: '2-4 Years',
    description:
      'We are looking for a skilled Solar Design Engineer to join our team. You will be responsible for designing solar PV systems, performing site assessments, and creating detailed engineering drawings.',
    requirements: [
      'B.E./B.Tech in Electrical/Electronics Engineering',
      '2-4 years of experience in solar PV system design',
      'Proficiency in AutoCAD, PVsyst, and SketchUp',
      'Knowledge of IS/IEC standards for solar installations',
      'Excellent analytical and problem-solving skills',
    ],
  },
  {
    id: 2,
    title: 'Project Manager - Solar EPC',
    department: 'Project Management',
    location: 'Pune, Maharashtra',
    type: 'Full Time',
    experience: '5-8 Years',
    description:
      'Lead and manage solar EPC projects from inception to completion. Coordinate with clients, vendors, and internal teams to ensure timely delivery and quality standards.',
    requirements: [
      'B.E./B.Tech in Electrical/Civil/Mechanical Engineering',
      '5-8 years of experience in solar EPC projects',
      'PMP certification preferred',
      'Strong project management and leadership skills',
      'Experience managing projects of 100kW+ capacity',
    ],
  },
  {
    id: 3,
    title: 'Sales Executive - Solar',
    department: 'Sales & Marketing',
    location: 'Mumbai / Pune',
    type: 'Full Time',
    experience: '1-3 Years',
    description:
      'Drive solar energy solution sales in residential and commercial segments. Build and maintain client relationships while achieving sales targets.',
    requirements: [
      'Graduate in any discipline',
      '1-3 years of sales experience (solar industry preferred)',
      'Excellent communication and negotiation skills',
      'Valid driving license and own vehicle',
      'Knowledge of solar products and net metering policies',
    ],
  },
  {
    id: 4,
    title: 'Electrical Site Engineer',
    department: 'Engineering',
    location: 'Pune, Maharashtra',
    type: 'Full Time',
    experience: '2-5 Years',
    description:
      'Oversee electrical installation work at solar project sites. Ensure safety compliance, quality control, and timely project execution.',
    requirements: [
      'Diploma / B.E. in Electrical Engineering',
      '2-5 years of experience in electrical installation',
      'Knowledge of HT/LT systems and solar inverters',
      'Willingness to travel to project sites',
      'Safety certification preferred',
    ],
  },
  {
    id: 5,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Pune (Hybrid)',
    type: 'Full Time',
    experience: '2-4 Years',
    description:
      'Plan and execute digital marketing campaigns to generate leads and build brand awareness for Sun Lit Tech in the renewable energy space.',
    requirements: [
      "Bachelor's degree in Marketing/Communications",
      '2-4 years of digital marketing experience',
      'Proficiency in Google Ads, Meta Ads, and SEO tools',
      'Experience with content creation and social media management',
      'Knowledge of renewable energy industry is a plus',
    ],
  },
];

export const departmentOptions = [
  'Engineering',
  'Project Management',
  'Sales & Marketing',
  'Marketing',
  'Operations',
  'Human Resources',
  'Finance',
];

export const typeOptions = ['Full Time', 'Part Time', 'Contract', 'Internship'];

export const experienceOptions = [
  '0-1 Years',
  '1-3 Years',
  '2-4 Years',
  '2-5 Years',
  '3-5 Years',
  '5-8 Years',
  '8-12 Years',
  '12+ Years',
];

export const getPositions = () => apiGet('/api/careers');

export const addPosition = (position) => apiSend('/api/careers', 'POST', position);

export const updatePosition = (id, updates) => apiSend('/api/careers', 'PUT', { id, updates });

export const removePosition = (id) => apiSend(`/api/careers?id=${id}`, 'DELETE');

export const resetPositions = () => apiSend('/api/careers', 'POST', { action: 'reset', items: defaultPositions });
