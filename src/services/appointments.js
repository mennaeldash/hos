import { mockAppointments, mockNotifications } from './mockData';

// TODO: Connect to backend API later
// import API from './api';

/** Get all appointments */
export async function getAppointments() {
  // TODO: Replace with: return API.get('/appointments').then(res => res.data);
  return [...mockAppointments];
}

/** Create a new appointment */
export async function createAppointment(data) {
  // TODO: Replace with: return API.post('/appointments', data).then(res => res.data);
  const newItem = { ...data, id: String(Date.now()), status: 'pending', created_at: new Date().toISOString() };
  mockAppointments.push(newItem);
  // Create notification
  mockNotifications.unshift({
    id: String(Date.now()) + '_notif',
    type: 'appointment',
    title: 'موعد جديد',
    message: `حجز جديد: ${data.full_name} مع ${data.doctor}`,
    appointment_id: newItem.id,
    is_read: false,
    created_at: new Date().toISOString(),
  });
  return newItem;
}

/** Update an appointment */
export async function updateAppointment(id, data) {
  // TODO: Replace with API call
  const index = mockAppointments.findIndex((a) => a.id === id);
  if (index !== -1) {
    mockAppointments[index] = { ...mockAppointments[index], ...data };
    return mockAppointments[index];
  }
  return null;
}

/** Update appointment status */
export async function updateAppointmentStatus(id, status) {
  // TODO: Replace with API call
  return updateAppointment(id, { status });
}

/** Delete an appointment */
export async function deleteAppointment(id) {
  // TODO: Replace with: return API.delete(`/appointments/${id}`).then(res => res.data);
  const index = mockAppointments.findIndex((a) => a.id === id);
  if (index !== -1) {
    mockAppointments.splice(index, 1);
    return true;
  }
  return false;
}

/** Get appointments for a specific patient */
export async function getAppointmentsByPatient(patientId) {
  // TODO: Replace with API call
  return mockAppointments.filter((a) => a.patient_id === patientId);
}

/** Check if a time slot is booked */
export async function isSlotBooked(doctorId, dateStr, time) {
  // TODO: Replace with API call
  return mockAppointments.some(
    (a) => a.doctor_id === doctorId && a.appointment_date === dateStr && a.appointment_time === time && a.status !== 'cancelled'
  );
}
