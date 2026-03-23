import { apiGet, apiSend } from './apiClient';

const defaultTeamMembers = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Founder & CEO',
    image: null,
  },
  {
    id: 2,
    name: 'Nisha Kulkarni',
    role: 'Chief Operating Officer',
    image: null,
  },
  {
    id: 3,
    name: 'Rohan Patil',
    role: 'Head of Engineering',
    image: null,
  },
  {
    id: 4,
    name: 'Sneha Joshi',
    role: 'Project Delivery Lead',
    image: null,
  },
  {
    id: 5,
    name: 'Kabir Deshmukh',
    role: 'Sales Director',
    image: null,
  },
  {
    id: 6,
    name: 'Ananya Rao',
    role: 'Marketing Lead',
    image: null,
  },
];

export const getTeamMembers = () => apiGet('/api/team');

export const addTeamMember = (member) => apiSend('/api/team', 'POST', member);

export const removeTeamMember = (id) => apiSend(`/api/team?id=${id}`, 'DELETE');

export const updateTeamMember = (id, updates) => apiSend('/api/team', 'PUT', { id, updates });

export const resetTeamMembers = () => apiSend('/api/team', 'POST', { action: 'reset', items: defaultTeamMembers });
