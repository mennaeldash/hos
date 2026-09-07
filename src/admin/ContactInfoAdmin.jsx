import {
  useEffect,
  useState,
} from "react";

import {
  Save,
  Loader2,
  Trash2,
} from "lucide-react";

import {
  getContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
} from "@/services/contact";

import {
  canManageContent,
} from "@/lib/permissions";

/* =========================================================
   EMPTY FORM
========================================================= */

const EMPTY_FORM = {
  id: null,
  email: "",
  phone: "",
  whatsApp: "",
  address: "",
  hours: "",
  mapUrl: "",
};

/* =========================================================
   MAIN
========================================================= */

export default function ContactInfoAdmin() {
  /* =======================================================
     PERMISSIONS
  ======================================================= */

  const userCanManageContent =
    canManageContent();

  /* =======================================================
     STATE
  ======================================================= */

  const [
    form,
    setForm,
  ] = useState(
    EMPTY_FORM
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
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
     LOAD CONTACT INFO
  ======================================================= */

  const loadContactInfo =
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getContactInfo();

        console.log(
          "ADMIN CONTACT INFO:",
          data
        );

        if (!data) {
          setForm(
            EMPTY_FORM
          );

          return;
        }

        setForm({
          id:
            data.id ??
            null,

          email:
            data.email ??
            "",

          phone:
            data.phone ??
            "",

          whatsApp:
            data.whatsApp ??
            data.whatsapp ??
            "",

          address:
            data.address ??
            "",

          hours:
            data.hours ??
            "",

          mapUrl:
            data.mapUrl ??
            data.map_url ??
            "",
        });
      } catch (err) {
        console.error(
          "LOAD CONTACT INFO ERROR:",
          err
        );

        console.error(
          "LOAD CONTACT INFO RESPONSE:",
          err?.response?.data
        );

        setError(
          "حدث خطأ أثناء تحميل معلومات التواصل."
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadContactInfo();
  }, []);

  /* =======================================================
     CHANGE FIELD
     ADMIN ONLY
  ======================================================= */

  const handleChange = (
    field,
    value
  ) => {
    if (
      !userCanManageContent
    ) {
      return;
    }

    setForm(
      (
        previous
      ) => ({
        ...previous,

        [field]:
          value,
      })
    );

    if (success) {
      setSuccess("");
    }

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     SAVE
     ADMIN ONLY
  ======================================================= */

  const handleSave =
    async (
      event
    ) => {
      event.preventDefault();

      if (
        !userCanManageContent
      ) {
        return;
      }

      try {
        setSaving(true);
        setError("");
        setSuccess("");

        const payload = {
          email:
            form.email,

          phone:
            form.phone,

          whatsApp:
            form.whatsApp,

          address:
            form.address,

          hours:
            form.hours,

          mapUrl:
            form.mapUrl,
        };

        if (
          form.id !== null &&
          form.id !== undefined &&
          form.id !== ""
        ) {
          await updateContactInfo(
            form.id,
            payload
          );

          setSuccess(
            "تم تعديل معلومات التواصل بنجاح."
          );
        } else {
          await createContactInfo(
            payload
          );

          setSuccess(
            "تم إضافة معلومات التواصل بنجاح."
          );
        }

        await loadContactInfo();

        window.setTimeout(
          () => {
            setSuccess("");
          },
          3000
        );
      } catch (err) {
        console.error(
          "SAVE CONTACT INFO ERROR:",
          err
        );

        console.error(
          "SAVE CONTACT INFO RESPONSE:",
          err?.response?.data
        );

        const backendMessage =
          err?.response?.data;

        if (
          typeof backendMessage ===
          "string"
        ) {
          setError(
            backendMessage
          );
        } else {
          setError(
            "حدث خطأ أثناء حفظ معلومات التواصل."
          );
        }
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     DELETE
     ADMIN ONLY
  ======================================================= */

  const handleDelete =
    async () => {
      if (
        !userCanManageContent
      ) {
        return;
      }

      if (
        form.id === null ||
        form.id === undefined ||
        form.id === ""
      ) {
        setError(
          "لا توجد بيانات تواصل لحذفها."
        );

        return;
      }

      const confirmed =
        window.confirm(
          "هل أنت متأكد من حذف معلومات التواصل؟"
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeleting(true);
        setError("");
        setSuccess("");

        await deleteContactInfo(
          form.id
        );

        setForm({
          ...EMPTY_FORM,
        });

        setSuccess(
          "تم حذف معلومات التواصل بنجاح."
        );

        window.setTimeout(
          () => {
            setSuccess("");
          },
          3000
        );
      } catch (err) {
        console.error(
          "DELETE CONTACT INFO ERROR:",
          err
        );

        console.error(
          "DELETE CONTACT INFO RESPONSE:",
          err?.response?.data
        );

        const backendMessage =
          err?.response?.data;

        if (
          typeof backendMessage ===
          "string"
        ) {
          setError(
            backendMessage
          );
        } else {
          setError(
            "حدث خطأ أثناء حذف معلومات التواصل."
          );
        }
      } finally {
        setDeleting(false);
      }
    };

  /* =======================================================
     STYLES
  ======================================================= */

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 " +
    "focus:border-primary-500 focus:ring-2 focus:ring-primary-200 " +
    "outline-none transition-all text-slate-800 text-sm " +
    (userCanManageContent
      ? "bg-white"
      : "bg-slate-50 cursor-default");

  const labelClass =
    "block text-sm font-bold text-slate-700 mb-1.5";

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div
        className="
          card
          p-8
          shimmer-bg
          h-64
          rounded-2xl
        "
      />
    );
  }

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="space-y-6">

      <div className="card p-6">

        <div className="mb-6">

          <h3
            className="
              text-lg
              font-bold
              text-slate-800
            "
          >
            معلومات التواصل
          </h3>

          <p
            className="
              text-sm
              text-slate-500
              mt-1
            "
          >
            البيانات الموجودة هنا تظهر في صفحة تواصل معنا بالموقع.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              mb-5
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              font-bold
              text-red-700
            "
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div
            className="
              mb-5
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
              text-sm
              font-bold
              text-green-700
            "
          >
            {success}
          </div>
        )}

        <form
          onSubmit={
            handleSave
          }
          className="space-y-5"
        >

          {/* EMAIL + PHONE */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            <div>

              <label className={labelClass}>
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={
                  form.email
                }
                readOnly={
                  !userCanManageContent
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "email",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
                placeholder="example@email.com"
                dir="ltr"
              />

            </div>

            <div>

              <label className={labelClass}>
                رقم الهاتف
              </label>

              <input
                type="text"
                value={
                  form.phone
                }
                readOnly={
                  !userCanManageContent
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "phone",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
                placeholder="رقم الهاتف"
                dir="ltr"
              />

            </div>

          </div>

          {/* WHATSAPP + HOURS */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            <div>

              <label className={labelClass}>
                رقم الواتساب
              </label>

              <input
                type="text"
                value={
                  form.whatsApp
                }
                readOnly={
                  !userCanManageContent
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "whatsApp",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
                placeholder="رقم الواتساب"
                dir="ltr"
              />

            </div>

            <div>

              <label className={labelClass}>
                ساعات العمل
              </label>

              <input
                type="text"
                value={
                  form.hours
                }
                readOnly={
                  !userCanManageContent
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "hours",
                    event.target.value
                  )
                }
                className={
                  inputClass
                }
                placeholder="مثال: الطوارئ 24 ساعة"
              />

            </div>

          </div>

          {/* ADDRESS */}

          <div>

            <label className={labelClass}>
              العنوان
            </label>

            <textarea
              value={
                form.address
              }
              readOnly={
                !userCanManageContent
              }
              onChange={(
                event
              ) =>
                handleChange(
                  "address",
                  event.target.value
                )
              }
              className={
                inputClass
              }
              rows={3}
              placeholder="عنوان المستشفى"
            />

          </div>

          {/* MAP URL */}

          <div>

            <label className={labelClass}>
              رابط الخريطة
            </label>

            <input
              type="text"
              value={
                form.mapUrl
              }
              readOnly={
                !userCanManageContent
              }
              onChange={(
                event
              ) =>
                handleChange(
                  "mapUrl",
                  event.target.value
                )
              }
              className={
                inputClass
              }
              placeholder="Google Maps Embed URL"
              dir="ltr"
            />

          </div>

          {/* BUTTONS - ADMIN ONLY */}

          {userCanManageContent && (
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                pt-4
                border-t
                border-slate-100
              "
            >

              {/* SAVE */}

              <button
                type="submit"
                disabled={
                  saving ||
                  deleting
                }
                className="
                  btn
                  btn-primary
                  disabled:opacity-50
                "
              >

                {saving ? (
                  <>
                    <Loader2
                      className="
                        w-5
                        h-5
                        animate-spin
                      "
                    />

                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />

                    {form.id
                      ? "حفظ التغييرات"
                      : "إضافة معلومات التواصل"}
                  </>
                )}

              </button>

              {/* DELETE */}

              {form.id !== null &&
                form.id !== undefined &&
                form.id !== "" && (
                  <button
                    type="button"
                    onClick={
                      handleDelete
                    }
                    disabled={
                      saving ||
                      deleting
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      text-red-600
                      font-bold
                      text-sm
                      transition
                      hover:bg-red-600
                      hover:text-white
                      disabled:opacity-50
                    "
                  >

                    {deleting ? (
                      <>
                        <Loader2
                          className="
                            w-5
                            h-5
                            animate-spin
                          "
                        />

                        جاري الحذف...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />

                        حذف معلومات التواصل
                      </>
                    )}

                  </button>
                )}

            </div>
          )}

        </form>

      </div>

    </div>
  );
}