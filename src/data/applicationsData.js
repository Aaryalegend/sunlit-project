const STORAGE_KEY = 'sunlit_applications';

export function getApplications() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveApplications(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  return apps;
}

export function addApplication(application) {
  const apps = getApplications();
  const newId = apps.length > 0 ? Math.max(...apps.map((a) => a.id)) + 1 : 1;
  const newApp = {
    id: newId,
    ...application,
    status: 'new',
    submittedAt: new Date().toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  apps.unshift(newApp);
  saveApplications(apps);
  return apps;
}

export function updateApplicationStatus(id, status) {
  const apps = getApplications();
  const index = apps.findIndex((a) => a.id === id);
  if (index !== -1) {
    apps[index].status = status;
  }
  saveApplications(apps);
  return apps;
}

export function removeApplication(id) {
  let apps = getApplications();
  apps = apps.filter((a) => a.id !== id);
  saveApplications(apps);
  return apps;
}

export function clearAllApplications() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}

export const statusOptions = ['new', 'reviewed', 'shortlisted', 'rejected'];
