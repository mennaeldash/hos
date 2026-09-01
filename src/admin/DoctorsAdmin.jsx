import { useEffect, useMemo, useState } from "react";

import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
} from "lucide-react";

import PlaceholderImage from "@/components/PlaceholderImage";

import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "@/services/doctors";

import {
  getDepartments,
} from "@/services/departments";


const BACKEND_ORIGIN =
  import.meta.env.VITE_BACKEND_ORIGIN ||
  "http://rewaddashboard.runasp.net";


export default function DoctorsAdmin() {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    FullName: "",
    Specialization: "",
    Biography: "",
    DepartmentId: "",
    Image: null,
  });


  /* ======================================================
     IMAGE URL
  ====================================================== */

  const getDoctorImageUrl = (imageUrl) => {
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
  };


  /* ======================================================
     LOAD DATA
  ====================================================== */

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [doctorsResponse, departmentsResponse] =
        await Promise.all([
          getAllDoctors(),
          getDepartments(),
        ]);

      console.log(
        "DOCTORS RESPONSE:",
        doctorsResponse
      );

      console.log(
        "DEPARTMENTS RESPONSE:",
        departmentsResponse
      );

      setData(
        Array.isArray(doctorsResponse)
          ? doctorsResponse
          : []
      );

      setDepartments(
        Array.isArray(departmentsResponse)
          ? departmentsResponse
          : []
      );

    } catch (err) {
      console.error(
        "FETCH DATA ERROR:",
        err
      );

      console.error(
        "FETCH DATA RESPONSE:",
        err?.response?.data
      );

      setError(
        "حدث خطأ أثناء تحميل بيانات الأطباء."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  /* ======================================================
     SEARCH
  ====================================================== */

  const filtered = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return data;
    }

    return data.filter((doctor) => {
      const fullName = String(
        doctor.fullName ||
        doctor.name ||
        ""
      ).toLowerCase();

      const specialization = String(
        doctor.specialization ||
        doctor.specialty ||
        ""
      ).toLowerCase();

      const departmentName = String(
        doctor.departmentName ||
        doctor.department_name ||
        ""
      ).toLowerCase();

      const biography = String(
        doctor.biography ||
        doctor.bio ||
        ""
      ).toLowerCase();

      return (
        fullName.includes(value) ||
        specialization.includes(value) ||
        departmentName.includes(value) ||
        biography.includes(value)
      );
    });

  }, [data, search]);


  /* ======================================================
     OPEN ADD
  ====================================================== */

  const openAdd = () => {
    setEditing(null);

    setForm({
      FullName: "",
      Specialization: "",
      Biography: "",
      DepartmentId: "",
      Image: null,
    });

    setError("");
    setModalOpen(true);
  };


  /* ======================================================
     OPEN EDIT
  ====================================================== */

  const openEdit = (doctor) => {
    console.log(
      "EDIT DOCTOR:",
      doctor
    );

    setEditing(doctor);

    setForm({
      FullName:
        doctor.fullName ||
        doctor.name ||
        "",

      Specialization:
        doctor.specialization ||
        doctor.specialty ||
        "",

      Biography:
        doctor.biography ||
        doctor.bio ||
        "",

      DepartmentId:
        doctor.departmentId ??
        doctor.department_id ??
        "",

      Image: null,
    });

    setError("");
    setModalOpen(true);
  };


  /* ======================================================
     SAVE
  ====================================================== */

  const handleSave = async (event) => {
    event.preventDefault();

    if (!form.FullName.trim()) {
      setError(
        "من فضلك أدخل اسم الطبيب."
      );

      return;
    }

    if (
      form.DepartmentId === "" ||
      form.DepartmentId === null ||
      form.DepartmentId === undefined
    ) {
      setError(
        "من فضلك اختر القسم."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        FullName:
          form.FullName.trim(),

        Specialization:
          form.Specialization.trim(),

        Biography:
          form.Biography.trim(),

        DepartmentId:
          Number(form.DepartmentId),

        Image:
          form.Image,
      };


      if (editing) {
        if (
          editing.id === null ||
          editing.id === undefined
        ) {
          throw new Error(
            "Doctor ID not found"
          );
        }

        console.log(
          "UPDATE DOCTOR ID:",
          editing.id
        );

        console.log(
          "UPDATE PAYLOAD:",
          payload
        );

        await updateDoctor(
          editing.id,
          payload
        );

      } else {
        console.log(
          "CREATE DOCTOR:",
          payload
        );

        await createDoctor(
          payload
        );
      }


      setModalOpen(false);
      setEditing(null);

      await fetchData();

    } catch (err) {
      console.error(
        "SAVE DOCTOR ERROR:",
        err
      );

      console.error(
        "SAVE DOCTOR RESPONSE:",
        err?.response?.data
      );

      const backendMessage =
        err?.response?.data;

      if (
        typeof backendMessage ===
        "string"
      ) {
        setError(backendMessage);
      } else {
        setError(
          editing
            ? "حدث خطأ أثناء تعديل الطبيب."
            : "حدث خطأ أثناء إضافة الطبيب."
        );
      }

    } finally {
      setSaving(false);
    }
  };


  /* ======================================================
     DELETE
  ====================================================== */

  const handleDelete = async (
    doctor
  ) => {
    if (
      doctor.id === null ||
      doctor.id === undefined
    ) {
      window.alert(
        "لا يوجد ID لهذا الطبيب."
      );

      return;
    }

    const name =
      doctor.fullName ||
      doctor.name ||
      "الطبيب";

    const confirmed =
      window.confirm(
        `هل أنت متأكد من حذف "${name}"؟`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoctor(
        doctor.id
      );

      await fetchData();

    } catch (err) {
      console.error(
        "DELETE DOCTOR ERROR:",
        err
      );

      console.error(
        "DELETE DOCTOR RESPONSE:",
        err?.response?.data
      );

      const message =
        err?.response?.data;

      window.alert(
        typeof message === "string"
          ? message
          : "حدث خطأ أثناء حذف الطبيب."
      );
    }
  };


  /* ======================================================
     STYLES
  ====================================================== */

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";

  const labelClass =
    "block text-sm font-bold text-slate-700 mb-1.5";


  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">

        <div className="relative flex-1 max-w-md">

          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <input
            type="text"
            placeholder="ابحث عن طبيب..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            className={`${inputClass} pr-11`}
          />

        </div>


        {/* ADD BUTTON - متفعل */}

        <button
          type="button"
          onClick={openAdd}
          className="btn btn-primary shrink-0"
        >
          <Plus className="w-5 h-5" />

          إضافة طبيب
        </button>

      </div>


      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && !modalOpen && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </div>
      )}


      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {Array.from({
            length: 6,
          }).map((_, index) => (

            <div
              key={index}
              className="card p-6 shimmer-bg h-64 rounded-2xl"
            />

          ))}

        </div>

      ) : filtered.length === 0 ? (

        <div className="card p-10 text-center">

          <p className="font-bold text-slate-700">
            {search
              ? "لا توجد نتائج مطابقة للبحث"
              : "لا يوجد أطباء لعرضهم حالياً"}
          </p>

        </div>

      ) : (

        /* =====================================================
            DOCTORS GRID
        ====================================================== */

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {filtered.map(
            (doctor, index) => {

              const id =
                doctor.id;

              const fullName =
                doctor.fullName ||
                doctor.name ||
                "بدون اسم";

              const specialization =
                doctor.specialization ||
                doctor.specialty ||
                "التخصص غير محدد";

              const departmentName =
                doctor.departmentName ||
                doctor.department_name ||
                "القسم غير محدد";

              const biography =
                doctor.biography ||
                doctor.bio ||
                "";

              const status =
                doctor.status ||
                "";

              const rawImage =
                doctor.imageUrl ||
                doctor.image_url ||
                "";

              const imageUrl =
                getDoctorImageUrl(
                  rawImage
                );

              const isActive =
                String(status)
                  .toLowerCase() ===
                "active";


              return (
                <div
                  key={
                    id ??
                    `${fullName}-${index}`
                  }
                  className="card p-5 group"
                >

                  {/* DOCTOR DATA */}

                  <div className="text-center">

                    <PlaceholderImage
                      type="doctor"
                      src={imageUrl}
                      alt={fullName}
                      className="w-20 h-20 mx-auto mb-3"
                      rounded="rounded-full"
                    />


                    <h3 className="font-bold text-slate-800">
                      {fullName}
                    </h3>


                    <p className="text-sm text-primary-600 font-bold mt-1">
                      {specialization}
                    </p>


                    <p className="text-xs text-slate-500 mt-2">
                      {departmentName}
                    </p>


                    {biography && (
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-5">
                        {biography}
                      </p>
                    )}


                    {status && (
                      <span
                        className={`inline-flex mt-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isActive
                            ? "bg-success-100 text-success-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isActive
                          ? "نشط"
                          : "غير نشط"}
                      </span>
                    )}

                  </div>


                  {/* =================================================
                      ACTIONS - دلوقتي شغالة
                  ================================================== */}

                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">

                    <button
                      type="button"
                      onClick={() =>
                        openEdit(
                          doctor
                        )
                      }
                      className="flex-1 btn btn-secondary text-xs py-2 px-2"
                    >
                      <Edit2 className="w-3.5 h-3.5" />

                      تعديل
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          doctor
                        )
                      }
                      title="حذف الطبيب"
                      className="px-3 py-2 rounded-xl bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

      )}


      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}

      {modalOpen && (

        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50"
          onClick={() => {
            if (!saving) {
              setModalOpen(false);
            }
          }}
        >

          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">

              <h3 className="text-xl font-extrabold text-slate-800">

                {editing
                  ? "تعديل بيانات الطبيب"
                  : "إضافة طبيب جديد"}

              </h3>


              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  setModalOpen(false)
                }
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSave}
              className="p-6 space-y-5"
            >

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {error}
                </div>
              )}


              {/* FULL NAME */}

              <div>

                <label className={labelClass}>
                  اسم الطبيب *
                </label>

                <input
                  type="text"
                  required
                  value={
                    form.FullName
                  }
                  onChange={(event) =>
                    setForm({
                      ...form,

                      FullName:
                        event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="اسم الطبيب"
                />

              </div>


              {/* SPECIALIZATION */}

              <div>

                <label className={labelClass}>
                  التخصص
                </label>

                <input
                  type="text"
                  value={
                    form.Specialization
                  }
                  onChange={(event) =>
                    setForm({
                      ...form,

                      Specialization:
                        event.target.value,
                    })
                  }
                  className={inputClass}
                  placeholder="مثال: استشاري جراحة العظام"
                />

              </div>


              {/* DEPARTMENT */}

              <div>

                <label className={labelClass}>
                  القسم *
                </label>

                <select
                  required
                  value={
                    form.DepartmentId
                  }
                  onChange={(event) =>
                    setForm({
                      ...form,

                      DepartmentId:
                        event.target.value,
                    })
                  }
                  className={inputClass}
                >

                  <option value="">
                    اختر القسم...
                  </option>


                  {departments.map(
                    (
                      department,
                      index
                    ) => {

                      const id =
                        department.id ??
                        department.Id;

                      const name =
                        department.name ??
                        department.Name ??
                        "قسم";

                      return (
                        <option
                          key={
                            id ??
                            index
                          }
                          value={id}
                        >
                          {name}
                        </option>
                      );
                    }
                  )}

                </select>

              </div>


              {/* BIOGRAPHY */}

              <div>

                <label className={labelClass}>
                  السيرة الذاتية
                </label>

                <textarea
                  value={
                    form.Biography
                  }
                  onChange={(event) =>
                    setForm({
                      ...form,

                      Biography:
                        event.target.value,
                    })
                  }
                  className={inputClass}
                  rows={4}
                  placeholder="نبذة عن الطبيب..."
                />

              </div>


              {/* IMAGE */}

              <div>

                <label className={labelClass}>
                  صورة الطبيب
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setForm({
                      ...form,

                      Image:
                        event.target
                          .files?.[0] ||
                        null,
                    })
                  }
                  className={inputClass}
                />

                {editing && (
                  <p className="text-xs text-slate-400 mt-2">
                    إذا لم تختَر صورة جديدة سيتم الاحتفاظ بالصورة الحالية.
                  </p>
                )}

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-4 border-t border-slate-100">

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary flex-1 disabled:opacity-50"
                >

                  {saving
                    ? "جاري الحفظ..."
                    : editing
                    ? "حفظ التعديلات"
                    : "إضافة الطبيب"}

                </button>


                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    setModalOpen(false)
                  }
                  className="btn btn-secondary"
                >
                  إلغاء
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}