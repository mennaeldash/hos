import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Image as ImageIcon,
} from 'lucide-react';
import PlaceholderImage from '@/components/PlaceholderImage';

export default function CrudAdmin({
  title,
  columns,
  imageType = 'generic',
  searchKeys,
  extraFields = {},
  renderCard,
  cardView = false,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const [imagePreviews, setImagePreviews] = useState({});

  const fetchData = async () => {
    setLoading(true);

    try {
      const rows = await fetchItems();
      setData(rows || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((item) =>
    searchKeys.some((key) =>
      String(item[key] || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  const openAdd = () => {
    setEditing(null);

    setForm({
      sort_order: 0,
      ...extraFields,
    });

    setImagePreviews({});
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);

    setForm({
      ...item,
    });

    setImagePreviews({});
    setModalOpen(true);
  };

  const handleImageChange = (key, file) => {
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      [key]: file,
    }));

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreviews((prev) => ({
        ...prev,
        [key]: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const getImagePreview = (key) => {
    if (imagePreviews[key]) {
      return imagePreviews[key];
    }

    const value = form[key];

    if (typeof value === 'string') {
      return value;
    }

    return '';
  };

  const removeSelectedImage = (key) => {
    setForm((prev) => ({
      ...prev,
      [key]: '',
    }));

    setImagePreviews((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

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
        await createItem(form);
      }

      setModalOpen(false);
      setEditing(null);
      setForm({});
      setImagePreviews({});

      await fetchData();
    } catch (error) {
      console.error(
        'Failed to save:',
        error?.response?.data || error
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      !confirm(
        'هل أنت متأكد من الحذف؟'
      )
    ) {
      return;
    }

    try {
      await deleteItem(id);
      await fetchData();
    } catch (error) {
      console.error(
        'Failed to delete:',
        error?.response?.data || error
      );
    }
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm';

  const labelClass =
    'block text-sm font-bold text-slate-700 mb-1.5';

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">

        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

          <input
            type="text"
            placeholder={`ابحث في ${title}...`}
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className={`${inputClass} pr-11`}
          />
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="btn btn-primary shrink-0"
        >
          <Plus className="w-5 h-5" />
          إضافة جديد
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({
            length: 6,
          }).map((_, i) => (
            <div
              key={i}
              className="card p-6 shimmer-bg h-48 rounded-2xl"
            />
          ))}
        </div>
      ) : cardView && renderCard ? (

        /* Card View */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {filtered.map((item) => (
            <div
              key={item.id}
              className="card p-5 group"
            >
              {renderCard(item)}

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">

                <button
                  type="button"
                  onClick={() =>
                    openEdit(item)
                  }
                  className="flex-1 btn btn-secondary text-sm py-2"
                >
                  <Edit2 className="w-4 h-4" />
                  تعديل
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="px-3 py-2 rounded-xl bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}

        </div>
      ) : (

        /* Table View */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>

                  {columns
                    .filter(
                      (c) =>
                        c.type !== 'image'
                    )
                    .map((col) => (
                      <th
                        key={col.key}
                        className="text-right p-4 font-bold text-slate-700 text-sm"
                      >
                        {col.label}
                      </th>
                    ))}

                  <th className="text-right p-4 font-bold text-slate-700 text-sm">
                    إجراءات
                  </th>

                </tr>
              </thead>

              <tbody>

                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >

                    {columns
                      .filter(
                        (c) =>
                          c.type !==
                          'image'
                      )
                      .map((col) => (
                        <td
                          key={col.key}
                          className="p-4 text-sm text-slate-600"
                        >
                          {col.type ===
                          'select'
                            ? col.options?.find(
                                (o) =>
                                  o.value ===
                                  item[
                                    col.key
                                  ]
                              )?.label ||
                              item[
                                col.key
                              ]
                            : String(
                                item[
                                  col.key
                                ] || '-'
                              ).slice(
                                0,
                                50
                              )}
                        </td>
                      ))}

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

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() =>
            setModalOpen(false)
          }
        >

          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">

              <h3 className="text-xl font-extrabold text-slate-800">
                {editing
                  ? `تعديل ${title}`
                  : `إضافة ${title}`}
              </h3>

              <button
                type="button"
                onClick={() =>
                  setModalOpen(false)
                }
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSave}
              className="p-6 space-y-4"
            >

              {columns.map((col) => (

                <div key={col.key}>

                  <label
                    className={labelClass}
                  >
                    {col.label}
                    {col.required && ' *'}
                  </label>

                  {/* Textarea */}
                  {col.type ===
                  'textarea' ? (

                    <textarea
                      value={
                        form[
                          col.key
                        ] || ''
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [col.key]:
                            e.target
                              .value,
                        })
                      }
                      className={
                        inputClass
                      }
                      rows={3}
                      placeholder={
                        col.placeholder
                      }
                      required={
                        col.required
                      }
                    />

                  ) : col.type ===
                    'select' ? (

                    /* Select */

                    <select
                      value={
                        form[
                          col.key
                        ] || ''
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [col.key]:
                            e.target
                              .value,
                        })
                      }
                      className={
                        inputClass
                      }
                      required={
                        col.required
                      }
                    >

                      <option value="">
                        اختر...
                      </option>

                      {col.options?.map(
                        (opt) => (
                          <option
                            key={
                              opt.value
                            }
                            value={
                              opt.value
                            }
                          >
                            {
                              opt.label
                            }
                          </option>
                        )
                      )}

                    </select>

                  ) : col.type ===
                    'image' ? (

                    /* Image Upload */

                    <div className="space-y-3">

                      <div className="flex flex-col sm:flex-row items-center gap-4">

                        {/* Preview */}
                        <div className="shrink-0">

                          <PlaceholderImage
                            type={
                              imageType
                            }
                            src={getImagePreview(
                              col.key
                            )}
                            className="w-24 h-24"
                            rounded="rounded-xl"
                          />

                        </div>

                        <div className="flex-1 w-full">

                          <label className="flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600 transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600">

                            <ImageIcon className="w-5 h-5" />

                            {form[
                              col.key
                            ] instanceof File
                              ? form[
                                  col.key
                                ].name
                              : editing &&
                                getImagePreview(
                                  col.key
                                )
                              ? 'تغيير الصورة'
                              : 'اختيار صورة من الجهاز'}

                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(
                                e
                              ) =>
                                handleImageChange(
                                  col.key,
                                  e
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

                      {getImagePreview(
                        col.key
                      ) && (
                        <button
                          type="button"
                          onClick={() =>
                            removeSelectedImage(
                              col.key
                            )
                          }
                          className="text-xs font-bold text-error-600 hover:text-error-700"
                        >
                          إزالة الصورة
                        </button>
                      )}

                    </div>

                  ) : (

                    /* Normal Input */

                    <input
                      type={
                        col.type ===
                        'number'
                          ? 'number'
                          : 'text'
                      }
                      value={
                        form[
                          col.key
                        ] ?? ''
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [col.key]:
                            col.type ===
                            'number'
                              ? Number(
                                  e
                                    .target
                                    .value
                                )
                              : e
                                  .target
                                  .value,
                        })
                      }
                      className={
                        inputClass
                      }
                      placeholder={
                        col.placeholder
                      }
                      required={
                        col.required
                      }
                    />

                  )}

                </div>
              ))}

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">

                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary flex-1 disabled:opacity-50"
                >
                  {saving
                    ? 'جاري الحفظ...'
                    : 'حفظ'}
                </button>

                <button
                  type="button"
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