import {
  useEffect,
  useState,
} from "react";

import {
  Save,
  Plus,
  Trash2,
} from "lucide-react";

import {
  createStatistic,
  deleteStatistic,
  getStatistics,
  updateStatistic,
} from "@/services/statistics";

export default function StatisticsAdmin() {
  const [
    stats,
    setStats,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    role,
    setRole,
  ] = useState("");

  /* =======================================================
     ROLE
  ======================================================= */

  useEffect(() => {
    const storedRole =
      window.localStorage.getItem(
        "adminRole"
      ) || "";

    setRole(storedRole);
  }, []);

  const normalizedRole =
    String(role || "")
      .trim()
      .toLowerCase();

  const isAdmin =
    normalizedRole === "admin";

  const isManager =
    normalizedRole === "manager";

  const canEdit = isAdmin;

  /* =======================================================
     FETCH DATA
  ======================================================= */

  const fetchData =
    async () => {
      try {
        setLoading(true);

        const data =
          await getStatistics();

        setStats(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "FETCH STATISTICS ERROR:",
          error
        );

        setStats([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  /* =======================================================
     UPDATE
  ======================================================= */

  const handleUpdate =
    async (stat) => {
      if (!canEdit) {
        return;
      }

      try {
        setSaving(true);

        await updateStatistic(
          stat.id,
          {
            key:
              stat.key,

            value:
              stat.value,
          }
        );

        await fetchData();
      } catch (error) {
        console.error(
          "UPDATE STATISTIC ERROR:",
          error
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     ADD
  ======================================================= */

  const handleAdd =
    async () => {
      if (!canEdit) {
        return;
      }

      try {
        setSaving(true);

        await createStatistic({
          key:
            "إحصائية جديدة",

          value:
            "0",
        });

        await fetchData();
      } catch (error) {
        console.error(
          "CREATE STATISTIC ERROR:",
          error
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete =
    async (id) => {
      if (!canEdit) {
        return;
      }

      if (
        !window.confirm(
          "هل أنت متأكد؟"
        )
      ) {
        return;
      }

      try {
        setSaving(true);

        await deleteStatistic(
          id
        );

        setStats(
          (previous) =>
            previous.filter(
              (stat) =>
                String(
                  stat.id
                ) !==
                String(id)
            )
        );
      } catch (error) {
        console.error(
          "DELETE STATISTIC ERROR:",
          error
        );
      } finally {
        setSaving(false);
      }
    };

  /* =======================================================
     INPUT STYLE
  ======================================================= */

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";

  const readOnlyInputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-sm cursor-not-allowed";

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({
          length: 6,
        }).map(
          (
            _,
            index
          ) => (
            <div
              key={
                index
              }
              className="card p-6 shimmer-bg h-32 rounded-2xl"
            />
          )
        )}
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* TOP ACTIONS */}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800">
            إدارة الإحصائيات
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {isManager
              ? "أنت في وضع العرض فقط. لا يمكنك تعديل الإحصائيات."
              : "يمكنك إضافة وتعديل وحذف الإحصائيات."}
          </p>
        </div>

        {canEdit && (
          <button
            type="button"
            onClick={
              handleAdd
            }
            disabled={
              saving
            }
            className="btn btn-primary disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            إضافة إحصائية
          </button>
        )}
      </div>

      {/* STATS */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(
          (
            stat
          ) => (
            <div
              key={
                stat.id
              }
              className="card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-700 text-sm">
                  إحصائية
                </h3>

                {canEdit && (
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(
                        stat.id
                      )
                    }
                    disabled={
                      saving
                    }
                    className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">

                {/* KEY */}

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    الوصف
                  </label>

                  <input
                    type="text"
                    value={
                      stat.key ??
                      ""
                    }
                    onChange={(
                      event
                    ) => {
                      if (!canEdit) {
                        return;
                      }

                      setStats(
                        (
                          previous
                        ) =>
                          previous.map(
                            (
                              item
                            ) =>
                              String(
                                item.id
                              ) ===
                              String(
                                stat.id
                              )
                                ? {
                                    ...item,
                                    key:
                                      event
                                        .target
                                        .value,
                                  }
                                : item
                          )
                      );
                    }}
                    className={
                      canEdit
                        ? inputClass
                        : readOnlyInputClass
                    }
                    readOnly={
                      !canEdit
                    }
                    disabled={
                      saving
                    }
                  />
                </div>

                {/* VALUE */}

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    القيمة
                  </label>

                  <input
                    type="text"
                    value={
                      stat.value ??
                      ""
                    }
                    onChange={(
                      event
                    ) => {
                      if (!canEdit) {
                        return;
                      }

                      setStats(
                        (
                          previous
                        ) =>
                          previous.map(
                            (
                              item
                            ) =>
                              String(
                                item.id
                              ) ===
                              String(
                                stat.id
                              )
                                ? {
                                    ...item,
                                    value:
                                      event
                                        .target
                                        .value,
                                  }
                                : item
                          )
                      );
                    }}
                    className={
                      canEdit
                        ? inputClass
                        : readOnlyInputClass
                    }
                    placeholder="مثال: 45 أو 2500+"
                    readOnly={
                      !canEdit
                    }
                    disabled={
                      saving
                    }
                  />
                </div>

                {/* SAVE */}

                {canEdit && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdate(
                        stat
                      )
                    }
                    disabled={
                      saving
                    }
                    className="btn btn-secondary w-full text-sm py-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    حفظ
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>

      {/* EMPTY */}

      {stats.length === 0 && (
        <div className="card p-8 text-center text-slate-500">
          لا توجد إحصائيات
        </div>
      )}

      {/* SAVING */}

      {saving && canEdit && (
        <p className="text-center text-sm text-primary-600">
          جاري الحفظ...
        </p>
      )}
    </div>
  );
}