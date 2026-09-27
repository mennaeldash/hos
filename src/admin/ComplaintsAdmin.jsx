import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
} from "lucide-react";

import {
  getContactMessages,
} from "@/services/contact";

/* ======================================================
   NORMALIZE SEARCH TEXT
====================================================== */

const normalizeText = (
  value
) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(
      /[\s\u200C-]/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    );

/* ======================================================
   COMPLAINTS ADMIN
====================================================== */

export default function ComplaintsAdmin() {
  const [
    items,
    setItems,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  /* ======================================================
     LOAD FROM BACKEND

     GET /api/PatientFeedbacks
  ====================================================== */

  const loadItems =
    async () => {
      try {
        setLoading(
          true
        );

        setError(
          ""
        );

        const data =
          await getContactMessages();

        console.log(
          "PATIENT FEEDBACKS ADMIN:",
          data
        );

        setItems(
          Array.isArray(
            data
          )
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "LOAD PATIENT FEEDBACKS ERROR:",
          error?.response?.data ||
            error
        );

        setItems([]);

     if (error?.response?.status === 401) {
  setError(
    "انتهت جلسة تسجيل الدخول. برجاء تسجيل الدخول مرة أخرى."
  );
} else if (error?.response?.status === 403) {
  setError(
    "الحساب الحالي ليس لديه صلاحية لعرض الشكاوى والمقترحات."
  );
} else {
  setError(
    "حدث خطأ أثناء تحميل الشكاوى والمقترحات."
  );
}

      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    loadItems();
  }, []);

  /* ======================================================
     FILTER
  ====================================================== */

  const filtered =
    useMemo(() => {
      const value =
        normalizeText(
          search
        );

      if (!value) {
        return items;
      }

      return items.filter(
        (
          item
        ) => {
          const matchesName =
            normalizeText(
              item.name ||
                ""
            ).includes(
              value
            );

          const matchesMessage =
            normalizeText(
              item.message ||
                ""
            ).includes(
              value
            );

          return (
            matchesName ||
            matchesMessage
          );
        }
      );
    }, [
      items,
      search,
    ]);

  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div
        className="
          space-y-6
          p-4
          md:p-6
        "
        dir="rtl"
      >

        <div className="relative w-full max-w-md">

          <div
            className="
              h-12
              rounded-xl
              shimmer-bg
            "
          />

        </div>

        <div className="card overflow-hidden">

          <div className="space-y-2 p-4">

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
                    rounded-xl
                    shimmer-bg
                  "
                />
              )
            )}

          </div>

        </div>

      </div>
    );
  }

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div
      className="
        space-y-6
        p-4
        md:p-6
      "
      dir="rtl"
    >

      {/* =================================================
          SEARCH
      ================================================= */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div className="relative w-full max-w-md">

          <Search
            className="
              absolute
              right-3
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={
              search
            }
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="ابحث بالاسم أو الرسالة"
            className="
              w-full
              rounded-xl
              border
              border-[#E7E3E3]
              bg-white
              px-4
              py-3
              pr-11
              text-slate-700
              outline-none
              transition
              focus:border-primary-400
            "
          />

        </div>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div
          className="
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

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="card overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[640px] text-right">

            <thead className="bg-slate-50">

              <tr
                className="
                  border-b
                  border-[#E7E3E3]
                  text-sm
                  text-slate-700
                "
              >

                <th
                  className="
                    px-4
                    py-3
                    font-bold
                  "
                >
                  الاسم
                </th>

                <th
                  className="
                    px-4
                    py-3
                    font-bold
                  "
                >
                  الرسالة
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.length ===
              0 ? (

                <tr>

                  <td
                    colSpan={2}
                    className="
                      px-4
                      py-10
                      text-center
                      text-slate-500
                    "
                  >
                    {error
                      ? "تعذر تحميل الرسائل"
                      : search
                      ? "لا توجد نتائج مطابقة"
                      : "لا توجد رسائل"}
                  </td>

                </tr>

              ) : (

                filtered.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={
                        item.id ??
                        index
                      }
                      className="
                        border-b
                        border-[#E7E3E3]
                        align-top
                        transition-colors
                        hover:bg-slate-50
                      "
                    >

                      {/* NAME */}

                      <td
                        className="
                          px-4
                          py-4
                          text-sm
                          font-bold
                          text-slate-800
                        "
                      >
                        {
                          item.name ||
                          "-"
                        }
                      </td>

                      {/* MESSAGE */}

                      <td
                        className="
                          px-4
                          py-4
                          text-sm
                          leading-7
                          text-slate-600
                          whitespace-pre-wrap
                        "
                      >
                        {
                          item.message ||
                          "-"
                        }
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}