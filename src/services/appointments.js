import api from "./api";

const APPOINTMENTS_ENDPOINT =
  "/api/Appointments";

/* =========================================================
   HELPERS
========================================================= */

const firstValue = (
  ...values
) => {
  return (
    values.find(
      (value) => {
        if (
          value === undefined ||
          value === null
        ) {
          return false;
        }

        /*
          نخلي الرقم 0 صالح،
          لكن نتجاهل String فاضي
          علشان نكمل للـ fallback اللي بعده.
        */

        if (
          typeof value ===
          "string"
        ) {
          return (
            value.trim() !==
            ""
          );
        }

        return true;
      }
    ) ?? ""
  );
};

const normalizeText = (
  value
) =>
  String(
    value ?? ""
  ).trim();

/* =========================================================
   DAYS
========================================================= */

const DAY_LABELS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

/* =========================================================
   DATE ONLY

   Backend بيرجع DateTime مثل:

   2026-09-17T00:00:00

   لكن الموقع محتاج يعرض:

   2026-09-17

   بدون وقت نهائياً.
========================================================= */

function getAppointmentDate(
  value
) {
  if (!value) {
    return "";
  }

  const raw =
    String(
      value
    ).trim();

  if (!raw) {
    return "";
  }

  /*
    .NET Default DateTime

    0001-01-01T00:00:00

    معناها مفيش تاريخ حقيقي.
  */

  if (
    raw.startsWith(
      "0001-01-01"
    )
  ) {
    return "";
  }

  /*
    يمسك التاريخ سواء كان:

    2026-09-17

    أو:

    2026-09-17T00:00:00

    أو:

    2026-09-17T18:30:00.000Z
  */

  const dateMatch =
    raw.match(
      /^(\d{4}-\d{2}-\d{2})/
    );

  if (
    dateMatch?.[1]
  ) {
    return dateMatch[1];
  }

  return raw;
}

/* =========================================================
   GET ARABIC DAY FROM DATE
========================================================= */

function getArabicDayFromDate(
  dateValue
) {
  if (!dateValue) {
    return "";
  }

  const rawDate =
    getAppointmentDate(
      dateValue
    );

  if (!rawDate) {
    return "";
  }

  const [
    year,
    month,
    day,
  ] =
    rawDate
      .split("-")
      .map(Number);

  if (
    !year ||
    !month ||
    !day
  ) {
    return "";
  }

  const date =
    new Date(
      year,
      month - 1,
      day
    );

  return (
    DAY_LABELS[
      date.getDay()
    ] || ""
  );
}

/* =========================================================
   NORMALIZE APPOINTMENT
========================================================= */

