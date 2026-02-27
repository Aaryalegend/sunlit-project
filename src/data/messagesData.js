const STORAGE_KEY = 'sunlit_contact_messages';

export function getMessages() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

function saveMessages(msgs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  return msgs;
}

export function addMessage(message) {
  const msgs = getMessages();
  const newId = msgs.length > 0 ? Math.max(...msgs.map((m) => m.id)) + 1 : 1;
  const newMsg = {
    id: newId,
    ...message,
    status: 'unread',
    submittedAt: new Date().toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
  msgs.unshift(newMsg);
  saveMessages(msgs);
  return msgs;
}

export function updateMessageStatus(id, status) {
  const msgs = getMessages();
  const index = msgs.findIndex((m) => m.id === id);
  if (index !== -1) {
    msgs[index].status = status;
  }
  saveMessages(msgs);
  return msgs;
}

export function removeMessage(id) {
  let msgs = getMessages();
  msgs = msgs.filter((m) => m.id !== id);
  saveMessages(msgs);
  return msgs;
}

export function clearAllMessages() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  return [];
}

export const statusOptions = ['unread', 'read', 'replied', 'archived'];
