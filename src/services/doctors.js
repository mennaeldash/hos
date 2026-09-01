import api from "./api";

import {
  mockDoctorSchedules,
} from "@/services/mockData";

const DOCTORS_ENDPOINT =
  "/api/dashboard/doctors";

const DEPARTMENTS_WITH_DOCTORS_ENDPOINT =
  "/api/dashboard/departments/with-doctors";

/* ======================================================
   HELPERS
====================================================== */

const getBackendOrigin = () => {
  const backendOrigin =
    import.meta.env.VITE_BACKEND_ORIGIN ||
    "";

  if (
    backendOrigin.startsWith("http://") ||
    backendOrigin.startsWith("https://")
  ) {
    return backendOrigin.replace(/\/$/, "");
  }

  const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    "";

  if (
    baseURL.startsWith("http://") ||
    baseURL.startsWith("https://")
  ) {
    return baseURL
      .replace(/\/api\/?$/, "")
      .replace(/\/$/, "");
  }

  return "http://rewaddashboard.runasp.net";
};

const BACKEND_ORIGIN =
  getBackendOrigin();

/* ======================================================
   IMAGE URL
====================================================== */

function normalizeImageUrl(imageUrl) {
  if (!imageUrl) {
    return "";
  }

  if (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("blob:")
  ) {
    return imageUrl;
  }

  return `${BACKEND_ORIGIN}${
    imageUrl.startsWith("/")
      ? imageUrl
      : `/${imageUrl}`
  }`;
}

/* ======================================================
   NORMALIZE DOCTOR
====================================================== */

function normalizeDoctor(
  doctor,
  parentDepartment = null
) {
  if (!doctor) {
    return null;
  }

  const id =
    doctor.id ??
    doctor.Id ??
    doctor.doctorId ??
    doctor.DoctorId ??
    null;

  const name =
    doctor.fullName ??
    doctor.FullName ??
    doctor.name ??
    doctor.Name ??
    "";

  const specialization =
    doctor.specialization ??
    doctor.Specialization ??
    doctor.specialty ??
    doctor.Specialty ??
    "";

  const biography =
    doctor.biography ??
    doctor.Biography ??
    doctor.bio ??
    doctor.Bio ??
    "";

  const departmentId =
    doctor.departmentId ??
    doctor.DepartmentId ??
    doctor.department_id ??
    parentDepartment?.id ??
    parentDepartment?.Id ??
    null;

  const departmentName =
    doctor.departmentName ??
    doctor.DepartmentName ??
    doctor.department_name ??
    parentDepartment?.name ??
    parentDepartment?.Name ??
    "";

  const rawImage =
    doctor.imageUrl ??
    doctor.ImageUrl ??
    doctor.image_url ??
    doctor.image ??
    doctor.Image ??
    "";

  const imageUrl =
    normalizeImageUrl(rawImage);

  const status =
    doctor.status ??
    doctor.Status ??
    "";

  return {
    ...doctor,

    /* Backend style */

    id,

    fullName: name,

    specialization,

    biography,

    departmentId,

    departmentName,

    imageUrl,

    status,

    /* Frontend style */

    name,

    specialty:
      specialization,

    bio:
      biography,

    department_id:
      departmentId,

    department_name:
      departmentName,

    image_url:
      imageUrl,
  };
}

/* ======================================================
   GET ALL DOCTORS

   بنستخدم with-doctors لأنه بيرجع:
   - doctor id
   - department id
   - department name
====================================================== */

export async function getAllDoctors() {
  try {
    const response =
      await api.get(
        DEPARTMENTS_WITH_DOCTORS_ENDPOINT
      );

    const departments =
      Array.isArray(response.data)
        ? response.data
        : [];

    const doctors =
      departments.flatMap(
        (department) => {
          const departmentDoctors =
            Array.isArray(
              department.doctors
            )
              ? department.doctors
              : [];

          return departmentDoctors
            .map((doctor) =>
              normalizeDoctor(
                doctor,
                department
              )
            )
            .filter(Boolean);
        }
      );

    console.log(
      "DOCTORS WITH IDS RESPONSE:",
      doctors
    );

    return doctors;
  } catch (error) {
    /*
      Fallback:
      لو with-doctors حصل فيه مشكلة
      نستخدم GET doctors.
    */

    console.warn(
      "with-doctors failed, using doctors endpoint.",
      error
    );

    const response =
      await api.get(
        DOCTORS_ENDPOINT
      );

    if (
      !Array.isArray(
        response.data
      )
    ) {
      return [];
    }

    const doctors =
      response.data
        .map((doctor) =>
          normalizeDoctor(
            doctor
          )
        )
        .filter(Boolean);

    console.log(
      "GET ALL DOCTORS FALLBACK:",
      doctors
    );

    return doctors;
  }
}

/* ======================================================
   GET DOCTORS

   مستخدم في hooks.js
====================================================== */

export async function getDoctors() {
  return getAllDoctors();
}

/* ======================================================
   GET ONE DOCTOR
====================================================== */

export async function getDoctor(id) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Doctor id is required"
    );
  }

  const response =
    await api.get(
      `${DOCTORS_ENDPOINT}/${id}`
    );

  return normalizeDoctor({
    ...response.data,

    /*
      GET doctor/{id}
      ممكن مايرجعش id،
      لذلك بناخد الـ id من الـ URL.
    */

    id:
      response.data?.id ??
      response.data?.Id ??
      Number(id),
  });
}

/* ======================================================
   CREATE DOCTOR
====================================================== */

