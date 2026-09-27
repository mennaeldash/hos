import api from "./api";

const HOME_APPOINTMENTS_ENDPOINT =
  "/api/HomeAppointments";

/* =========================================================
   SERVICE TYPE LABELS
========================================================= */

export const HOME_SERVICE_LABELS = {
  HomeExamination: "كشف منزلي",
  CaseFollowUp: "متابعة حالة",
  EmergencyHomeService: "خدمة طوارئ منزلية",
  HomeXRay: "أشعة منزلية",
};

/* =========================================================
   NORMALIZE SERVICE TYPE
========================================================= */

function normalizeServiceType(data) {
  if (!data) {
    return null;
  }

  const id =
    data.id ??
    data.Id ??
    null;

  const name =
    data.name ??
    data.Name ??
    "";

  return {
    id,
    name,

    label:
      HOME_SERVICE_LABELS[name] ||
      name,
  };
}

/* =========================================================
   GET SERVICE TYPES

   GET /api/HomeAppointments/service-types
========================================================= */

export async function getHomeServiceTypes() {
  try {
    const response =
      await api.get(
        `${HOME_APPOINTMENTS_ENDPOINT}/service-types`
      );

    console.log(
      "GET HOME SERVICE TYPES RESPONSE:",
      response.data
    );

    const rawData =
      Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.data ??
          response.data?.Data ??
          [];

    if (
      !Array.isArray(
        rawData
      )
    ) {
      return [];
    }

    return rawData
      .map(
        normalizeServiceType
      )
      .filter(Boolean);
  } catch (error) {
    console.error(
      "GET HOME SERVICE TYPES ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   CREATE HOME APPOINTMENT
========================================================= */

export async function createHomeAppointment(
  payload
) {
  try {
    const response =
      await api.post(
        HOME_APPOINTMENTS_ENDPOINT,
        payload
      );

    console.log(
      "CREATE HOME APPOINTMENT RESPONSE:",
      response.data
    );

    return (
      response.data?.data ??
      response.data?.Data ??
      response.data
    );
  } catch (error) {
    console.error(
      "CREATE HOME APPOINTMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   GET ALL HOME APPOINTMENTS
========================================================= */

export async function getHomeAppointments() {
  try {
    const response =
      await api.get(
        HOME_APPOINTMENTS_ENDPOINT
      );

    console.log(
      "GET HOME APPOINTMENTS RESPONSE:",
      response.data
    );

    const rawData =
      Array.isArray(
        response.data
      )
        ? response.data
        : response.data?.data ??
          response.data?.Data ??
          [];

    return Array.isArray(
      rawData
    )
      ? rawData
      : [];
  } catch (error) {
    console.error(
      "GET HOME APPOINTMENTS ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   GET HOME APPOINTMENT BY ID
========================================================= */

export async function getHomeAppointment(
  id
) {
  try {
    const response =
      await api.get(
        `${HOME_APPOINTMENTS_ENDPOINT}/${id}`
      );

    return (
      response.data?.data ??
      response.data?.Data ??
      response.data
    );
  } catch (error) {
    console.error(
      "GET HOME APPOINTMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   DELETE HOME APPOINTMENT
========================================================= */

export async function deleteHomeAppointment(
  id
) {
  try {
    const response =
      await api.delete(
        `${HOME_APPOINTMENTS_ENDPOINT}/${id}`
      );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE HOME APPOINTMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}