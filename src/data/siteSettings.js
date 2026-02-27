const SETTINGS_KEY = 'sunlit_site_settings';

const defaultSettings = {
  companyName: 'Sun Lit Tech',
  tagline: 'Powering a Sustainable Future with Solar Energy',
  phone: '+91 98765 43210',
  email: 'info@sunlittech.com',
  address: 'Pune, Maharashtra, India',
  socialLinks: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    twitter: '#',
  },
  heroStats: {
    projects: '200+',
    capacity: '5MW+',
    cities: '15+',
    satisfaction: '98%',
  },
};

export function getSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  return { ...defaultSettings };
}

export function updateSettings(updates) {
  const current = getSettings();
  const updated = { ...current, ...updates };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  return updated;
}

export function resetSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  return { ...defaultSettings };
}
