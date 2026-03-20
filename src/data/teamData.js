const STORAGE_KEY = 'sunlit_team_members';

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

export function getTeamMembers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTeamMembers));
  return [...defaultTeamMembers];
}

export function saveTeamMembers(members) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  return members;
}

export function addTeamMember(member) {
  const members = getTeamMembers();
  const newId = members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;
  const newMember = { id: newId, ...member };
  members.push(newMember);
  saveTeamMembers(members);
  return members;
}

export function removeTeamMember(id) {
  let members = getTeamMembers();
  members = members.filter((m) => m.id !== id);
  saveTeamMembers(members);
  return members;
}

export function updateTeamMember(id, updates) {
  const members = getTeamMembers();
  const index = members.findIndex((m) => m.id === id);
  if (index !== -1) {
    members[index] = { ...members[index], ...updates };
  }
  saveTeamMembers(members);
  return members;
}

export function resetTeamMembers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTeamMembers));
  return [...defaultTeamMembers];
}
