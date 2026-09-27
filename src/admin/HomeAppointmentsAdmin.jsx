import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Filter,
  Trash2,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  deleteHomeAppointment,
  getHomeAppointments,
  HOME_SERVICE_LABELS,
} from "@/services/homeapp";

import {
  canManageContent,
} from "@/lib/permissions";

const PAGE_SIZE = 10;

/* =========================================================
   HELPERS
========================================================= */

const normalizeText = (
  value
) =>
  String(
    value || ""
  )
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/\s+/g, " ");

const getServiceLabel = (
  serviceType
) => {
  return (
    HOME_SERVICE_LABELS[
      serviceType
    ] ||
    serviceType ||
    "-"
  );
};

const formatDate = (
  value
) => {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "-";
  }

  return new Intl.DateTimeFormat(
    "ar-EG",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
};

/* =========================================================
   MAIN
========================================================= */

export default function HomeAppointmentsAdmin() {
  const canDelete =
    canManageContent();

  const [
    appointments,
    setAppointments,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedService,
    setSelectedService,
  ] = useState("all");

  const [
    page,
    setPage,
  ] = useState(0);

  /* =======================================================
     FETCH
  ======================================================= */

  const fetchData =
    async () => {
      try {
        setLoading(
          true
        );

        setError(
          ""
        );

        const data =
          await getHomeAppointments();

        setAppointments(
          Array.isArray(
            data
          )
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "HOME APPOINTMENTS ADMIN ERROR:",
          error
        );

        setAppointments(
          []
        );

        setError(
          "تعذر تحميل طلبات الحجز المنزلي"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  /* =======================================================
     SERVICE OPTIONS FROM REAL DATA
  ======================================================= */

  const serviceOptions =
    useMemo(() => {
      return [
        ...new Set(
          appointments
            .map(
              (
                appointment
              ) =>
                appointment.serviceType
            )
            .filter(Boolean)
        ),
      ];
    }, [
      appointments,
    ]);

  /* =======================================================
     FILTER
  ======================================================= */

  const filtered =
    useMemo(() => {
      const searchValue =
        normalizeText(
          search
        );

      return appointments
        .filter(
          (
            appointment
          ) => {
            const matchesSearch =
              !searchValue ||
              normalizeText(
                appointment.patientName
              ).includes(
                searchValue
              ) ||
              normalizeText(
                appointment.patientPhone
              ).includes(
                searchValue
              ) ||
              normalizeText(
                appointment.address
              ).includes(
                searchValue
              ) ||
              normalizeText(
                appointment.caseDescription
              ).includes(
                searchValue
              ) ||
              normalizeText(
                getServiceLabel(
                  appointment.serviceType
                )
              ).includes(
                searchValue
              );

            const matchesService =
              selectedService ===
                "all" ||
              appointment.serviceType ===
                selectedService;

            return (
              matchesSearch &&
              matchesService
            );
          }
        )
        .sort(
          (
            a,
            b
          ) => {
            const aDate =
              new Date(
                a.createdAt ||
                  0
              ).getTime();

            const bDate =
              new Date(
                b.createdAt ||
                  0
              ).getTime();

            return (
              bDate -
              aDate
            );
          }
        );
    }, [
      appointments,
      search,
      selectedService,
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
    page,
    totalPages,
  ]);

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete =
    async (
      id
    ) => {
      if (
        !canDelete
      ) {
        return;
      }

      const confirmed =
        window.confirm(
          "هل أنت متأكد من حذف طلب الحجز المنزلي؟"
        );

      if (
        !confirmed
      ) {
        return;
      }

      try {
        await deleteHomeAppointment(
          id
        );

        await fetchData();
      } catch (error) {
        console.error(
          "DELETE HOME APPOINTMENT ERROR:",
          error
        );

        alert(
          "حدث خطأ أثناء حذف الطلب"
        );
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
     UI
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* ================================================
          SEARCH + FILTER
      ================================================= */}

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
              placeholder="ابحث بالاسم أو الهاتف أو العنوان أو نوع الخدمة..."
              value={
                search
              }
              onChange={(
                event
              ) => {
                setSearch(
                  event.target.value
                );

                setPage(
                  0
                );
              }}
              className={`${inputClass} pr-11`}
            />
          </div>

          {/* SERVICE FILTER */}

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
                selectedService
              }
              onChange={(
                event
              ) => {
                setSelectedService(
                  event.target.value
                );

                setPage(
                  0
                );
              }}
              className={
                inputClass
              }
            >
              <option value="all">
                كل الخدمات
              </option>

              {serviceOptions.map(
                (
                  service
                ) => (
                  <option
                    key={
                      service
                    }
                    value={
                      service
                    }
                  >
                    {getServiceLabel(
                      service
                    )}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

      </div>

      {/* ================================================
          COUNT
      ================================================= */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
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
          {filtered.length} طلب
        </span>
      </div>

      {/* ================================================
          TABLE
      ================================================= */}

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
              (
                _,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="
                    h-16
                    shimmer-bg
                    rounded-xl
                  "
                />
              )
            )}
          </div>

        ) : error ? (

          <div
            className="
              p-10
              text-center
              text-red-600
              font-bold
            "
          >
            {error}
          </div>

        ) : pagedData.length ===
          0 ? (

          <div
            className="
              p-12
              text-center
            "
          >
            <Home
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
              لا توجد طلبات حجز منزلي
            </p>
          </div>

        ) : (

          <div
            className="
              w-full
              overflow-x-auto
              overflow-y-hidden

              touch-pan-x
              overscroll-x-contain

              [scrollbar-width:thin]
              [-webkit-overflow-scrolling:touch]
            "
            dir="rtl"
          >

            <table
              className="
                w-full
                min-w-[1250px]
                whitespace-nowrap
              "
            >

              {/* HEADER */}

              <thead
                className="
                  bg-slate-50
                  border-b
                  border-slate-200
                "
              >

                <tr>

                  <th
                    className="
                      min-w-[170px]
                      p-4
                      text-center
                      font-bold
                      text-slate-700
                      text-sm
                    "
                  >
                    المريض
                  </th>

                  <th
                    className="
                      min-w-[160px]
                      p-4
                      text-center
                      font-bold
                      text-slate-700
                      text-sm
                    "
                  >
                    الهاتف
                  </th>

                  <th
                    className="
                      min-w-[200px]
                      p-4
                      text-center
                      font-bold
                      text-slate-700
                      text-sm
                    "
                  >
                    العنوان
                  </th>

                  <th
                    className="
                      min-w-[180px]
                      p-4
                      text-center
                      font-bold
                      text-slate-700
                      text-sm
                    "
                  >
                    نوع الخدمة
                  </th>

                  <th
                    className="
                      min-w-[260px]
                      p-4
                      text-center
                      font-bold
                      text-slate-700
                      text-sm
                    "
                  >
                    وصف الحالة
                  </th>

                  <th
                    className="
                      min-w-[190px]
                      p-4
                      text-center
                      font-bold
                      text-slate-700
                      text-sm
                    "
                  >
                    تاريخ الطلب
                  </th>

                  {canDelete && (
                    <th
                      className="
                        min-w-[90px]
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

              {/* BODY */}

              <tbody>

                {pagedData.map(
                  (
                    appointment
                  ) => (

                    <tr
                      key={
                        appointment.id
                      }
                      className="
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                        transition-colors
                      "
                    >

                      {/* NAME */}

                      <td
                        className="
                          p-4
                          text-center
                        "
                      >
                        <p
                          className="
                            font-bold
                            text-slate-800
                            text-sm
                          "
                        >
                          {appointment.patientName ||
                            "-"}
                        </p>
                      </td>

                      {/* PHONE */}

                      <td
                        className="
                          p-4
                          text-center
                          text-sm
                          text-slate-600
                        "
                        dir="ltr"
                      >
                        {appointment.patientPhone ||
                          "-"}
                      </td>

                      {/* ADDRESS */}

                      <td
                        className="
                          p-4
                          text-center
                          text-sm
                          text-slate-600
                        "
                      >
                        <div
                          className="
                            max-w-[220px]
                            mx-auto
                            whitespace-normal
                            leading-6
                          "
                        >
                          {appointment.address ||
                            "-"}
                        </div>
                      </td>

                      {/* SERVICE */}

                      <td
                        className="
                          p-4
                          text-center
                        "
                      >
                        <span
                          className="
                            inline-flex
                            rounded-lg
                            bg-[#D1F9FC]
                            px-3
                            py-1.5
                            text-xs
                            font-extrabold
                            text-[#197786]
                          "
                        >
                          {getServiceLabel(
                            appointment.serviceType
                          )}
                        </span>
                      </td>

                      {/* CASE DESCRIPTION */}

                      <td
                        className="
                          p-4
                          text-center
                          text-sm
                          text-slate-600
                        "
                      >
                        <div
                          className="
                            max-w-[300px]
                            mx-auto
                            whitespace-normal
                            leading-6
                          "
                        >
                          {appointment.caseDescription ||
                            "-"}
                        </div>
                      </td>

                      {/* DATE */}

                      <td
                        className="
                          p-4
                          text-center
                          text-xs
                          text-slate-500
                        "
                      >
                        {formatDate(
                          appointment.createdAt
                        )}
                      </td>

                      {/* DELETE */}

                      {canDelete && (
                        <td
                          className="
                            p-4
                            text-center
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                appointment.id
                              )
                            }
                            title="حذف الطلب"
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
                            <Trash2
                              className="
                                w-4
                                h-4
                              "
                            />
                          </button>
                        </td>
                      )}

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

        {/* ================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (

          <div
            className="
              flex
              items-center
              justify-between
              gap-3

              p-4

              border-t
              border-slate-100
            "
          >

            <span
              className="
                text-xs
                sm:text-sm
                text-slate-500
              "
            >
              صفحة {page + 1} من{" "}
              {totalPages} (
              {filtered.length} طلب)
            </span>

            <div
              className="
                flex
                gap-2
                shrink-0
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
                      totalPages - 1,
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