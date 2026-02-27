// Default gallery items used as initial seed data
const defaultGalleryItems = [
  { id: 1, category: 'Installations', title: 'Residential Rooftop - Pune', description: '10 kW rooftop solar installation', gradient: 'from-blue-400 to-blue-700', image: null },
  { id: 2, category: 'Installations', title: 'Commercial Solar - Mumbai', description: '100 kW commercial installation', gradient: 'from-cyan-400 to-blue-600', image: null },
  { id: 3, category: 'Team', title: 'Team at Work', description: 'Our engineers during installation', gradient: 'from-green-400 to-green-700', image: null },
  { id: 4, category: 'Events', title: 'Solar Expo 2024', description: 'Sun Lit Tech at the annual solar expo', gradient: 'from-yellow-400 to-orange-600', image: null },
  { id: 5, category: 'Installations', title: 'Ground-Mounted Solar - Nagpur', description: '500 kW ground-mounted system', gradient: 'from-blue-500 to-indigo-700', image: null },
  { id: 6, category: 'Before & After', title: 'Factory Roof Transformation', description: 'Before and after solar installation', gradient: 'from-gray-400 to-gray-700', image: null },
  { id: 7, category: 'Team', title: 'Team Celebration', description: '200th project completion celebration', gradient: 'from-purple-400 to-purple-700', image: null },
  { id: 8, category: 'Installations', title: 'Industrial Plant - Chakan', description: '1 MW industrial solar plant', gradient: 'from-teal-400 to-teal-700', image: null },
  { id: 9, category: 'Events', title: 'CSR Activity', description: 'Solar panel donation to school', gradient: 'from-pink-400 to-red-600', image: null },
  { id: 10, category: 'Before & After', title: 'Warehouse Rooftop', description: 'Rooftop solar transformation', gradient: 'from-slate-400 to-slate-700', image: null },
  { id: 11, category: 'Installations', title: 'Housing Society - Hadapsar', description: '50 kW shared solar system', gradient: 'from-sky-400 to-sky-700', image: null },
  { id: 12, category: 'Team', title: 'Technical Training', description: 'Annual team training program', gradient: 'from-emerald-400 to-emerald-700', image: null },
];

const STORAGE_KEY = 'sunlit_gallery_items';

// Available gradient options for the admin to pick from
export const gradientOptions = [
  { label: 'Blue', value: 'from-blue-400 to-blue-700' },
  { label: 'Cyan Blue', value: 'from-cyan-400 to-blue-600' },
  { label: 'Green', value: 'from-green-400 to-green-700' },
  { label: 'Yellow Orange', value: 'from-yellow-400 to-orange-600' },
  { label: 'Indigo', value: 'from-blue-500 to-indigo-700' },
  { label: 'Gray', value: 'from-gray-400 to-gray-700' },
  { label: 'Purple', value: 'from-purple-400 to-purple-700' },
  { label: 'Teal', value: 'from-teal-400 to-teal-700' },
  { label: 'Pink Red', value: 'from-pink-400 to-red-600' },
  { label: 'Slate', value: 'from-slate-400 to-slate-700' },
  { label: 'Sky', value: 'from-sky-400 to-sky-700' },
  { label: 'Emerald', value: 'from-emerald-400 to-emerald-700' },
  { label: 'Amber', value: 'from-amber-400 to-amber-700' },
  { label: 'Rose', value: 'from-rose-400 to-rose-700' },
];

export const categoryOptions = ['Installations', 'Team', 'Events', 'Before & After'];

/** Load gallery items from localStorage, falling back to defaults */
export const getGalleryItems = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load gallery items:', e);
  }
  return defaultGalleryItems;
};

/** Save gallery items to localStorage */
export const saveGalleryItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save gallery items:', e);
  }
};

/** Add a new gallery item */
export const addGalleryItem = (item) => {
  const items = getGalleryItems();
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { ...item, id: newId };
  const updated = [...items, newItem];
  saveGalleryItems(updated);
  return updated;
};

/** Remove a gallery item by id */
export const removeGalleryItem = (id) => {
  const items = getGalleryItems();
  const updated = items.filter(item => item.id !== id);
  saveGalleryItems(updated);
  return updated;
};

/** Update a gallery item */
export const updateGalleryItem = (id, updatedFields) => {
  const items = getGalleryItems();
  const updated = items.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveGalleryItems(updated);
  return updated;
};

/** Reset gallery to defaults */
export const resetGalleryItems = () => {
  saveGalleryItems(defaultGalleryItems);
  return defaultGalleryItems;
};

/** Convert an image File to a base64 data URL */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