function normalizeAppointment(
  data
) {
  if (!data) {
    return null;
  }

  /* =======================================================
     APPOINTMENT DATE
  ======================================================= */

  const rawAppointmentDate =
    firstValue(
      data.appointmentDate,
      data.AppointmentDate,
      data.appointment_date,
      data.date,
      data.Date
    );

  const appointmentDate =
    getAppointmentDate(
      rawAppointmentDate
    );

  const appointmentDay =
    getArabicDayFromDate(
      appointmentDate
    );

  /* =======================================================
     DOCTOR / DEPARTMENT OBJECTS
  ======================================================= */

  const doctor =
    data.doctor ??
    data.Doctor ??
    null;

  const department =
    data.department ??
    data.Department ??
    null;

  /* =======================================================
     PATIENT
  ======================================================= */

  const patientName =
    firstValue(
      data.patientName,
      data.PatientName,
      data.fullName,
      data.FullName,
      data.full_name,
      data.name,
      data.Name
    );

  const patientPhone =
    firstValue(
      data.patientPhone,
      data.PatientPhone,
      data.phone,
      data.Phone
    );

  /* =======================================================
     APPOINTMENT TYPE
  ======================================================= */

  const appointmentType =
    firstValue(
      data.type,
      data.Type,
      data.appointmentType,
      data.AppointmentType,
      data.appointment_type
    );

  /* =======================================================
     DOCTOR
  ======================================================= */

  const doctorId =
    firstValue(
      data.doctorId,
      data.DoctorId,
      data.doctor_id,

      doctor?.id,
      doctor?.Id
    );

  const doctorName =
    firstValue(
      data.doctorName,
      data.DoctorName,

      typeof doctor ===
        "string"
        ? doctor
        : "",

      doctor?.fullName,
      doctor?.FullName,

      doctor?.name,
      doctor?.Name
    );

  /* =======================================================
     DEPARTMENT
  ======================================================= */

  const departmentId =
    firstValue(
      data.departmentId,
      data.DepartmentId,
      data.department_id,

      doctor?.departmentId,
      doctor?.DepartmentId,
      doctor?.department_id,

      department?.id,
      department?.Id
    );

  const departmentName =
    firstValue(
      data.departmentName,
      data.DepartmentName,

      typeof department ===
        "string"
        ? department
        : "",

      doctor?.departmentName,
      doctor?.DepartmentName,
      doctor?.department_name,

      department?.name,
      department?.Name
    );

  /* =======================================================
     CREATED AT
  ======================================================= */

  const createdAt =
    firstValue(
      data.createdAt,
      data.CreatedAt,
      data.created_at
    );

  /* =======================================================
     RESULT
  ======================================================= */

  return {
    ...data,

    id:
      firstValue(
        data.id,
        data.Id
      ),

    /* =====================
       BACKEND STYLE
    ====================== */

    patientName:
      normalizeText(
        patientName
      ),

    patientPhone:
      normalizeText(
        patientPhone
      ),

    type:
      normalizeText(
        appointmentType
      ),

    appointmentType:
      normalizeText(
        appointmentType
      ),

    appointmentDate:
      appointmentDate,

    appointmentDay:
      appointmentDay,

    doctorId,

    doctorName:
      normalizeText(
        doctorName
      ),

    departmentId,

    departmentName:
      normalizeText(
        departmentName
      ),

    createdAt:
      normalizeText(
        createdAt
      ),

    /* =====================
       ADMIN STYLE
    ====================== */

    full_name:
      normalizeText(
        patientName
      ),

    phone:
      normalizeText(
        patientPhone
      ),

    appointment_type:
      normalizeText(
        appointmentType
      ),

    doctor_id:
      doctorId,

    doctor:
      normalizeText(
        doctorName
      ),

    department_id:
      departmentId,

    department:
      normalizeText(
        departmentName
      ),

    appointment_date:
      appointmentDate,

    appointment_day:
      appointmentDay,

    created_at:
      normalizeText(
        createdAt
      ),
  };
}

/* =========================================================
   GET ARRAY FROM RESPONSE
========================================================= */

function extractAppointmentsArray(
  responseData
) {
  if (
    Array.isArray(
      responseData
    )
  ) {
    return responseData;
  }

  if (
    Array.isArray(
      responseData?.data
    )
  ) {
    return responseData.data;
  }

  if (
    Array.isArray(
      responseData?.Data
    )
  ) {
    return responseData.Data;
  }

  if (
    Array.isArray(
      responseData?.appointments
    )
  ) {
    return responseData.appointments;
  }

  return [];
}

/* =========================================================
   GET ALL APPOINTMENTS

   GET /api/Appointments
========================================================= */

