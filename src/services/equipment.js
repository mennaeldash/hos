import { mockEquipment } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

export async function getEquipment() {
  // TODO: Replace with API call
  return [...mockEquipment];
}

export async function getEquipmentItem(id) {
  // TODO: Replace with API call
  return mockEquipment.find((e) => e.id === id) || null;
}

export async function createEquipment(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), created_at: new Date().toISOString() };
  mockEquipment.push(newItem);
  return newItem;
}

export async function updateEquipment(id, data) {
  // TODO: Replace with API call
  const index = mockEquipment.findIndex((e) => e.id === id);
  if (index !== -1) {
    mockEquipment[index] = { ...mockEquipment[index], ...data };
    return mockEquipment[index];
  }
  return null;
}

export async function deleteEquipment(id) {
  // TODO: Replace with API call
  const index = mockEquipment.findIndex((e) => e.id === id);
  if (index !== -1) {
    mockEquipment.splice(index, 1);
    return true;
  }
  return false;
}
