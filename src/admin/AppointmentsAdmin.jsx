import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Filter,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Stethoscope,
  Users,
} from "lucide-react";

import PlaceholderImage from "@/components/PlaceholderImage";

import {
  useDepartments,
  useDoctors,
} from "@/lib/hooks";

import {
  deleteAppointment,
  getAppointments,
} from "@/services/appointments";

import {
  canManageContent,
} from "@/lib/permissions";

const PAGE_SIZE = 10;

/* =========================================================
   HELPERS
========================================================= */

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ");

const sameId = (
  first,
  second
) => {
  if (
    first === null ||
    first === undefined ||
    first === "" ||
    second === null ||
    second === undefined ||
    second === ""
  ) {
    return false;
  }

  return (
    String(first) ===
    String(second)
  );
};

/* =========================================================
   MAIN
========================================================= */

export default function AppointmentsAdmin() {
  /* =======================================================
     PERMISSIONS
  ======================================================= */

  const canDeleteAppointments =
    canManageContent();

  /* =======================================================
     DEPARTMENTS
  ======================================================= */

  const {
    data: departments = [],
    loading: departmentsLoading,
  } = useDepartments();

  /* =======================================================
     DOCTORS
  ======================================================= */

  const {
    data: doctors = [],
    loading: doctorsLoading,
  } = useDoctors();

  /* =======================================================
     APPOINTMENTS
  ======================================================= */

  const [
    appointments,
    setAppointments,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  /* =======================================================
     SEARCH
  ======================================================= */

  const [
    search,
    setSearch,
  ] = useState("");

  /* =======================================================
     DEPARTMENT FILTER
  ======================================================= */

  const [
    selectedDepartmentId,
    setSelectedDepartmentId,
  ] = useState("all");

  /* =======================================================
     DOCTOR FILTER
  ======================================================= */

  const [
    selectedDoctorId,
    setSelectedDoctorId,
  ] = useState(null);

  /* =======================================================
     SORTING
  ======================================================= */

  const [
    sortField,
    setSortField,
  ] = useState(
    "appointment_date"
  );

  const [
    sortDir,
    setSortDir,
  ] = useState("desc");

  /* =======================================================
     PAGINATION
  ======================================================= */

  const [
    page,
    setPage,
  ] = useState(0);

  /* =======================================================
     FETCH APPOINTMENTS
  ======================================================= */

  const fetchData = async () => {
    setLoading(true);

    try {
      const data =
        await getAppointments();

      setAppointments(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "GET APPOINTMENTS ERROR:",
        error
      );

      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* =======================================================
     SELECTED DEPARTMENT
  ======================================================= */

  const selectedDepartment =
    useMemo(() => {
      if (
        selectedDepartmentId ===
        "all"
      ) {
        return null;
      }

      return (
        departments.find(
          (department) =>
            sameId(
              department.id,
              selectedDepartmentId
            )
        ) || null
      );
    }, [
      departments,
      selectedDepartmentId,
    ]);

  /* =======================================================
     DOCTORS OF SELECTED DEPARTMENT
  ======================================================= */

  const departmentDoctors =
    useMemo(() => {
      if (
        selectedDepartmentId ===
        "all"
      ) {
        return [];
      }

      return doctors.filter(
        (doctor) => {
          /* =============================================
             PRIMARY:
             Department ID
          ============================================== */

          if (
            doctor.department_id !==
              null &&
            doctor.department_id !==
              undefined &&
            doctor.department_id !==
              ""
          ) {
            return sameId(
              doctor.department_id,
              selectedDepartmentId
            );
          }

          /* =============================================
             FALLBACK:
             Department Name
          ============================================== */

          return (
            normalizeText(
              doctor.department_name
            ) ===
            normalizeText(
              selectedDepartment?.name
            )
          );
        }
      );
    }, [
      doctors,
      selectedDepartmentId,
      selectedDepartment,
    ]);

  /* =======================================================
     SELECTED DOCTOR
  ======================================================= */

  const selectedDoctor =
    useMemo(() => {
      if (!selectedDoctorId) {
        return null;
      }

      return (
        departmentDoctors.find(
          (doctor) =>
            sameId(
              doctor.id,
              selectedDoctorId
            )
        ) || null
      );
    }, [
      departmentDoctors,
      selectedDoctorId,
    ]);

  /* =======================================================
     CHANGE DEPARTMENT
  ======================================================= */

  const handleDepartmentChange = (
    value
  ) => {
    setSelectedDepartmentId(
      value
    );

    /*
      لما نغير القسم
      نشيل الدكتور المختار القديم.
    */

    setSelectedDoctorId(null);

    setPage(0);
  };

  /* =======================================================
     FILTER APPOINTMENTS
  ======================================================= */

  const filtered =
    useMemo(() => {
      const searchValue =
        normalizeText(search);

      let result =
        appointments.filter(
          (appointment) => {
            /* ===========================================
               SEARCH
            ============================================ */

            const matchesSearch =
              !searchValue ||
              normalizeText(
                appointment.full_name
              ).includes(
                searchValue
              ) ||
              normalizeText(
                appointment.phone
              ).includes(
                searchValue
              ) ||
              normalizeText(
                appointment.doctor
              ).includes(
                searchValue
              ) ||
              normalizeText(
                appointment.department
              ).includes(
                searchValue
              );

            /* ===========================================
               DEPARTMENT
            ============================================ */

            let matchesDepartment =
              true;

            if (
              selectedDepartmentId !==
              "all"
            ) {
              if (
                appointment.department_id !==
                  null &&
                appointment.department_id !==
                  undefined &&
                appointment.department_id !==
                  ""
              ) {
                matchesDepartment =
                  sameId(
                    appointment.department_id,
                    selectedDepartmentId
                  );
              } else {
                matchesDepartment =
                  normalizeText(
                    appointment.department
                  ) ===
                  normalizeText(
                    selectedDepartment?.name
                  );
              }
            }

            /* ===========================================
               DOCTOR
            ============================================ */

            let matchesDoctor =
              true;

            if (
              selectedDoctorId
            ) {
              if (
                appointment.doctor_id !==
                  null &&
                appointment.doctor_id !==
                  undefined &&
                appointment.doctor_id !==
                  ""
              ) {
                matchesDoctor =
                  sameId(
                    appointment.doctor_id,
                    selectedDoctorId
                  );
              } else {
                matchesDoctor =
                  normalizeText(
                    appointment.doctor
                  ) ===
                  normalizeText(
                    selectedDoctor?.name
                  );
              }
            }

            return (
              matchesSearch &&
              matchesDepartment &&
              matchesDoctor
            );
          }
        );

      /* =============================================
         SORT
      ============================================== */

      result.sort(
        (a, b) => {
          let aValue =
            a[sortField] ||
            "";

          let bValue =
            b[sortField] ||
            "";

          if (
            sortField ===
            "full_name"
          ) {
            const compare =
              String(
                aValue
              ).localeCompare(
                String(
                  bValue
                ),
                "ar"
              );

            return sortDir ===
              "asc"
              ? compare
              : -compare;
          }

          const compare =
            String(
              aValue
            ).localeCompare(
              String(
                bValue
              )
            );

          return sortDir ===
            "asc"
            ? compare
            : -compare;
        }
      );

      return result;
    }, [
      appointments,
      search,
      selectedDepartmentId,
      selectedDepartment,
      selectedDoctorId,
      selectedDoctor,
      sortField,
      sortDir,
    ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages =
    Math.ceil(
      filtered.length /
        PAGE_SIZE
    );

  const pagedData =
    filtered.slice(
      page * PAGE_SIZE,
      (page + 1) *
        PAGE_SIZE
    );

  useEffect(() => {
    if (
      totalPages === 0
    ) {
      setPage(0);

      return;
    }

    if (
      page >
      totalPages - 1
    ) {
      setPage(
        totalPages - 1
      );
    }
  }, [
    totalPages,
    page,
  ]);

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete =
    async (id) => {
      if (!canDeleteAppointments) {
        return;
      }

      const confirmed =
        window.confirm(
          "هل أنت متأكد من حذف هذا الموعد؟"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteAppointment(
          id
        );

        await fetchData();
      } catch (error) {
        console.error(
          "DELETE APPOINTMENT ERROR:",
          error
        );

        alert(
          "حدث خطأ أثناء حذف الموعد"
        );
      }
    };

  /* =======================================================
     SORT
  ======================================================= */

  const toggleSort = (
    field
  ) => {
    if (
      sortField === field
    ) {
      setSortDir(
        sortDir === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(
        field
      );

      setSortDir("asc");
    }
  };

  /* =======================================================
     INPUT STYLE
  ======================================================= */

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 " +
    "focus:border-primary-500 focus:ring-2 focus:ring-primary-200 " +
    "outline-none transition-all bg-white text-slate-800 text-sm";

  /* =======================================================
     SORT ICON
  ======================================================= */

  const SortIcon = ({
    field,
  }) => {
    if (
      sortField !== field
    ) {
      return (
        <ChevronDown
          className="
            w-3.5
            h-3.5
            text-slate-300
            inline
          "
        />
      );
    }

    if (
      sortDir === "asc"
    ) {
      return (
        <ChevronUp
          className="
            w-3.5
            h-3.5
            text-primary-600
            inline
          "
        />
      );
    }

    return (
      <ChevronDown
        className="
          w-3.5
          h-3.5
          text-primary-600
          inline
        "
      />
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* =================================================
          SEARCH + DEPARTMENT FILTER
      ================================================== */}

      <div className="card p-5">

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >

          {/* SEARCH */}

          <div
            className="
              relative
              flex-1
            "
          >

            <Search
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2

                w-5
                h-5

                text-slate-400
              "
            />

            <input
              type="text"
              placeholder="ابحث باسم المريض أو الهاتف أو الطبيب أو القسم..."
              value={search}
              onChange={(
                event
              ) => {
                setSearch(
                  event.target.value
                );

                setPage(0);
              }}
              className={`${inputClass} pr-11`}
            />

          </div>

          {/* DEPARTMENT FILTER */}

          <div
            className="
              flex
              items-center
              gap-2

              md:w-[280px]
            "
          >

            <Filter
              className="
                w-5
                h-5
                text-slate-400
                shrink-0
              "
            />

            <select
              value={
                selectedDepartmentId
              }
              onChange={(
                event
              ) =>
                handleDepartmentChange(
                  event.target.value
                )
              }
              className={
                inputClass
              }
              disabled={
                departmentsLoading
              }
            >

              <option value="all">
                كل الأقسام
              </option>

              {departments.map(
                (
                  department
                ) => (
                  <option
                    key={
                      department.id
                    }
                    value={
                      department.id
                    }
                  >
                    {
                      department.name
                    }
                  </option>
                )
              )}

            </select>

          </div>

        </div>

      </div>

      {/* =================================================
          DOCTORS CARDS
      ================================================== */}

      {selectedDepartmentId !==
        "all" && (

        <div className="card p-5">

          {/* TITLE */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4

              mb-5
            "
          >

            <div>

              <h3
                className="
                  text-lg
                  font-extrabold
                  text-slate-800
                "
              >
                أطباء{" "}
                {
                  selectedDepartment
                    ?.name
                }
              </h3>

              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                "
              >
                اختر الطبيب لعرض
                المرضى الحاجزين عنده
              </p>

            </div>

            {selectedDoctorId && (

              <button
                type="button"
                onClick={() => {
                  setSelectedDoctorId(
                    null
                  );

                  setPage(0);
                }}
                className="
                  text-sm
                  font-bold

                  text-primary-600

                  hover:text-primary-700
                "
              >
                عرض كل حجوزات القسم
              </button>

            )}

          </div>

          {/* DOCTORS */}

          {doctorsLoading ? (

            <div
              className="
                flex
                gap-4
                overflow-x-auto
                pb-2
              "
            >

              {Array.from({
                length: 4,
              }).map(
                (_, index) => (

                  <div
                    key={index}
                    className="
                      shrink-0

                      w-[220px]
                      h-[110px]

                      rounded-2xl

                      shimmer-bg
                    "
                  />

                )
              )}

            </div>

          ) : departmentDoctors.length ===
            0 ? (

            <div
              className="
                py-8
                text-center
                text-slate-500
              "
            >
              لا يوجد أطباء في هذا
              القسم حالياً
            </div>

          ) : (

            <div
              className="
                flex
                gap-4

                overflow-x-auto

                pb-3

                [scrollbar-width:thin]
              "
            >

              {/* ALL DOCTORS */}

              <button
                type="button"
                onClick={() => {
                  setSelectedDoctorId(
                    null
                  );

                  setPage(0);
                }}
                className={`
                  shrink-0

                  min-w-[190px]

                  rounded-2xl

                  border-2

                  p-4

                  flex
                  items-center
                  gap-3

                  text-right

                  transition-all

                  ${
                    !selectedDoctorId
                      ? `
                        border-[#197786]
                        bg-[#D1F9FC]/50
                        shadow-[0_8px_20px_rgba(25,119,134,0.12)]
                      `
                      : `
                        border-slate-200
                        bg-white
                        hover:border-[#83BDC4]
                      `
                  }
                `}
              >

                <div
                  className="
                    w-12
                    h-12

                    rounded-xl

                    bg-[#D1F9FC]

                    text-[#197786]

                    flex
                    items-center
                    justify-center

                    shrink-0
                  "
                >

                  <Users
                    className="
                      w-6
                      h-6
                    "
                  />

                </div>

                <div>

                  <p
                    className="
                      font-extrabold
                      text-slate-800
                      text-sm
                    "
                  >
                    كل أطباء القسم
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-500
                      mt-1
                    "
                  >
                    كل الحجوزات
                  </p>

                </div>

              </button>

              {/* DOCTOR CARDS */}

              {departmentDoctors.map(
                (doctor) => {

                  const isSelected =
                    sameId(
                      doctor.id,
                      selectedDoctorId
                    );

                  return (

                    <button
                      type="button"
                      key={
                        doctor.id ??
                        doctor.name
                      }
                      onClick={() => {
                        setSelectedDoctorId(
                          doctor.id
                        );

                        setPage(0);
                      }}
                      className={`
                        shrink-0

                        min-w-[240px]
                        max-w-[280px]

                        rounded-2xl

                        border-2

                        p-4

                        flex
                        items-center
                        gap-3

                        text-right

                        transition-all
                        duration-300

                        ${
                          isSelected
                            ? `
                              border-[#197786]
                              bg-[#D1F9FC]/40
                              shadow-[0_10px_25px_rgba(25,119,134,0.14)]
                            `
                            : `
                              border-slate-200
                              bg-white
                              hover:border-[#83BDC4]
                              hover:-translate-y-1
                              hover:shadow-md
                            `
                        }
                      `}
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          w-14
                          h-14

                          rounded-full

                          p-[2px]

                          bg-gradient-to-br
                          from-[#197786]
                          to-[#83BDC4]

                          shrink-0
                        "
                      >

                        <PlaceholderImage
                          type="doctor"
                          src={
                            doctor.image_url
                          }
                          alt={
                            doctor.name
                          }
                          className="
                            w-full
                            h-full
                          "
                          rounded="rounded-full"
                          objectFit="object-cover"
                        />

                      </div>

                      {/* DOCTOR DATA */}

                      <div
                        className="
                          min-w-0
                        "
                      >

                        <p
                          className="
                            font-extrabold
                            text-slate-800
                            text-sm

                            truncate
                          "
                        >
                          {
                            doctor.name
                          }
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#197786]
                            font-bold

                            mt-1

                            line-clamp-2
                          "
                        >
                          {doctor.specialty ||
                            "طبيب بالقسم"}
                        </p>

                      </div>

                    </button>

                  );
                }
              )}

            </div>

          )}

        </div>

      )}

      {/* =================================================
          FILTER INFO
      ================================================== */}

      {(selectedDepartment ||
        selectedDoctor) && (

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >

          {selectedDepartment && (

            <span
              className="
                px-3
                py-1.5

                rounded-lg

                bg-slate-200

                text-slate-700

                text-xs
                font-bold
              "
            >
              القسم:{" "}
              {
                selectedDepartment.name
              }
            </span>

          )}

          {selectedDoctor && (

            <span
              className="
                px-3
                py-1.5

                rounded-lg

                bg-[#D1F9FC]

                text-[#197786]

                text-xs
                font-bold
              "
            >
              الطبيب:{" "}
              {
                selectedDoctor.name
              }
            </span>

          )}

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {filtered.length} حجز
          </span>

        </div>

      )}

      {/* =================================================
          APPOINTMENTS TABLE
      ================================================== */}

      <div
        className="
          card
          overflow-hidden
        "
      >

        {loading ? (

          <div
            className="
              p-8
              space-y-3
            "
          >

            {Array.from({
              length: 5,
            }).map(
              (_, index) => (

                <div
                  key={index}
                  className="
                    h-16
                    shimmer-bg
                    rounded-xl
                  "
                />

              )
            )}

          </div>

        ) : pagedData.length ===
          0 ? (

          <div
            className="
              p-12
              text-center
            "
          >

            <Stethoscope
              className="
                w-10
                h-10

                mx-auto

                text-slate-300

                mb-3
              "
            />

            <p
              className="
                text-slate-500
                font-bold
              "
            >
              {selectedDoctor
                ? `لا توجد حجوزات عند ${selectedDoctor.name}`
                : selectedDepartment
                ? `لا توجد حجوزات في قسم ${selectedDepartment.name}`
                : "لا توجد مواعيد"}
            </p>

          </div>

        ) : (

          <div
            className="
              overflow-x-auto
            "
          >

           <table className="w-full table-fixed">

  {/* ================================
      HEADER
  ================================= */}

  <thead className="bg-slate-50 border-b border-slate-200">
    <tr>

      {/* PATIENT */}
      <th
        className="
          p-4
          text-center
          font-bold
          text-slate-700
          text-sm
          cursor-pointer
          hover:bg-slate-100
        "
        onClick={() =>
          toggleSort("full_name")
        }
      >
        المريض{" "}
        <SortIcon field="full_name" />
      </th>

      {/* DOCTOR */}
      <th
        className="
          p-4
          text-center
          font-bold
          text-slate-700
          text-sm
          hidden
          md:table-cell
        "
      >
        الطبيب
      </th>

      {/* DEPARTMENT */}
      <th
        className="
          p-4
          text-center
          font-bold
          text-slate-700
          text-sm
          hidden
          lg:table-cell
        "
      >
        القسم
      </th>

      {/* DATE */}
      <th
        className="
          p-4
          text-center
          font-bold
          text-slate-700
          text-sm
          cursor-pointer
          hover:bg-slate-100
        "
        onClick={() =>
          toggleSort("appointment_date")
        }
      >
        التاريخ{" "}
        <SortIcon field="appointment_date" />
      </th>

      {/* TIME */}
      <th
        className="
          p-4
          text-center
          font-bold
          text-slate-700
          text-sm
          hidden
          md:table-cell
        "
      >
        الوقت
      </th>

      {/* PHONE */}
      <th
        className="
          p-4
          text-center
          font-bold
          text-slate-700
          text-sm
          hidden
          lg:table-cell
        "
      >
        الهاتف
      </th>

      {/* DELETE - ADMIN ONLY */}
      {canDeleteAppointments && (
        <th
          className="
            p-4
            text-center
            font-bold
            text-slate-700
            text-sm
          "
        >
          حذف
        </th>
      )}

    </tr>
  </thead>

  {/* ================================
      BODY
  ================================= */}

  <tbody>
    {pagedData.map((appointment) => (

      <tr
        key={appointment.id}
        className="
          border-b
          border-slate-100
          hover:bg-slate-50
          transition-colors
        "
      >

        {/* PATIENT */}
        <td className="p-4 text-center">
          <p className="font-bold text-slate-800 text-sm">
            {appointment.full_name || "-"}
          </p>
        </td>

        {/* DOCTOR */}
        <td
          className="
            p-4
            text-center
            text-sm
            text-slate-600
            hidden
            md:table-cell
          "
        >
          {appointment.doctor || "-"}
        </td>

        {/* DEPARTMENT */}
        <td
          className="
            p-4
            text-center
            text-sm
            text-slate-600
            hidden
            lg:table-cell
          "
        >
          {appointment.department || "-"}
        </td>

        {/* DATE */}
        <td
          className="
            p-4
            text-center
            text-sm
            text-slate-600
          "
        >
          {appointment.appointment_date || "-"}
        </td>

        {/* TIME */}
        <td
          className="
            p-4
            text-center
            text-sm
            text-slate-600
            hidden
            md:table-cell
          "
          dir="ltr"
        >
          {appointment.appointment_time || "-"}
        </td>

        {/* PHONE */}
        <td
          className="
            p-4
            text-center
            text-sm
            text-slate-600
            hidden
            lg:table-cell
          "
          dir="ltr"
        >
          {appointment.phone || "-"}
        </td>

        {/* DELETE - ADMIN ONLY */}
        {canDeleteAppointments && (
          <td className="p-4 text-center">
            <button
              type="button"
              onClick={() =>
                handleDelete(appointment.id)
              }
              title="حذف الموعد"
              className="
                inline-flex
                items-center
                justify-center
                w-9
                h-9
                rounded-xl
                bg-error-50
                text-error-600
                hover:bg-error-600
                hover:text-white
                transition-all
              "
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </td>
        )}

      </tr>
    ))}
  </tbody>

</table>
          </div>

        )}

        {/* =================================================
            PAGINATION
        ================================================== */}

        {totalPages > 1 && (

          <div
            className="
              flex
              items-center
              justify-between

              p-4

              border-t
              border-slate-100
            "
          >

            <span
              className="
                text-sm
                text-slate-500
              "
            >
              صفحة {page + 1} من{" "}
              {totalPages} (
              {filtered.length} موعد)
            </span>

            <div
              className="
                flex
                gap-2
              "
            >

              <button
                type="button"
                onClick={() =>
                  setPage(
                    Math.max(
                      0,
                      page - 1
                    )
                  )
                }
                disabled={
                  page === 0
                }
                className="
                  p-2

                  rounded-lg

                  bg-slate-100

                  hover:bg-slate-200

                  disabled:opacity-50

                  transition-all
                "
              >

                <ChevronRight
                  className="
                    w-4
                    h-4
                  "
                />

              </button>

              <button
                type="button"
                onClick={() =>
                  setPage(
                    Math.min(
                      totalPages -
                        1,
                      page + 1
                    )
                  )
                }
                disabled={
                  page >=
                  totalPages - 1
                }
                className="
                  p-2

                  rounded-lg

                  bg-slate-100

                  hover:bg-slate-200

                  disabled:opacity-50

                  transition-all
                "
              >

                <ChevronLeft
                  className="
                    w-4
                    h-4
                  "
                />

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}