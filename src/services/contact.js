import api from "./api";

const CONTACT_INFO_ENDPOINT =
  "/api/ContactInfo";

const PATIENT_FEEDBACK_ENDPOINT =
  "/api/PatientFeedbacks";

/* ======================================================
   NORMALIZE CONTACT INFO
====================================================== */

function normalizeContactInfo(data) {
  if (!data) {
    return null;
  }

  return {
    ...data,

    id:
      data.id ??
      data.Id ??
      null,

    email:
      data.email ??
      data.Email ??
      "",

    phone:
      data.phone ??
      data.Phone ??
      "",

    whatsapp:
      data.whatsApp ??
      data.WhatsApp ??
      data.whatsapp ??
      "",

    whatsApp:
      data.whatsApp ??
      data.WhatsApp ??
      data.whatsapp ??
      "",

    address:
      data.address ??
      data.Address ??
      "",

    hours:
      data.hours ??
      data.Hours ??
      "",

    map_url:
      data.mapUrl ??
      data.MapUrl ??
      data.map_url ??
      "",

    mapUrl:
      data.mapUrl ??
      data.MapUrl ??
      data.map_url ??
      "",

    updatedAt:
      data.updatedAt ??
      data.UpdatedAt ??
      null,
  };
}

/* ======================================================
   CONTACT PAYLOAD
====================================================== */

function buildContactPayload(data) {
  return {
    email:
      String(
        data?.email ??
          data?.Email ??
          ""
      ).trim(),

    phone:
      String(
        data?.phone ??
          data?.Phone ??
          ""
      ).trim(),

    whatsApp:
      String(
        data?.whatsApp ??
          data?.WhatsApp ??
          data?.whatsapp ??
          ""
      ).trim(),

    address:
      String(
        data?.address ??
          data?.Address ??
          ""
      ).trim(),

    hours:
      String(
        data?.hours ??
          data?.Hours ??
          ""
      ).trim(),

    mapUrl:
      String(
        data?.mapUrl ??
          data?.MapUrl ??
          data?.map_url ??
          ""
      ).trim(),
  };
}

/* ======================================================
   GET CONTACT INFO

   GET /api/ContactInfo
====================================================== */

export async function getContactInfo() {
  try {
    const response =
      await api.get(
        CONTACT_INFO_ENDPOINT
      );

    console.log(
      "GET CONTACT INFO RESPONSE:",
      response.data
    );

    if (
      Array.isArray(
        response.data
      )
    ) {
      const first =
        response.data[0];

      return first
        ? normalizeContactInfo(
            first
          )
        : null;
    }

    return normalizeContactInfo(
      response.data
    );
  } catch (error) {
    console.error(
      "GET CONTACT INFO ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   CREATE CONTACT INFO

   POST /api/ContactInfo
====================================================== */

export async function createContactInfo(
  data
) {
  try {
    const payload =
      buildContactPayload(
        data
      );

    const response =
      await api.post(
        CONTACT_INFO_ENDPOINT,
        payload
      );

    return response.data
      ? normalizeContactInfo(
          response.data
        )
      : null;
  } catch (error) {
    console.error(
      "CREATE CONTACT INFO ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   UPDATE CONTACT INFO

   PUT /api/ContactInfo/{id}
====================================================== */

export async function updateContactInfo(
  id,
  data
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Contact info id is required"
    );
  }

  try {
    const payload =
      buildContactPayload(
        data
      );

    const response =
      await api.put(
        `${CONTACT_INFO_ENDPOINT}/${id}`,
        payload
      );

    return response.data
      ? normalizeContactInfo(
          response.data
        )
      : null;
  } catch (error) {
    console.error(
      "UPDATE CONTACT INFO ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   DELETE CONTACT INFO

   DELETE /api/ContactInfo/{id}
====================================================== */

export async function deleteContactInfo(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Contact info id is required"
    );
  }

  try {
    const response =
      await api.delete(
        `${CONTACT_INFO_ENDPOINT}/${id}`
      );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE CONTACT INFO ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   NORMALIZE PATIENT FEEDBACK
====================================================== */

function normalizePatientFeedback(data) {
  if (!data) {
    return null;
  }

  return {
    ...data,

    id:
      data.id ??
      data.Id ??
      null,

    name:
      data.name ??
      data.Name ??
      "",

    message:
      data.message ??
      data.Message ??
      "",

    createdAt:
      data.createdAt ??
      data.CreatedAt ??
      data.created_at ??
      null,
  };
}

/* ======================================================
   BUILD FEEDBACK PAYLOAD
====================================================== */

function buildFeedbackPayload(data) {
  return {
    name:
      String(
        data?.name ??
          data?.Name ??
          ""
      ).trim(),

    message:
      String(
        data?.message ??
          data?.Message ??
          ""
      ).trim(),
  };
}

/* ======================================================
   SEND FEEDBACK

   POST /api/PatientFeedbacks
====================================================== */

export async function createPatientFeedback(
  data
) {
  try {
    const payload =
      buildFeedbackPayload(
        data
      );

    console.log(
      "PATIENT FEEDBACK PAYLOAD:",
      payload
    );

    const response =
      await api.post(
        PATIENT_FEEDBACK_ENDPOINT,
        payload
      );

    console.log(
      "PATIENT FEEDBACK RESPONSE:",
      response.data
    );

    const result =
      response.data?.data ??
      response.data;

    return result
      ? normalizePatientFeedback(
          result
        )
      : null;
  } catch (error) {
    console.error(
      "CREATE PATIENT FEEDBACK ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   GET ALL FEEDBACKS

   GET /api/PatientFeedbacks

   ده Endpoint محمي للأدمن.
   api.js هيضيف Bearer token تلقائياً.
====================================================== */

export async function getContactMessages() {
  try {
    const response =
      await api.get(
        PATIENT_FEEDBACK_ENDPOINT
      );

    console.log(
      "GET PATIENT FEEDBACKS RESPONSE:",
      response.data
    );

    const result =
      response.data?.data ??
      response.data;

    if (
      !Array.isArray(result)
    ) {
      return [];
    }

    return result
      .map(
        normalizePatientFeedback
      )
      .filter(Boolean);
  } catch (error) {
    console.error(
      "GET PATIENT FEEDBACKS ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   GET FEEDBACK BY ID

   GET /api/PatientFeedbacks/{id}
====================================================== */

export async function getPatientFeedbackById(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Patient feedback id is required"
    );
  }

  try {
    const response =
      await api.get(
        `${PATIENT_FEEDBACK_ENDPOINT}/${id}`
      );

    const result =
      response.data?.data ??
      response.data;

    return normalizePatientFeedback(
      result
    );
  } catch (error) {
    console.error(
      "GET PATIENT FEEDBACK ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   ALIAS
====================================================== */

export const getPatientFeedbacks =
  getContactMessages;