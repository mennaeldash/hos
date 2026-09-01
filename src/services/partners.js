import api from "./api";

const BACKEND_URL = "http://rewaddashboard.runasp.net";

function getImageUrl(imageUrl) {
  if (!imageUrl) return "";

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://")
  ) {
    return imageUrl;
  }

  return `${BACKEND_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

function normalizePartner(partner) {
  if (!partner) return null;

  return {
    id: partner.id,
    name: partner.name || "",
    logo_url: getImageUrl(partner.imageUrl),
    imageUrl: partner.imageUrl || null,
  };
}

function extractPartners(data) {
  if (Array.isArray(data)) {
    return data.map(normalizePartner).filter(Boolean);
  }

  if (Array.isArray(data?.data)) {
    return data.data.map(normalizePartner).filter(Boolean);
  }

  if (Array.isArray(data?.contracts)) {
    return data.contracts.map(normalizePartner).filter(Boolean);
  }

  return [];
}

function buildPartnerFormData(data) {
  const formData = new FormData();

  formData.append("Name", data?.name || "");

  if (data?.logo_url instanceof File) {
    formData.append("Image", data.logo_url);
  }

  return formData;
}

export async function getPartners() {
  try {
    const response = await api.get(
      "/api/dashboard/contracts"
    );

    return extractPartners(response.data);
  } catch (error) {
    console.error(
      "Failed to fetch partners:",
      error?.response?.data || error
    );

    throw error;
  }
}

export async function getPartnerById(id) {
  try {
    const response = await api.get(
      `/api/dashboard/contracts/${id}`
    );

    return normalizePartner(response.data);
  } catch (error) {
    console.error(
      "Failed to fetch partner:",
      error?.response?.data || error
    );

    throw error;
  }
}

export async function createPartner(data) {
  try {
    const formData = buildPartnerFormData(data);

    const response = await api.post(
      "/api/dashboard/contracts",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to create partner:",
      error?.response?.data || error
    );

    throw error;
  }
}

export async function updatePartner(id, data) {
  try {
    const formData = buildPartnerFormData(data);

    const response = await api.put(
      `/api/dashboard/contracts/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to update partner:",
      error?.response?.data || error
    );

    throw error;
  }
}

export async function deletePartner(id) {
  try {
    const response = await api.delete(
      `/api/dashboard/contracts/${id}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete partner:",
      error?.response?.data || error
    );

    throw error;
  }
}