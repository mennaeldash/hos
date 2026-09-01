import {
  useEffect,
  useState,
} from "react";

import {
  getDepartments,
} from "@/services/departments";

import {
  getDoctors,
  getDoctorSchedule,
} from "@/services/doctors";

import {
  getStaff,
} from "@/services/staff";

import {
  getEquipment,
} from "@/services/equipment";

import {
  getPartners,
} from "@/services/partners";

import {
  getStatistics,
} from "@/services/statistics";

import {
  getAppointments,
} from "@/services/appointments";

import {
  getPatients,
} from "@/services/patients";

import {
  getContactMessages,
} from "@/services/contact";

import {
  getNotifications,
} from "@/services/notifications";

import {
  getSiteContent,
  getAllSiteContent,
} from "@/services/content";

import {
  mockTestimonials,
} from "@/services/mockData";

/* =========================================================
   GENERIC SERVICE FETCH HOOK
========================================================= */

function useServiceFetch(
  fetchFn,
  filterFn = null
) {
  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const refetch = async () => {
    setLoading(true);

    try {
      const rows =
        await fetchFn();

      const safeRows =
        Array.isArray(rows)
          ? rows
          : [];

      setData(
        filterFn
          ? safeRows.filter(
              filterFn
            )
          : safeRows
      );

      setError(null);
    } catch (err) {
      console.error(
        "SERVICE FETCH ERROR:",
        err
      );

      setData([]);

      setError(
        err?.message ||
          "حدث خطأ أثناء تحميل البيانات"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

/* =========================================================
   DEPARTMENTS
========================================================= */

export const useDepartments =
  () =>
    useServiceFetch(
      getDepartments
    );

/* =========================================================
   DOCTORS
========================================================= */

export const useDoctors =
  () =>
    useServiceFetch(
      getDoctors
    );

/* =========================================================
   DOCTOR SCHEDULE

   بنستخدمه فقط لعرض أيام عمل الدكتور.

   حاليًا المصدر:
   mockDoctorSchedules

   من خلال:
   getDoctorSchedule()
========================================================= */

export function useDoctorSchedule(
  doctorId
) {
  const [
    schedule,
    setSchedule,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState(null);

  const refetch = async () => {
    if (
      doctorId === null ||
      doctorId === undefined ||
      doctorId === ""
    ) {
      setSchedule(null);
      setLoading(false);
      setError(null);

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data =
        await getDoctorSchedule(
          doctorId
        );

      setSchedule(
        data || null
      );
    } catch (err) {
      console.error(
        "GET DOCTOR SCHEDULE ERROR:",
        err
      );

      setSchedule(null);

      setError(
        err?.message ||
          "حدث خطأ أثناء تحميل أيام العمل"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, [doctorId]);

  return {
    schedule,
    loading,
    error,
    refetch,
  };
}

/* =========================================================
   STAFF
========================================================= */

export const useStaff =
  () =>
    useServiceFetch(
      getStaff
    );

/* =========================================================
   EQUIPMENT
========================================================= */

export const useEquipment =
  () =>
    useServiceFetch(
      getEquipment
    );

/* =========================================================
   PARTNERS
========================================================= */

export const usePartners =
  () =>
    useServiceFetch(
      getPartners
    );

/* =========================================================
   STATISTICS
========================================================= */

export const useStatistics =
  () =>
    useServiceFetch(
      getStatistics
    );

/* =========================================================
   APPOINTMENTS
========================================================= */

export const useAppointments =
  () =>
    useServiceFetch(
      getAppointments
    );

/* =========================================================
   PATIENTS
========================================================= */

export const usePatients =
  () =>
    useServiceFetch(
      getPatients
    );

/* =========================================================
   CONTACT MESSAGES
========================================================= */

export const useContactMessages =
  () =>
    useServiceFetch(
      getContactMessages
    );

/* =========================================================
   NOTIFICATIONS
========================================================= */

export const useNotifications =
  () =>
    useServiceFetch(
      getNotifications
    );

/* =========================================================
   TESTIMONIALS
========================================================= */

export const useTestimonials =
  () => {
    const [data] =
      useState(
        mockTestimonials
      );

    const [loading] =
      useState(false);

    return {
      data,
      loading,
      error: null,
      refetch: () => {},
    };
  };

/* =========================================================
   SITE CONTENT
========================================================= */

export function useSiteContent(
  section
) {
  const [
    content,
    setContent,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  useEffect(() => {
    const loadContent =
      async () => {
        setLoading(true);
        setError(null);

        try {
          const data =
            await getSiteContent(
              section
            );

          setContent(data);
        } catch (err) {
          console.error(
            "GET SITE CONTENT ERROR:",
            err
          );

          setContent(null);

          setError(
            err?.message ||
              "حدث خطأ أثناء تحميل المحتوى"
          );
        } finally {
          setLoading(false);
        }
      };

    loadContent();
  }, [section]);

  return {
    content,
    loading,
    error,
    setContent,
  };
}

/* =========================================================
   ALL SITE CONTENT
========================================================= */

export const useAllSiteContent =
  () => {
    const [
      content,
      setContent,
    ] = useState([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      error,
      setError,
    ] = useState(null);

    const refetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const data =
          await getAllSiteContent();

        setContent(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "GET ALL SITE CONTENT ERROR:",
          err
        );

        setContent([]);

        setError(
          err?.message ||
            "حدث خطأ أثناء تحميل المحتوى"
        );
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      refetch();
    }, []);

    return {
      content,
      loading,
      error,
      refetch,
    };
  };