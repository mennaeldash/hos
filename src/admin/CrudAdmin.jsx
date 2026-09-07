import {
  useState,
  useEffect,
} from "react";

import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Image as ImageIcon,
} from "lucide-react";

import PlaceholderImage from "@/components/PlaceholderImage";

import {
  canManageContent,
} from "@/lib/permissions";

export default function CrudAdmin({
  title,
  columns,
  imageType = "generic",
  searchKeys,
  extraFields = {},
  renderCard,
  cardView = false,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
}) {
  /* ======================================================
     PERMISSIONS
  ====================================================== */

  const userCanManageContent =
    canManageContent();

  /* ======================================================
     STATE
  ====================================================== */

  const [
    data,
    setData,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    editing,
    setEditing,
  ] = useState(null);

  const [
    form,
    setForm,
  ] = useState({});

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    imagePreviews,
    setImagePreviews,
  ] = useState({});

  /* ======================================================
     FETCH DATA
  ====================================================== */

  const fetchData =
    async () => {
      setLoading(true);

      try {
        const rows =
          await fetchItems();

        setData(
          Array.isArray(rows)
            ? rows
            : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch:",
          error?.response?.data ||
            error
        );

        setData([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  /* ======================================================
     FILTER
  ====================================================== */

  const filtered =
    data.filter((item) =>
      searchKeys.some(
        (key) =>
          String(
            item[key] || ""
          )
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
    );

  /* ======================================================
     OPEN ADD
     ADMIN ONLY
  ====================================================== */

  const openAdd = () => {
    if (
      !userCanManageContent
    ) {
      return;
    }

    setEditing(null);

    setForm({
      sort_order: 0,
      ...extraFields,
    });

    setImagePreviews({});

    setModalOpen(true);
  };

  /* ======================================================
     OPEN EDIT
     ADMIN ONLY
  ====================================================== */

  const openEdit = (
    item
  ) => {
    if (
      !userCanManageContent
    ) {
      return;
    }

    setEditing(item);

    setForm({
      ...item,
    });

    setImagePreviews({});

    setModalOpen(true);
  };

  /* ======================================================
     IMAGE CHANGE
  ====================================================== */

  const handleImageChange = (
    key,
    file
  ) => {
    if (
      !userCanManageContent ||
      !file
    ) {
      return;
    }

    setForm(
      (previous) => ({
        ...previous,

        [key]: file,
      })
    );

    const reader =
      new FileReader();

    reader.onload = () => {
      setImagePreviews(
        (previous) => ({
          ...previous,

          [key]:
            reader.result,
        })
      );
    };

    reader.readAsDataURL(
      file
    );
  };

  /* ======================================================
     IMAGE PREVIEW
  ====================================================== */

  const getImagePreview = (
    key
  ) => {
    if (
      imagePreviews[key]
    ) {
      return imagePreviews[
        key
      ];
    }

    const value =
      form[key];

    if (
      typeof value ===
      "string"
    ) {
      return value;
    }

    return "";
  };

  /* ======================================================
     SAVE
     ADMIN ONLY
  ====================================================== */

  const handleSave =
    async (event) => {
      event.preventDefault();

      if (
        !userCanManageContent
      ) {
        return;
      }

      setSaving(true);

      try {
        if (editing) {
          const {
            id,
            created_at,
            ...updateData
          } = form;

          await updateItem(
            editing.id,
            updateData
          );
        } else {
          await createItem(
            form
          );
        }

        setModalOpen(
          false
        );

        setEditing(
          null
        );

        setForm({});

        setImagePreviews(
          {}
        );

        await fetchData();
      } catch (error) {
        console.error(
          "Failed to save:",
          error?.response?.data ||
            error
        );
      } finally {
        setSaving(false);
      }
    };

  /* ======================================================
     DELETE
     ADMIN ONLY
  ====================================================== */

  const handleDelete =
    async (id) => {
      if (
        !userCanManageContent
      ) {
        return;
      }

      if (
        !window.confirm(
          "هل أنت متأكد من الحذف؟"
        )
      ) {
        return;
      }

      try {
        await deleteItem(
          id
        );

        await fetchData();
      } catch (error) {
        console.error(
          "Failed to delete:",
          error?.response?.data ||
            error
        );
      }
    };

  /* ======================================================
     STYLES
  ====================================================== */

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-200 " +
    "focus:border-primary-500 focus:ring-2 focus:ring-primary-200 " +
    "outline-none transition-all bg-white text-slate-800 text-sm";

  const labelClass =
    "block text-sm font-bold text-slate-700 mb-1.5";

  /* ======================================================
     RETURN
  ====================================================== */

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
            placeholder={`ابحث في ${title}...`}
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
            className={`${inputClass} pr-11`}
          />

        </div>

        {/* ADD - ADMIN ONLY */}

        {userCanManageContent && (
          <button
            type="button"
            onClick={
              openAdd
            }
            className="btn btn-primary shrink-0"
          >
            <Plus className="w-5 h-5" />

            إضافة جديد
          </button>
        )}

      </div>

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading ? (

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
                className="card p-6 shimmer-bg h-48 rounded-2xl"
              />
            )
          )}

        </div>

      ) : cardView &&
        renderCard ? (

        /* =====================================================
           CARD VIEW
        ====================================================== */

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {filtered.map(
            (item) => (
              <div
                key={
                  item.id
                }
                className="card p-5 group"
              >

                {renderCard(
                  item
                )}

                {/* ACTIONS - ADMIN ONLY */}

                {userCanManageContent && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">

                    <button
                      type="button"
                      onClick={() =>
                        openEdit(
                          item
                        )
                      }
                      className="flex-1 btn btn-secondary text-sm py-2"
                    >
                      <Edit2 className="w-4 h-4" />

                      تعديل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      className="px-3 py-2 rounded-xl bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                )}

              </div>
            )
          )}

        </div>

      ) : (

        /* =====================================================
           TABLE VIEW
        ====================================================== */

        <div className="card overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 border-b border-slate-200">

                <tr>

                  {columns
                    .filter(
                      (
                        column
                      ) =>
                        column.type !==
                        "image"
                    )
                    .map(
                      (
                        column
                      ) => (
                        <th
                          key={
                            column.key
                          }
                          className="text-right p-4 font-bold text-slate-700 text-sm"
                        >
                          {
                            column.label
                          }
                        </th>
                      )
                    )}

                  {/* ACTIONS COLUMN - ADMIN ONLY */}

                  {userCanManageContent && (
                    <th className="text-right p-4 font-bold text-slate-700 text-sm">
                      إجراءات
                    </th>
                  )}

                </tr>

              </thead>

              <tbody>

                {filtered.map(
                  (item) => (
                    <tr
                      key={
                        item.id
                      }
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >

                      {columns
                        .filter(
                          (
                            column
                          ) =>
                            column.type !==
                            "image"
                        )
                        .map(
                          (
                            column
                          ) => (
                            <td
                              key={
                                column.key
                              }
                              className="p-4 text-sm text-slate-600"
                            >

                              {column.type ===
                              "select"
                                ? column.options?.find(
                                    (
                                      option
                                    ) =>
                                      option.value ===
                                      item[
                                        column.key
                                      ]
                                  )?.label ||
                                  item[
                                    column.key
                                  ]
                                : String(
                                    item[
                                      column.key
                                    ] ||
                                      "-"
                                  ).slice(
                                    0,
                                    50
                                  )}

                            </td>
                          )
                        )}

                      {/* ACTIONS - ADMIN ONLY */}

                      {userCanManageContent && (
                        <td className="p-4">

                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                openEdit(
                                  item
                                )
                              }
                              className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>

                        </td>
                      )}

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* =====================================================
          MODAL
          ADMIN ONLY
      ====================================================== */}

      {modalOpen &&
        userCanManageContent && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() =>
            setModalOpen(
              false
            )
          }
        >

          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">

              <h3 className="text-xl font-extrabold text-slate-800">

                {editing
                  ? `تعديل ${title}`
                  : `إضافة ${title}`}

              </h3>

              <button
                type="button"
                onClick={() =>
                  setModalOpen(
                    false
                  )
                }
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={
                handleSave
              }
              className="p-6 space-y-4"
            >

              {columns.map(
                (
                  column
                ) => (

                  <div
                    key={
                      column.key
                    }
                  >

                    <label
                      className={
                        labelClass
                      }
                    >
                      {
                        column.label
                      }

                      {column.required &&
                        " *"}
                    </label>

                    {/* =========================================
                        TEXTAREA
                    ========================================== */}

                    {column.type ===
                    "textarea" ? (

                      <textarea
                        value={
                          form[
                            column.key
                          ] ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          setForm({
                            ...form,

                            [column.key]:
                              event.target.value,
                          })
                        }
                        className={
                          inputClass
                        }
                        rows={3}
                        placeholder={
                          column.placeholder
                        }
                        required={
                          column.required
                        }
                      />

                    ) : column.type ===
                      "select" ? (

                      /* =========================================
                         SELECT
                      ========================================== */

                      <select
                        value={
                          form[
                            column.key
                          ] ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          setForm({
                            ...form,

                            [column.key]:
                              event.target.value,
                          })
                        }
                        className={
                          inputClass
                        }
                        required={
                          column.required
                        }
                      >

                        <option value="">
                          اختر...
                        </option>

                        {column.options?.map(
                          (
                            option
                          ) => (
                            <option
                              key={
                                option.value
                              }
                              value={
                                option.value
                              }
                            >
                              {
                                option.label
                              }
                            </option>
                          )
                        )}

                      </select>

                    ) : column.type ===
                      "image" ? (

                      /* =========================================
                         IMAGE UPLOAD
                      ========================================== */

                      <div className="space-y-3">

                        <div className="flex flex-col sm:flex-row items-center gap-4">

                          <div className="shrink-0">

                            <PlaceholderImage
                              type={
                                imageType
                              }
                              src={getImagePreview(
                                column.key
                              )}
                              className="w-24 h-24"
                              rounded="rounded-xl"
                            />

                          </div>

                          <div className="flex-1 w-full">

                            <label className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600">

                              <ImageIcon className="w-5 h-5" />

                              {form[
                                column.key
                              ] instanceof File
                                ? form[
                                    column.key
                                  ].name
                                : editing &&
                                  getImagePreview(
                                    column.key
                                  )
                                ? "تغيير الصورة"
                                : "اختيار صورة من الجهاز"}

                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(
                                  event
                                ) =>
                                  handleImageChange(
                                    column.key,
                                    event
                                      .target
                                      .files?.[0]
                                  )
                                }
                              />

                            </label>

                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">

                              <ImageIcon className="w-3 h-3" />

                              اختر صورة من الجهاز أو الهاتف

                            </p>

                          </div>

                        </div>

                      </div>

                    ) : (

                      /* =========================================
                         NORMAL INPUT
                      ========================================== */

                      <input
                        type={
                          column.type ===
                          "number"
                            ? "number"
                            : "text"
                        }
                        value={
                          form[
                            column.key
                          ] ??
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          setForm({
                            ...form,

                            [column.key]:
                              column.type ===
                              "number"
                                ? Number(
                                    event
                                      .target
                                      .value
                                  )
                                : event
                                    .target
                                    .value,
                          })
                        }
                        className={
                          inputClass
                        }
                        placeholder={
                          column.placeholder
                        }
                        required={
                          column.required
                        }
                      />

                    )}

                  </div>
                )
              )}

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="flex gap-3 pt-4 border-t border-slate-100">

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="btn btn-primary flex-1 disabled:opacity-50"
                >
                  {saving
                    ? "جاري الحفظ..."
                    : "حفظ"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(
                      false
                    )
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