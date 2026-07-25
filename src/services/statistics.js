import { mockStatistics } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

export async function getStatistics() {
  // TODO: Replace with API call
  return [...mockStatistics];
}

export async function createStatistic(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), created_at: new Date().toISOString() };
  mockStatistics.push(newItem);
  return newItem;
}

export async function updateStatistic(id, data) {
  // TODO: Replace with API call
  const index = mockStatistics.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStatistics[index] = { ...mockStatistics[index], ...data };
    return mockStatistics[index];
  }
  return null;
}

export async function deleteStatistic(id) {
  // TODO: Replace with API call
  const index = mockStatistics.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStatistics.splice(index, 1);
    return true;
  }
  return false;
}
