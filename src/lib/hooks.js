import { useEffect, useState } from 'react';
import { getDepartments } from '@/services/departments';
import { getDoctors, getDoctorSchedule, getDoctorVacations } from '@/services/doctors';
import { getStaff } from '@/services/staff';
import { getEquipment } from '@/services/equipment';
import { getPartners } from '@/services/partners';
import { getStatistics } from '@/services/statistics';
import { getAppointments } from '@/services/appointments';
import { getPatients } from '@/services/patients';
import { getContactMessages } from '@/services/contact';
import { getNotifications } from '@/services/notifications';
import { getSiteContent, getAllSiteContent } from '@/services/content';
import { mockTestimonials } from '@/services/mockData';

// Helper to create a reusable fetch hook
function useServiceFetch(fetchFn, filterFn = null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    try {
      const rows = await fetchFn();
      setData(filterFn ? rows.filter(filterFn) : rows);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, loading, error, refetch };
}

export const useDepartments = () => useServiceFetch(getDepartments);
export const useDoctors = () => useServiceFetch(getDoctors);
export const useStaff = () => useServiceFetch(getStaff);
export const useEquipment = () => useServiceFetch(getEquipment);
export const usePartners = () => useServiceFetch(getPartners);
export const useStatistics = () => useServiceFetch(getStatistics);
export const useAppointments = () => useServiceFetch(getAppointments);
export const useContactMessages = () => useServiceFetch(getContactMessages);
export const usePatients = () => useServiceFetch(getPatients);
export const useNotifications = () => useServiceFetch(getNotifications);

// Testimonials come from mock data directly
export const useTestimonials = () => {
  const [data] = useState(mockTestimonials);
  const [loading] = useState(false);
  return { data, loading, refetch: () => {} };
};

export function useSiteContent(section) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSiteContent(section);
        setContent(data);
      } catch {
        setContent(null);
      }
      setLoading(false);
    })();
  }, [section]);

  return { content, loading, setContent: (c) => setContent(c) };
}

export const useAllSiteContent = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    setLoading(true);
    try {
      const data = await getAllSiteContent();
      setContent(data);
    } catch {
      setContent([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, []);

  return { content, loading, refetch };
}

export function useDoctorSchedule(doctorId) {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!doctorId) { setSchedule(null); setLoading(false); return; }
    setLoading(true);
    try {
      const data = await getDoctorSchedule(doctorId);
      setSchedule(data);
    } catch {
      setSchedule(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, [doctorId]);

  return { schedule, loading, refetch };
}

export function useDoctorVacations(doctorId) {
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!doctorId) { setVacations([]); setLoading(false); return; }
    setLoading(true);
    try {
      const data = await getDoctorVacations(doctorId);
      setVacations(data);
    } catch {
      setVacations([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    refetch();
  }, [doctorId]);

  return { vacations, loading, refetch };
}