export async function createDoctor(
  data
) {
  const fullName =
    data?.FullName ??
    data?.fullName ??
    data?.name;

  const departmentId =
    data?.DepartmentId ??
    data?.departmentId ??
    data?.department_id;

  if (
    !String(
      fullName || ""
    ).trim()
  ) {
    throw new Error(
      "FullName is required"
    );
  }

  if (
    departmentId === null ||
    departmentId === undefined ||
    departmentId === ""
  ) {
    throw new Error(
      "DepartmentId is required"
    );
  }

  const formData =
    new FormData();

  formData.append(
    "FullName",
    String(fullName).trim()
  );

  formData.append(
    "DepartmentId",
    String(departmentId)
  );

  const image =
    data?.Image ??
    data?.image ??
    null;

  if (
    image instanceof File
  ) {
    formData.append(
      "Image",
      image
    );
  }

  const specialization =
    data?.Specialization ??
    data?.specialization ??
    data?.specialty;

  if (
    specialization !== undefined &&
    specialization !== null &&
    String(
      specialization
    ).trim() !== ""
  ) {
    formData.append(
      "Specialization",
      String(
        specialization
      ).trim()
    );
  }

  const biography =
    data?.Biography ??
    data?.biography ??
    data?.bio;

  if (
    biography !== undefined &&
    biography !== null &&
    String(
      biography
    ).trim() !== ""
  ) {
    formData.append(
      "Biography",
      String(
        biography
      ).trim()
    );
  }

  const response =
    await api.post(
      DOCTORS_ENDPOINT,
      formData
    );

  console.log(
    "CREATE DOCTOR RESPONSE:",
    response.data
  );

  return response.data;
}

/* ======================================================
   UPDATE DOCTOR
====================================================== */

export async function updateDoctor(
  id,
  data
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Doctor id is required"
    );
  }

  const formData =
    new FormData();

  /* -----------------------
     FULL NAME
  ----------------------- */

  const fullName =
    data?.FullName ??
    data?.fullName ??
    data?.name;

  if (
    fullName !== undefined &&
    fullName !== null
  ) {
    formData.append(
      "FullName",
      String(fullName).trim()
    );
  }

  /* -----------------------
     IMAGE
  ----------------------- */

  const image =
    data?.Image ??
    data?.image ??
    null;

  /*
    Image لازم File فقط.
    مانبعتش رابط الصورة القديمة.
  */

  if (
    image instanceof File
  ) {
    formData.append(
      "Image",
      image
    );
  }

  /* -----------------------
     SPECIALIZATION
  ----------------------- */

  const specialization =
    data?.Specialization ??
    data?.specialization ??
    data?.specialty;

  if (
    specialization !== undefined &&
    specialization !== null
  ) {
    formData.append(
      "Specialization",
      String(
        specialization
      ).trim()
    );
  }

  /* -----------------------
     BIOGRAPHY
  ----------------------- */

  const biography =
    data?.Biography ??
    data?.biography ??
    data?.bio;

  if (
    biography !== undefined &&
    biography !== null
  ) {
    formData.append(
      "Biography",
      String(
        biography
      ).trim()
    );
  }

  /* -----------------------
     DEPARTMENT
  ----------------------- */

  const departmentId =
    data?.DepartmentId ??
    data?.departmentId ??
    data?.department_id;

  if (
    departmentId !== undefined &&
    departmentId !== null &&
    departmentId !== ""
  ) {
    formData.append(
      "DepartmentId",
      String(departmentId)
    );
  }

  /* -----------------------
     STATUS
  ----------------------- */

  /*
    Swagger:
    Status = integer

    لذلك لو القيمة رقم
    فقط وقتها نبعتها.
  */

  const status =
    data?.Status ??
    data?.statusValue;

  if (
    status !== undefined &&
    status !== null &&
    status !== "" &&
    !Number.isNaN(
      Number(status)
    )
  ) {
    formData.append(
      "Status",
      String(
        Number(status)
      )
    );
  }

  const response =
    await api.put(
      `${DOCTORS_ENDPOINT}/${id}`,
      formData
    );

  console.log(
    "UPDATE DOCTOR RESPONSE:",
    response.data
  );

  return response.data;
}

/* ======================================================
   DELETE DOCTOR
====================================================== */

export async function deleteDoctor(
  id
) {
  if (
    id === null ||
    id === undefined ||
    id === ""
  ) {
    throw new Error(
      "Doctor id is required"
    );
  }

  const response =
    await api.delete(
      `${DOCTORS_ENDPOINT}/${id}`
    );

  console.log(
    "DELETE DOCTOR RESPONSE:",
    response.data
  );

  return response.data;
}

/* ======================================================
   GET DOCTOR SCHEDULE

   مفيش Endpoint للمواعيد في الـ Backend حاليًا.

   لذلك أيام العمل فقط جاية مؤقتًا
   من mockDoctorSchedules.

   مهم:
   doctor_id في mockData لازم يساوي
   ID الدكتور الحقيقي في الـ Backend.
====================================================== */

export async function getDoctorSchedule(
  doctorId
) {
  if (
    doctorId === null ||
    doctorId === undefined ||
    doctorId === ""
  ) {
    return null;
  }

  const schedule =
    mockDoctorSchedules.find(
      (item) =>
        String(
          item.doctor_id
        ) ===
        String(doctorId)
    );

  if (!schedule) {
    return null;
  }

  return {
    ...schedule,

    working_days:
      Array.isArray(
        schedule.working_days
      )
        ? schedule.working_days
        : [],
  };
}