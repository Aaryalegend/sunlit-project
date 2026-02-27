const AUTH_KEY = 'sunlit_admin_auth';
const CREDENTIALS_KEY = 'sunlit_admin_credentials';

const defaultCredentials = {
  username: 'admin',
  password: 'sunlit2025',
};

export function getCredentials() {
  try {
    const stored = localStorage.getItem(CREDENTIALS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return { ...defaultCredentials };
}

export function updateCredentials(newUsername, newPassword) {
  const creds = { username: newUsername, password: newPassword };
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(creds));
  return creds;
}

export function login(username, password) {
  const creds = getCredentials();
  if (username === creds.username && password === creds.password) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ loggedIn: true, time: Date.now() }));
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  try {
    const stored = sessionStorage.getItem(AUTH_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      return data.loggedIn === true;
    }
  } catch {
    // ignore
  }
  return false;
}
