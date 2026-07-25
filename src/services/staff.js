import { mockStaff } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

export async function getStaff() {
  // TODO: Replace with API call
  return [...mockStaff];
}

export async function getStaffMember(id) {
  // TODO: Replace with API call
  return mockStaff.find((s) => s.id === id) || null;
}

export async function createStaff(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), created_at: new Date().toISOString() };
  mockStaff.push(newItem);
  return newItem;
}

export async function updateStaff(id, data) {
  // TODO: Replace with API call
  const index = mockStaff.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStaff[index] = { ...mockStaff[index], ...data };
    return mockStaff[index];
  }
  return null;
}

export async function deleteStaff(id) {
  // TODO: Replace with API call
  const index = mockStaff.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStaff.splice(index, 1);
    return true;
  }
  return false;
}
