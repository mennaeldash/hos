import { mockPartners } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

export async function getPartners() {
  // TODO: Replace with API call
  return [...mockPartners];
}

export async function createPartner(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), created_at: new Date().toISOString() };
  mockPartners.push(newItem);
  return newItem;
}

export async function updatePartner(id, data) {
  // TODO: Replace with API call
  const index = mockPartners.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockPartners[index] = { ...mockPartners[index], ...data };
    return mockPartners[index];
  }
  return null;
}

export async function deletePartner(id) {
  // TODO: Replace with API call
  const index = mockPartners.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockPartners.splice(index, 1);
    return true;
  }
  return false;
}
