import { mockContactMessages } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

export async function getContactMessages() {
  // TODO: Replace with API call
  return [...mockContactMessages];
}

export async function createContactMessage(data) {
  // TODO: Replace with: return API.post('/contact', data).then(res => res.data);
  const newItem = { ...data, id: String(Date.now()), created_at: new Date().toISOString() };
  mockContactMessages.unshift(newItem);
  return newItem;
}

export async function deleteContactMessage(id) {
  // TODO: Replace with API call
  const index = mockContactMessages.findIndex((m) => m.id === id);
  if (index !== -1) {
    mockContactMessages.splice(index, 1);
    return true;
  }
  return false;
}
