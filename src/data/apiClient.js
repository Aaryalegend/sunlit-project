const handleJsonResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return response.json();
};

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';

const buildUrl = (path) => {
  if (!API_BASE) return path;
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

export const apiGet = async (path) => {
  const response = await fetch(buildUrl(path), { method: 'GET' });
  return handleJsonResponse(response);
};

export const apiSend = async (path, method, body) => {
  const response = await fetch(buildUrl(path), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleJsonResponse(response);
};
