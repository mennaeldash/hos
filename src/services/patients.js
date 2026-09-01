import { mockPatients } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

/** Get all patients */
export async function getPatients() {
  // TODO: Replace with API call
  return [...mockPatients];
}

/** Create a new patient */
export async function createPatient(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: 'p' + Date.now(), created_at: new Date().toISOString() };
  mockPatients.push(newItem);
  return newItem;
}

/** Update a patient */
export async function updatePatient(id, data) {
  // TODO: Replace with API call
  const index = mockPatients.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockPatients[index] = { ...mockPatients[index], ...data };
    return mockPatients[index];
  }
  return null;
}

/** Delete a patient */
export async function deletePatient(id) {
  // TODO: Replace with API call
  const index = mockPatients.findIndex((p) => p.id === id);
  if (index !== -1) {
    mockPatients.splice(index, 1);
    return true;
  }
  return false;
}
