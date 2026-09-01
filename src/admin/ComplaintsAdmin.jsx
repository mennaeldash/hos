import { useEffect, useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";

const STORAGE_KEY = "road_hospital_complaints";

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[\s\u200C-]/g, " ")
    .replace(/\s+/g, " ");

export default function ComplaintsAdmin() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadItems = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error("READ COMPLAINTS ERROR:", error);
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filtered = useMemo(() => {
    const value = normalizeText(search);

    if (!value) return items;

    return items.filter((item) => {
      const matchesName = normalizeText(item.name || "").includes(value);
      const matchesMessage = normalizeText(item.message || "").includes(value);
      return matchesName || matchesMessage;
    });
  }, [items, search]);

  const handleDelete = (id) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="space-y-6 p-4 md:p-6" dir="rtl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث بالاسم أو الرسالة"
            className="w-full rounded-xl border border-[#E7E3E3] bg-white px-4 py-3 pr-11 text-slate-700 outline-none transition focus:border-primary-400"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-right">
            <thead className="bg-slate-50">
              <tr className="border-b border-[#E7E3E3] text-sm text-slate-700">
                <th className="px-4 py-3 font-bold">الاسم</th>
                <th className="px-4 py-3 font-bold">الرسالة</th>
                <th className="px-4 py-3 font-bold text-center">حذف</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-10 text-center text-slate-500">
                    لا توجد رسائل
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="border-b border-[#E7E3E3] align-top">
                    <td className="px-4 py-4 text-sm font-bold text-slate-800">
                      {item.name || "-"}
                    </td>
                    <td className="px-4 py-4 text-sm leading-7 text-slate-600">
                      {item.message || "-"}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                        aria-label="حذف الرسالة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
