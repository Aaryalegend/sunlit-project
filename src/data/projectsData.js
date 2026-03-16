import { apiGet, apiSend } from './apiClient';

const defaultProjects = [
  {
    id: 1,
    title: 'Residential Solar Installation',
    category: 'Residential',
    capacity: '10 kW',
    location: 'Pune, Maharashtra',
    description: 'Complete rooftop solar installation for a residential villa with net metering setup.',
    image: null,
    stats: { savings: '₹15,000/month', co2: '12 tons/year' },
  },
  {
    id: 2,
    title: 'Commercial Complex Solar',
    category: 'Commercial',
    capacity: '100 kW',
    location: 'Mumbai, Maharashtra',
    description: 'Large-scale solar panel installation for a commercial building with battery backup.',
    image: null,
    stats: { savings: '₹1,50,000/month', co2: '120 tons/year' },
  },
  {
    id: 3,
    title: 'Industrial Solar Plant',
    category: 'Industrial',
    capacity: '500 kW',
    location: 'Nagpur, Maharashtra',
    description: 'Ground-mounted solar power plant for industrial manufacturing unit.',
    image: null,
    stats: { savings: '₹7,00,000/month', co2: '600 tons/year' },
  },
  {
    id: 4,
    title: 'Government School Solar',
    category: 'Government',
    capacity: '25 kW',
    location: 'Satara, Maharashtra',
    description: 'Solar installation for government school campus under PM Solar Scheme.',
    image: null,
    stats: { savings: '₹30,000/month', co2: '30 tons/year' },
  },
  {
    id: 5,
    title: 'Housing Society Solar',
    category: 'Residential',
    capacity: '50 kW',
    location: 'Hadapsar, Pune',
    description: 'Rooftop solar for a housing society with shared net metering for all residents.',
    image: null,
    stats: { savings: '₹60,000/month', co2: '60 tons/year' },
  },
  {
    id: 6,
    title: 'Warehouse Solar Setup',
    category: 'Commercial',
    capacity: '200 kW',
    location: 'Pimpri-Chinchwad, Pune',
    description: 'Solar installation across multiple warehouse rooftops in industrial zone.',
    image: null,
    stats: { savings: '₹3,00,000/month', co2: '240 tons/year' },
  },
  {
    id: 7,
    title: 'Factory Solar Plant',
    category: 'Industrial',
    capacity: '1 MW',
    location: 'Chakan, Pune',
    description: 'Megawatt-scale ground-mounted solar plant for automotive factory.',
    image: null,
    stats: { savings: '₹14,00,000/month', co2: '1200 tons/year' },
  },
  {
    id: 8,
    title: 'Municipal Building Solar',
    category: 'Government',
    capacity: '75 kW',
    location: 'Solapur, Maharashtra',
    description: 'Solar power system for municipal corporation building with battery storage.',
    image: null,
    stats: { savings: '₹90,000/month', co2: '90 tons/year' },
  },
  {
    id: 9,
    title: 'Farmhouse Solar System',
    category: 'Residential',
    capacity: '15 kW',
    location: 'Lonavala, Maharashtra',
    description: 'Off-grid solar solution for farmhouse with complete battery backup system.',
    image: null,
    stats: { savings: '₹20,000/month', co2: '18 tons/year' },
  },
];

export const categoryOptions = ['Residential', 'Commercial', 'Industrial', 'Government'];

export const capacityOptions = [
  '5 kW',
  '10 kW',
  '15 kW',
  '25 kW',
  '50 kW',
  '75 kW',
  '100 kW',
  '200 kW',
  '500 kW',
  '1 MW',
  '2 MW',
  '5 MW',
];

export async function getProjects() {
  try {
    const projects = await apiGet('/api/projects');
    if (Array.isArray(projects) && projects.length === 0) {
      return await resetProjects();
    }
    return Array.isArray(projects) ? projects : [];
  } catch (e) {
    console.error('Failed to load projects:', e);
    return [...defaultProjects];
  }
}

export async function addProject(project) {
  try {
    return await apiSend('/api/projects', 'POST', { project });
  } catch (e) {
    console.error('Failed to add project:', e);
    return await getProjects();
  }
}

export async function removeProject(id) {
  try {
    return await apiSend(`/api/projects?id=${id}`, 'DELETE', {});
  } catch (e) {
    console.error('Failed to remove project:', e);
    return await getProjects();
  }
}

export async function updateProject(id, updates) {
  try {
    return await apiSend('/api/projects', 'PUT', { id, updates });
  } catch (e) {
    console.error('Failed to update project:', e);
    return await getProjects();
  }
}

export async function resetProjects() {
  try {
    return await apiSend('/api/projects', 'POST', { action: 'reset', items: defaultProjects });
  } catch (e) {
    console.error('Failed to reset projects:', e);
    return [...defaultProjects];
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
