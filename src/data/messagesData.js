import { apiGet, apiSend } from './apiClient';

const API_PATH = '/api/messages';

export async function getMessages() {
  try {
    return await apiGet(API_PATH);
  } catch {
    return [];
  }
}

export async function addMessage(message) {
  return await apiSend(API_PATH, 'POST', { item: message });
}

export async function updateMessageStatus(id, status) {
  return await apiSend(API_PATH, 'PUT', { id, updates: { status } });
}

export async function removeMessage(id) {
  return await apiSend(`${API_PATH}?id=${id}`, 'DELETE');
}

export async function clearAllMessages() {
  return await apiSend(`${API_PATH}?action=clear`, 'POST');
}

export const statusOptions = ['unread', 'read', 'replied', 'archived'];
