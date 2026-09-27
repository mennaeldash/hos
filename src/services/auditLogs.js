import api from "./api";

const AUDIT_LOGS_ENDPOINT =
  "/api/AuditLogs";

/* =========================================================
   NORMALIZE AUDIT LOG
========================================================= */

function normalizeAuditLog(data) {
  if (!data) {
    return null;
  }

  return {
    ...data,

    id:
      data.id ??
      data.Id ??
      null,

    userName:
      data.userName ??
      data.UserName ??
      "Unknown",

    userEmail:
      data.userEmail ??
      data.UserEmail ??
      "",

    action:
      data.action ??
      data.Action ??
      "",

    entityName:
      data.entityName ??
      data.EntityName ??
      "",

    entityDisplayName:
      data.entityDisplayName ??
      data.EntityDisplayName ??
      "",

    createdAt:
      data.createdAt ??
      data.CreatedAt ??
      null,
  };
}

/* =========================================================
   NORMALIZE VALUE
========================================================= */

function normalizeValue(value) {
  return String(
    value || ""
  )
    .trim()
    .toLowerCase();
}

/* =========================================================
   PATIENT PUBLIC ACTIONS

   العمليات دي المريض هو اللي بيعملها
   من الموقع العام، ومش عايزينها تظهر
   في سجل نشاط الأدمن.
========================================================= */

function isPatientPublicAction(log) {
  if (!log) {
    return false;
  }

  const action =
    normalizeValue(
      log.action
    );

  const entity =
    normalizeValue(
      log.entityName
    );

  /*
    المريض بيعمل Create فقط في:

    Appointment
    HomeAppointment
    PatientFeedback

    أما لو Admin حذف Appointment
    أو HomeAppointment هنسيبه يظهر عادي.
  */

  if (
    action !== "create"
  ) {
    return false;
  }

  return (
    entity === "appointment" ||
    entity === "appointments" ||
    entity === "homeappointment" ||
    entity === "homeappointments" ||
    entity === "patientfeedback" ||
    entity === "patientfeedbacks"
  );
}

/* =========================================================
   GET AUDIT LOGS

   GET /api/AuditLogs
========================================================= */

export async function getAuditLogs() {
  try {
    const response =
      await api.get(
        AUDIT_LOGS_ENDPOINT
      );

    console.log(
      "GET AUDIT LOGS RESPONSE:",
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
        normalizeAuditLog
      )
      .filter(Boolean)

      /* ===============================================
         REMOVE PATIENT PUBLIC ACTIONS
      =============================================== */

      .filter(
        (log) =>
          !isPatientPublicAction(
            log
          )
      );
  } catch (error) {
    console.error(
      "GET AUDIT LOGS ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}