import api from "./api";

const CONTACT_INFO_ENDPOINT =
  "/api/ContactInfo";

const COMPLAINTS_STORAGE_KEY =
  "road_hospital_complaints";

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
   BUILD PAYLOAD
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

    /*
      لو Backend رجع Array
    */

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

    /*
      لو Backend رجع Object مباشر
    */

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

    console.log(
      "CREATE CONTACT INFO PAYLOAD:",
      payload
    );

    const response =
      await api.post(
        CONTACT_INFO_ENDPOINT,
        payload
      );

    console.log(
      "CREATE CONTACT INFO RESPONSE:",
      response.data
    );

    /*
      بعض الـEndpoints ممكن ترجع 204
      لذلك لو مفيش body نرجع null.
    */

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

    console.log(
      "UPDATE CONTACT INFO PAYLOAD:",
      {
        id,
        ...payload,
      }
    );

    const response =
      await api.put(
        `${CONTACT_INFO_ENDPOINT}/${id}`,
        payload
      );

    console.log(
      "UPDATE CONTACT INFO RESPONSE:",
      response.data
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

    console.log(
      "DELETE CONTACT INFO RESPONSE:",
      response.data
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
   CONTACT MESSAGES

   بنسيبها كما هي لأن hooks.js
   بيستخدم getContactMessages.

   الشكاوى والمقترحات حالياً
   محفوظة في localStorage.
====================================================== */

export async function getContactMessages() {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        COMPLAINTS_STORAGE_KEY
      );

    const parsed =
      raw
        ? JSON.parse(raw)
        : [];

    return Array.isArray(
      parsed
    )
      ? parsed
      : [];
  } catch (error) {
    console.error(
      "GET CONTACT MESSAGES ERROR:",
      error
    );

    return [];
  }
}