export async function getAppointments() {
  try {
    const response =
      await api.get(
        APPOINTMENTS_ENDPOINT
      );

    console.log(
      "GET APPOINTMENTS RESPONSE:",
      response.data
    );

    const appointments =
      extractAppointmentsArray(
        response.data
      );

    return appointments
      .map(
        normalizeAppointment
      )
      .filter(Boolean);
  } catch (error) {
    console.error(
      "GET APPOINTMENTS ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   GET APPOINTMENT BY ID

   GET /api/Appointments/{id}
========================================================= */

export async function getAppointment(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Appointment id is required"
    );
  }

  try {
    const response =
      await api.get(
        `${APPOINTMENTS_ENDPOINT}/${id}`
      );

    console.log(
      "GET APPOINTMENT RESPONSE:",
      response.data
    );

    const raw =
      response.data?.data ??
      response.data?.Data ??
      response.data;

    return normalizeAppointment(
      raw
    );
  } catch (error) {
    console.error(
      "GET APPOINTMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   BUILD APPOINTMENT DATE

   الموقع بيتعامل مع تاريخ فقط.

   لكن Backend طالب DateTime
   لذلك نبعت:

   2026-09-18T00:00:00

   والـ 00:00:00 هنا مجرد Format
   للـ API ومش بيتعرض للمستخدم.
========================================================= */

function buildAppointmentDate(
  data
) {
  const directValue =
    firstValue(
      data?.appointmentDate,
      data?.AppointmentDate
    );

  if (directValue) {
    const date =
      getAppointmentDate(
        directValue
      );

    if (!date) {
      return "";
    }

    return `${date}T00:00:00`;
  }

  const rawDate =
    firstValue(
      data?.appointment_date,
      data?.date,
      data?.Date
    );

  const date =
    getAppointmentDate(
      rawDate
    );

  if (!date) {
    return "";
  }

  return `${date}T00:00:00`;
}

/* =========================================================
   CREATE APPOINTMENT

   POST /api/Appointments/doctor/{doctorId}
========================================================= */

export async function createAppointment(
  doctorIdOrData,
  appointmentData
) {
  let doctorId;
  let data;

  /* =======================================================
     METHOD 1

     createAppointment(data)
  ======================================================= */

  if (
    typeof doctorIdOrData ===
      "object" &&
    doctorIdOrData !==
      null
  ) {
    data =
      doctorIdOrData;

    doctorId =
      firstValue(
        data.doctorId,
        data.DoctorId,
        data.doctor_id
      );
  } else {
    /* =====================================================
       METHOD 2

       createAppointment(
         doctorId,
         data
       )
    ===================================================== */

    doctorId =
      doctorIdOrData;

    data =
      appointmentData ||
      {};
  }

  /* =======================================================
     PATIENT NAME
  ======================================================= */

  const patientName =
    normalizeText(
      firstValue(
        data.patientName,
        data.PatientName,
        data.full_name,
        data.fullName,
        data.name
      )
    );

  /* =======================================================
     PATIENT PHONE
  ======================================================= */

  const patientPhone =
    normalizeText(
      firstValue(
        data.patientPhone,
        data.PatientPhone,
        data.phone
      )
    );

  /* =======================================================
     APPOINTMENT TYPE
  ======================================================= */

  const type =
    normalizeText(
      firstValue(
        data.type,
        data.Type,
        data.appointmentType,
        data.AppointmentType,
        data.appointment_type
      )
    );

  /* =======================================================
     DATE
  ======================================================= */

  const appointmentDate =
    buildAppointmentDate(
      data
    );

  /* =======================================================
     VALIDATION
  ======================================================= */

  if (
    doctorId === null ||
    doctorId === undefined ||
    doctorId === ""
  ) {
    throw new Error(
      "يجب اختيار الطبيب"
    );
  }

  if (!patientName) {
    throw new Error(
      "اسم المريض مطلوب"
    );
  }

  if (!patientPhone) {
    throw new Error(
      "رقم الهاتف مطلوب"
    );
  }

  if (!type) {
    throw new Error(
      "نوع الحجز مطلوب"
    );
  }

  if (!appointmentDate) {
    throw new Error(
      "تاريخ الحجز مطلوب"
    );
  }

  /* =======================================================
     EXACT BACKEND PAYLOAD

     Swagger:

     {
       patientName,
       patientPhone,
       type,
       appointmentDate
     }
  ======================================================= */

  const payload = {
    patientName,
    patientPhone,
    type,
    appointmentDate,
  };

  console.log(
    "CREATE APPOINTMENT REQUEST:",
    {
      doctorId,
      payload,
    }
  );

  try {
    const response =
      await api.post(
        `${APPOINTMENTS_ENDPOINT}/doctor/${doctorId}`,
        payload
      );

    console.log(
      "CREATE APPOINTMENT RESPONSE:",
      response.data
    );

    const raw =
      response.data?.data ??
      response.data?.Data ??
      response.data;

    if (
      raw &&
      typeof raw ===
        "object"
    ) {
      return normalizeAppointment(
        raw
      );
    }

    return (
      raw ??
      true
    );
  } catch (error) {
    console.error(
      "CREATE APPOINTMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   DELETE APPOINTMENT

   DELETE /api/Appointments/{id}
========================================================= */

export async function deleteAppointment(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Appointment id is required"
    );
  }

  try {
    const response =
      await api.delete(
        `${APPOINTMENTS_ENDPOINT}/${id}`
      );

    console.log(
      "DELETE APPOINTMENT RESPONSE:",
      response.data
    );

    return (
      response.data ??
      true
    );
  } catch (error) {
    console.error(
      "DELETE APPOINTMENT ERROR:",
      error?.response?.data ||
        error
    );

    throw error;
  }
}

/* =========================================================
   UPDATE APPOINTMENT

   غير موجود حالياً في الـ API
========================================================= */

export async function updateAppointment() {
  throw new Error(
    "تعديل الموعد غير متاح في الـAPI الحالي"
  );
}