import { mockDoctors, mockDoctorSchedules, mockDoctorVacations } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

/** Get all active doctors */
export async function getDoctors() {
  // TODO: Replace with API call
  return mockDoctors.filter((d) => !d.is_deleted);
}

/** Get all doctors including soft-deleted rows */
export async function getAllDoctors() {
  // TODO: Replace with API call
  return [...mockDoctors];
}

/** Get a single doctor by ID */
export async function getDoctor(id) {
  // TODO: Replace with API call
  return mockDoctors.find((d) => d.id === id) || null;
}

/** Create a new doctor */
export async function createDoctor(data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), is_deleted: false, created_at: new Date().toISOString() };
  mockDoctors.push(newItem);
  return newItem;
}

/** Update a doctor */
export async function updateDoctor(id, data) {
  // TODO: Replace with API call
  const index = mockDoctors.findIndex((d) => d.id === id);
  if (index !== -1) {
    mockDoctors[index] = { ...mockDoctors[index], ...data };
    return mockDoctors[index];
  }
  return null;
}

/** Soft delete a doctor */
export async function softDeleteDoctor(id) {
  // TODO: Replace with API call
  return updateDoctor(id, { is_deleted: true });
}

/** Restore a soft-deleted doctor */
export async function restoreDoctor(id) {
  // TODO: Replace with API call
  return updateDoctor(id, { is_deleted: false });
}

/** Get doctor's schedule */
export async function getDoctorSchedule(doctorId) {
  // TODO: Replace with API call
  if (!doctorId) return null;
  return mockDoctorSchedules.find((s) => s.doctor_id === doctorId) || null;
}

/** Save doctor's schedule */
export async function saveDoctorSchedule(doctorId, data) {
  // TODO: Replace with API call
  const existing = mockDoctorSchedules.find((s) => s.doctor_id === doctorId);
  if (existing) {
    Object.assign(existing, data, { updated_at: new Date().toISOString() });
    return existing;
  }
  const newSched = { ...data, id: String(Date.now()), doctor_id: doctorId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  mockDoctorSchedules.push(newSched);
  return newSched;
}

/** Get doctor's vacations */
export async function getDoctorVacations(doctorId) {
  // TODO: Replace with API call
  if (!doctorId) return [];
  return mockDoctorVacations.filter((v) => v.doctor_id === doctorId);
}

/** Add a vacation for a doctor */
export async function addDoctorVacation(doctorId, data) {
  // TODO: Replace with API call
  const newItem = { ...data, id: String(Date.now()), doctor_id: doctorId, created_at: new Date().toISOString() };
  mockDoctorVacations.push(newItem);
  return newItem;
}

/** Remove a vacation */
export async function removeDoctorVacation(id) {
  // TODO: Replace with API call
  const index = mockDoctorVacations.findIndex((v) => v.id === id);
  if (index !== -1) {
    mockDoctorVacations.splice(index, 1);
    return true;
  }
  return false;
}
