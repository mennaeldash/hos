import api from "./api";

/* =========================================================
   LOGIN ADMIN
========================================================= */

export async function loginAdmin(
  email,
  password
) {
  if (!String(email || "").trim()) {
    throw new Error(
      "البريد الإلكتروني مطلوب"
    );
  }

  if (!String(password || "").trim()) {
    throw new Error(
      "كلمة المرور مطلوبة"
    );
  }

  const response = await api.post(
    "/api/auth/login",
    {
      email: String(email).trim(),
      password: String(password),
    }
  );

  console.log(
    "LOGIN ADMIN RESPONSE:",
    response.data
  );

  return response.data;
}

/* =========================================================
   CREATE ADMIN

   POST /api/auth/create-admin
========================================================= */

export async function createAdmin(data) {
  const email =
    data?.email ??
    data?.Email ??
    "";

  const password =
    data?.password ??
    data?.Password ??
    "";

  const confirmPassword =
    data?.confirmPassword ??
    data?.ConfirmPassword ??
    "";

  /* =======================================================
     VALIDATION
  ======================================================= */

  if (!String(email).trim()) {
    throw new Error(
      "البريد الإلكتروني مطلوب"
    );
  }

  if (!String(password)) {
    throw new Error(
      "كلمة المرور مطلوبة"
    );
  }

  if (!String(confirmPassword)) {
    throw new Error(
      "تأكيد كلمة المرور مطلوب"
    );
  }

  if (
    String(password) !==
    String(confirmPassword)
  ) {
    throw new Error(
      "كلمة المرور وتأكيد كلمة المرور غير متطابقين"
    );
  }

  /* =======================================================
     REQUEST
  ======================================================= */

  const response = await api.post(
    "/api/auth/create-admin",
    {
      email: String(email).trim(),
      password: String(password),
      confirmPassword:
        String(confirmPassword),
    }
  );

  console.log(
    "CREATE ADMIN RESPONSE:",
    response.data
  );

  return response.data;
}