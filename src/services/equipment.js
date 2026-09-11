import api from "./api";

const EQUIPMENT_ENDPOINT =
  "/api/dashboard/services";

/* ======================================================
   NORMALIZE
====================================================== */

function normalizeEquipment(item) {
  if (!item) {
    return null;
  }

  const imageUrl =
    item.imageUrl ??
    item.ImageUrl ??
    item.image_url ??
    "";

  return {
    ...item,

    id:
      item.id ??
      item.Id ??
      null,

    name:
      item.name ??
      item.Name ??
      "",

    description:
      item.description ??
      item.Description ??
      "",

    imageUrl,

    image_url:
      imageUrl,
  };
}

/* ======================================================
   EXTRACT DATA
====================================================== */

function extractData(responseData) {
  return (
    responseData?.data ??
    responseData
  );
}

/* ======================================================
   BUILD FORM DATA
====================================================== */

function buildFormData(data) {
  const formData =
    new FormData();

  formData.append(
    "Name",
    String(
      data?.name ??
        data?.Name ??
        ""
    ).trim()
  );

  formData.append(
    "Description",
    String(
      data?.description ??
        data?.Description ??
        ""
    ).trim()
  );

  /*
    CrudAdmin بيحط الصورة الجديدة
    في image_url كـ File
  */

  const selectedImage =
    data?.image_url instanceof File
      ? data.image_url
      : data?.image instanceof File
      ? data.image
      : data?.Image instanceof File
      ? data.Image
      : null;

  if (selectedImage) {
    formData.append(
      "Image",
      selectedImage,
      selectedImage.name
    );
  }

  /*
    Debug مؤقت عشان نتأكد
    إن الصورة داخلة فعلًا
  */

  console.log(
    "FORM DATA CONTENT:"
  );

  for (
    const [key, value]
    of formData.entries()
  ) {
    console.log(
      key,
      value
    );
  }

  return formData;
}

/* ======================================================
   GET ALL
====================================================== */

export async function getEquipment() {
  try {
    const response =
      await api.get(
        EQUIPMENT_ENDPOINT
      );

    console.log(
      "GET EQUIPMENT RESPONSE:",
      response.data
    );

    const result =
      extractData(
        response.data
      );

    if (
      !Array.isArray(result)
    ) {
      return [];
    }

    return result
      .map(
        normalizeEquipment
      )
      .filter(Boolean);
  } catch (error) {
    console.error(
      "GET EQUIPMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   GET BY ID
====================================================== */

export async function getEquipmentById(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Equipment id is required"
    );
  }

  try {
    const response =
      await api.get(
        `${EQUIPMENT_ENDPOINT}/${id}`
      );

    const result =
      extractData(
        response.data
      );

    return normalizeEquipment(
      result
    );
  } catch (error) {
    console.error(
      "GET EQUIPMENT BY ID ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   CREATE
====================================================== */

export async function createEquipment(
  data
) {
  try {
    const formData =
      buildFormData(
        data
      );

    const response =
      await api.post(
        EQUIPMENT_ENDPOINT,
        formData
      );

    console.log(
      "CREATE EQUIPMENT RESPONSE:",
      response.data
    );

    const result =
      extractData(
        response.data
      );

    return result
      ? normalizeEquipment(
          result
        )
      : null;
  } catch (error) {
    console.error(
      "CREATE EQUIPMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   UPDATE
====================================================== */

export async function updateEquipment(
  id,
  data
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Equipment id is required"
    );
  }

  try {
    const formData =
      buildFormData(
        data
      );

    const response =
      await api.put(
        `${EQUIPMENT_ENDPOINT}/${id}`,
        formData
      );

    console.log(
      "UPDATE EQUIPMENT RESPONSE:",
      response.data
    );

    const result =
      extractData(
        response.data
      );

    return result
      ? normalizeEquipment(
          result
        )
      : null;
  } catch (error) {
    console.error(
      "UPDATE EQUIPMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   DELETE
====================================================== */

export async function deleteEquipment(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Equipment id is required"
    );
  }

  try {
    const response =
      await api.delete(
        `${EQUIPMENT_ENDPOINT}/${id}`
      );

    console.log(
      "DELETE EQUIPMENT RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE EQUIPMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}