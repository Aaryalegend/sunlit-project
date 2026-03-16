const handleJsonResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return response.json();
};

export const apiGet = async (path) => {
  const response = await fetch(path, { method: 'GET' });
  return handleJsonResponse(response);
};

export const apiSend = async (path, method, body) => {
  const response = await fetch(path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleJsonResponse(response);
};
