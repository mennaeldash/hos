import { mockDepartments } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

/** Get all departments */
export async function getDepartments() {
  // TODO: Replace with: return API.get('/departments').then(res => res.data);
  return [...mockDepartments];
}

/** Get a single department by ID */
export async function getDepartment(id) {
  // TODO: Replace with API call
  return mockDepartments.find((d) => d.id === id) || null;
}

/** Create a new department */
export async function createDepartment(data) {
  // TODO: Replace with: return API.post('/departments', data).then(res => res.data);
  const newItem = { ...data, id: String(Date.now()), created_at: new Date().toISOString() };
  mockDepartments.push(newItem);
  return newItem;
}

/** Update a department */
export async function updateDepartment(id, data) {
  // TODO: Replace with: return API.put(`/departments/${id}`, data).then(res => res.data);
  const index = mockDepartments.findIndex((d) => d.id === id);
  if (index !== -1) {
    mockDepartments[index] = { ...mockDepartments[index], ...data };
    return mockDepartments[index];
  }
  return null;
}

/** Delete a department */
export async function deleteDepartment(id) {
  // TODO: Replace with: return API.delete(`/departments/${id}`).then(res => res.data);
  const index = mockDepartments.findIndex((d) => d.id === id);
  if (index !== -1) {
    mockDepartments.splice(index, 1);
    return true;
  }
  return false;
}
