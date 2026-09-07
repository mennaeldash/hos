import api from "./api";

const STATISTICS_BASE =
  "/api/Statistics";

/* ======================================================
   NORMALIZE
====================================================== */

function normalizeStatistic(data) {
  if (!data) {
    return null;
  }

  return {
    ...data,

    id:
      data.id ??
      data.Id ??
      null,

    key:
      data.key ??
      data.Key ??
      "",

    value:
      data.value ??
      data.Value ??
      "",

    updatedAt:
      data.updatedAt ??
      data.UpdatedAt ??
      null,
  };
}

/* ======================================================
   PAYLOAD
====================================================== */

function buildStatisticPayload(data) {
  return {
    key:
      String(
        data?.key ??
          data?.Key ??
          ""
      ).trim(),

    value:
      String(
        data?.value ??
          data?.Value ??
          ""
      ).trim(),
  };
}

/* ======================================================
   GET ALL

   GET /api/Statistics/Get_All_Statistics
====================================================== */

export async function getStatistics() {
  try {
    const response =
      await api.get(
        `${STATISTICS_BASE}/Get_All_Statistics`
      );

    console.log(
      "GET STATISTICS RESPONSE:",
      response.data
    );

    if (
      !Array.isArray(
        response.data
      )
    ) {
      return [];
    }

    return response.data
      .map(
        normalizeStatistic
      )
      .filter(Boolean);
  } catch (error) {
    console.error(
      "GET STATISTICS ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   GET BY ID

   GET /api/Statistics/Get_By_Id_Statistics/{id}
====================================================== */

export async function getStatistic(id) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Statistic id is required"
    );
  }

  try {
    const response =
      await api.get(
        `${STATISTICS_BASE}/Get_By_Id_Statistics/${id}`
      );

    return normalizeStatistic(
      response.data
    );
  } catch (error) {
    console.error(
      "GET STATISTIC ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   CREATE

   POST /api/Statistics/Create_Statistics
====================================================== */

export async function createStatistic(
  data
) {
  try {
    const payload =
      buildStatisticPayload(
        data
      );

    console.log(
      "CREATE STATISTIC PAYLOAD:",
      payload
    );

    const response =
      await api.post(
        `${STATISTICS_BASE}/Create_Statistics`,
        payload
      );

    console.log(
      "CREATE STATISTIC RESPONSE:",
      response.data
    );

    return response.data
      ? normalizeStatistic(
          response.data
        )
      : null;
  } catch (error) {
    console.error(
      "CREATE STATISTIC ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   UPDATE

   PUT /api/Statistics/Update_Statistics/{id}
====================================================== */

export async function updateStatistic(
  id,
  data
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Statistic id is required"
    );
  }

  try {
    const payload =
      buildStatisticPayload(
        data
      );

    console.log(
      "UPDATE STATISTIC PAYLOAD:",
      {
        id,
        ...payload,
      }
    );

    const response =
      await api.put(
        `${STATISTICS_BASE}/Update_Statistics/${id}`,
        payload
      );

    console.log(
      "UPDATE STATISTIC RESPONSE:",
      response.data
    );

    return response.data
      ? normalizeStatistic(
          response.data
        )
      : null;
  } catch (error) {
    console.error(
      "UPDATE STATISTIC ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* ======================================================
   DELETE

   DELETE /api/Statistics/Delete_Statistics/{id}
====================================================== */

export async function deleteStatistic(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Statistic id is required"
    );
  }

  try {
    const response =
      await api.delete(
        `${STATISTICS_BASE}/Delete_Statistics/${id}`
      );

    console.log(
      "DELETE STATISTIC RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE STATISTIC ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}