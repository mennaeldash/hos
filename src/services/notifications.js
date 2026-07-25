import { mockNotifications } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

export async function getNotifications() {
  // TODO: Replace with API call
  return [...mockNotifications];
}

export async function markNotificationRead(id) {
  // TODO: Replace with API call
  const notif = mockNotifications.find((n) => n.id === id);
  if (notif) notif.is_read = true;
  return notif;
}

export async function markAllNotificationsRead() {
  // TODO: Replace with API call
  mockNotifications.forEach((n) => { n.is_read = true; });
  return true;
}

export async function deleteNotification(id) {
  // TODO: Replace with API call
  const index = mockNotifications.findIndex((n) => n.id === id);
  if (index !== -1) {
    mockNotifications.splice(index, 1);
    return true;
  }
  return false;
}

export async function createNotification(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), is_read: false, created_at: new Date().toISOString() };
  mockNotifications.unshift(newItem);
  return newItem;
}
