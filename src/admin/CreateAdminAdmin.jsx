import { useState } from "react";

import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import {
  createAdmin,
} from "@/services/login";

/* =========================================================
   CREATE ADMIN PAGE
========================================================= */

export default function CreateAdminAdmin() {
const [form, setForm] = useState({
  email: "",
  password: "",
  confirmPassword: "",
  role: "Manager",
});

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  /* =======================================================
     INPUT
  ======================================================= */

  const handleChange = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setError("");
      setSuccess("");

      const email =
        form.email.trim();

      const password =
        form.password;

      const confirmPassword =
        form.confirmPassword;

      const role =
        form.role;

      /* EMAIL */

      if (!email) {
        setError(
          "من فضلك أدخل البريد الإلكتروني"
        );

        return;
      }

      /* PASSWORD */

      if (!password) {
        setError(
          "من فضلك أدخل كلمة المرور"
        );

        return;
      }

      /* CONFIRM PASSWORD */

      if (!confirmPassword) {
        setError(
          "من فضلك أكد كلمة المرور"
        );

        return;
      }

      /* PASSWORD MATCH */

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "كلمة المرور وتأكيد كلمة المرور غير متطابقين"
        );

        return;
      }

      /* ROLE */

      if (!role) {
        setError(
          "من فضلك اختر صلاحية الأدمن"
        );

        return;
      }

      setLoading(true);

      try {
        await createAdmin({
          email,
          password,
          confirmPassword,
  role: form.role,
        });

        setSuccess(
          "تم إضافة الأدمن بنجاح"
        );

        setForm({
          email: "",
          password: "",
          confirmPassword: "",
          role: "SubManager",
        });

        setShowPassword(false);
        setShowConfirmPassword(false);
      } catch (err) {
        console.error(
          "CREATE ADMIN ERROR:",
          err
        );

        const backendMessage =
          err?.response?.data?.message ??
          err?.response?.data?.title ??
          err?.response?.data ??
          null;

        if (
          err?.response?.status ===
          401
        ) {
          setError(
            "غير مصرح لك بإضافة أدمن جديد"
          );

          return;
        }

        if (
          err?.response?.status ===
          403
        ) {
          setError(
            "ليس لديك الصلاحية لإضافة أدمن جديد"
          );

          return;
        }

        if (
          typeof backendMessage ===
          "string"
        ) {
          setError(
            backendMessage
          );
        } else {
          setError(
            "حدث خطأ أثناء إضافة الأدمن"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     STYLES
  ======================================================= */

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 " +
    "focus:border-primary-500 focus:ring-2 focus:ring-primary-200 " +
    "outline-none transition-all bg-white text-slate-800";

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="
        max-w-2xl
        mx-auto
      "
    >
      <div
        className="
          bg-white

          rounded-3xl

          border
          border-slate-200

          shadow-sm

          overflow-hidden
        "
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className="
            p-6

            border-b
            border-slate-100
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <div
              className="
                w-12
                h-12

                rounded-2xl

                bg-primary-50

                text-primary-600

                flex
                items-center
                justify-center
              "
            >
              <UserPlus
                className="
                  w-6
                  h-6
                "
              />
            </div>

            <div>
              <h2
                className="
                  text-xl
                  font-extrabold
                  text-slate-800
                "
              >
                إضافة أدمن جديد
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500

                  mt-1
                "
              >
                إنشاء حساب جديد وتحديد
                صلاحية الدخول إلى لوحة التحكم
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            FORM
        ================================================== */}

        <form
          onSubmit={
            handleSubmit
          }
          className="
            p-6

            space-y-5
          "
        >

          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div
              className="
                p-4

                rounded-xl

                bg-red-50

                text-red-700

                text-sm
                font-bold
              "
            >
              {error}
            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================== */}

          {success && (
            <div
              className="
                p-4

                rounded-xl

                bg-emerald-50

                text-emerald-700

                text-sm
                font-bold

                flex
                items-center
                gap-2
              "
            >
              <CheckCircle
                className="
                  w-5
                  h-5
                "
              />

              {success}
            </div>
          )}

          {/* =================================================
              EMAIL
          ================================================== */}

          <div>
            <label
              className="
                block

                text-sm
                font-bold
                text-slate-700

                mb-2
              "
            >
              البريد الإلكتروني *
            </label>

            <div className="relative">
              <Mail
                className="
                  absolute

                  right-4
                  top-1/2

                  -translate-y-1/2

                  w-5
                  h-5

                  text-slate-400
                "
              />

              <input
                type="email"
                value={
                  form.email
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "email",
                    event.target.value
                  )
                }
                className={`${inputClass} pr-12`}
                placeholder="admin@example.com"
                dir="ltr"
                required
                disabled={
                  loading
                }
              />
            </div>
          </div>

          {/* =================================================
              PASSWORD
          ================================================== */}

          <div>
            <label
              className="
                block

                text-sm
                font-bold
                text-slate-700

                mb-2
              "
            >
              كلمة المرور *
            </label>

            <div className="relative">
              <Lock
                className="
                  absolute

                  right-4
                  top-1/2

                  -translate-y-1/2

                  w-5
                  h-5

                  text-slate-400
                "
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={
                  form.password
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "password",
                    event.target.value
                  )
                }
                className={`${inputClass} pr-12 pl-12`}
                placeholder="كلمة المرور"
                required
                disabled={
                  loading
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (value) =>
                      !value
                  )
                }
                disabled={
                  loading
                }
                className="
                  absolute

                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-slate-400

                  hover:text-slate-700

                  disabled:opacity-50
                "
              >
                {showPassword ? (
                  <EyeOff
                    className="
                      w-5
                      h-5
                    "
                  />
                ) : (
                  <Eye
                    className="
                      w-5
                      h-5
                    "
                  />
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              CONFIRM PASSWORD
          ================================================== */}

          <div>
            <label
              className="
                block

                text-sm
                font-bold
                text-slate-700

                mb-2
              "
            >
              تأكيد كلمة المرور *
            </label>

            <div className="relative">
              <Lock
                className="
                  absolute

                  right-4
                  top-1/2

                  -translate-y-1/2

                  w-5
                  h-5

                  text-slate-400
                "
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={
                  form.confirmPassword
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "confirmPassword",
                    event.target.value
                  )
                }
                className={`${inputClass} pr-12 pl-12`}
                placeholder="أعد كتابة كلمة المرور"
                required
                disabled={
                  loading
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (value) =>
                      !value
                  )
                }
                disabled={
                  loading
                }
                className="
                  absolute

                  left-4
                  top-1/2

                  -translate-y-1/2

                  text-slate-400

                  hover:text-slate-700

                  disabled:opacity-50
                "
              >
                {showConfirmPassword ? (
                  <EyeOff
                    className="
                      w-5
                      h-5
                    "
                  />
                ) : (
                  <Eye
                    className="
                      w-5
                      h-5
                    "
                  />
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              ROLE
          ================================================== */}

          <div>
            <label
              className="
                block

                text-sm
                font-bold
                text-slate-700

                mb-2
              "
            >
              صلاحية الأدمن *
            </label>

            <div className="relative">
              <ShieldCheck
                className="
                  absolute

                  right-4
                  top-1/2

                  -translate-y-1/2

                  w-5
                  h-5

                  text-slate-400

                  pointer-events-none
                "
              />

         <select
  value={form.role}
  onChange={(event) =>
    handleChange("role", event.target.value)
  }
  className={`${inputClass} pr-12`}
  required
  disabled={loading}
>
  <option value="Manager">
    Manager
  </option>

  <option value="Admin">
    Admin
  </option>
</select>

            </div>

            <p
              className="
                text-xs
                text-slate-500
                mt-2
              "
            >
              اختر مستوى الصلاحية للحساب الجديد
            </p>
          </div>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <div
            className="
              pt-3
            "
          >
            <button
              type="submit"
              disabled={
                loading
              }
              className="
                btn
                btn-primary

                w-full

                py-3

                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <Loader2
                    className="
                      w-5
                      h-5

                      animate-spin
                    "
                  />

                  جاري إضافة الأدمن...
                </>
              ) : (
                <>
                  <UserPlus
                    className="
                      w-5
                      h-5
                    "
                  />

                  إضافة الأدمن
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}