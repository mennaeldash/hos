export const WEEK_DAYS = [
  { key: 'saturday', label: 'السبت' },
  { key: 'sunday', label: 'الأحد' },
  { key: 'monday', label: 'الإثنين' },
  { key: 'tuesday', label: 'الثلاثاء' },
  { key: 'wednesday', label: 'الأربعاء' },
  { key: 'thursday', label: 'الخميس' },
  { key: 'friday', label: 'الجمعة' },
];

export const SLOT_DURATIONS = [
  { value: 15, label: '15 دقيقة' },
  { value: 20, label: '20 دقيقة' },
  { value: 30, label: '30 دقيقة' },
  { value: 45, label: '45 دقيقة' },
  { value: 60, label: '60 دقيقة' },
];

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function generateSlots(schedule) {
  const slots = [];
  const duration = schedule.slot_duration;

  for (let t = start; t + duration <= end; t += duration) {
    slots.push(minutesToTime(t));
  }
  return slots;
}

export function getDayKey(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const jsDay = date.getDay();
  const map = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday',
  };
  return map[jsDay];
}

export function isWorkingDay(dateStr, schedule) {
  if (!schedule || !schedule.working_days || schedule.working_days.length === 0) return false;
  const dayKey = getDayKey(dateStr);
  return schedule.working_days.includes(dayKey);
}

export function isVacation(dateStr, vacations) {
  return vacations.some((v) => v.vacation_date === dateStr);
}

export function isPastDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateStr + 'T00:00:00');
  return date < today;
}

export function isDoctorActive(doctor) {
  return doctor.status === 'active' && !doctor.is_deleted;
}

export async function getBookedSlots(doctorId, dateStr) {
  // TODO: Replace with backend API call
  const { getAppointments } = await import('@/services/appointments');
  const allApts = await getAppointments();
  return allApts
    .filter((a) => a.doctor_id === doctorId && a.appointment_date === dateStr && a.status !== 'cancelled')
    .map((a) => a.appointment_time)
    .filter(Boolean);
}

export async function getAvailableSlots(doctorId, dateStr, schedule, vacations) {
  if (!schedule) return [];
  if (!isWorkingDay(dateStr, schedule)) return [];
  if (isVacation(dateStr, vacations)) return [];
  if (isPastDate(dateStr)) return [];

  const allSlots = generateSlots(schedule);
  const bookedSlots = await getBookedSlots(doctorId, dateStr);

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return allSlots.filter((slot) => {
    if (bookedSlots.includes(slot)) return false;
    if (dateStr === todayStr) {
      const slotMinutes = timeToMinutes(slot);
      if (slotMinutes <= currentMinutes) return false;
    }
    return true;
  });
}

export async function getAvailableDates(doctorId, schedule, vacations, daysAhead = 30) {
  if (!schedule || !isWorkingDay) return [];
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    if (!isWorkingDay(dateStr, schedule)) continue;
    if (isVacation(dateStr, vacations)) continue;

    const slots = await getAvailableSlots(doctorId, dateStr, schedule, vacations);
    if (slots.length > 0) {
      dates.push(dateStr);
    }
  }

  return dates;
}

export function validateBooking(doctor, dateStr, timeSlot, schedule, vacations) {
  if (!isDoctorActive(doctor)) return 'الطبيب غير متاح حالياً';
  if (!schedule) return 'لا يوجد جدول عمل لهذا الطبيب';
  if (isPastDate(dateStr)) return 'لا يمكن الحجز في تاريخ مضى';
  if (!isWorkingDay(dateStr, schedule)) return 'هذا اليوم ليس من أيام عمل الطبيب';
  if (isVacation(dateStr, vacations)) return 'الطبيب في إجازة في هذا التاريخ';
  if (!generateSlots(schedule).includes(timeSlot)) return 'هذا الموعد خارج ساعات العمل';
  return null;
}

