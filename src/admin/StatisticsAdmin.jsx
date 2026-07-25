import { useEffect, useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import {
  createStatistic,
  deleteStatistic,
  getStatistics,
  updateStatistic,
} from '@/services/statistics';

export default function StatisticsAdmin() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getStatistics();
    setStats(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (stat) => {
    setSaving(true);
    await updateStatistic(stat.id, { value: stat.value, label: stat.label });
    setSaving(false);
  };

  const handleAdd = async () => {
    const data = await createStatistic({
      label: 'إحصائية جديدة',
      value: 0,
      icon: 'activity',
      sort_order: stats.length + 1,
    });
    if (data) setStats([...stats, data]);
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد؟')) return;
    await deleteStatistic(id);
    setStats(stats.filter((s) => s.id !== id));
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";

  if (loading) {
    return <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="card p-6 shimmer-bg h-32 rounded-2xl" />)}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={handleAdd} className="btn btn-primary">
          <Plus className="w-5 h-5" />
          إضافة إحصائية
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-700 text-sm">إحصائية</h3>
              <button onClick={() => handleDelete(stat.id)} className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">الوصف</label>
                <input type="text" value={stat.label} onChange={(e) => setStats(stats.map((s) => s.id === stat.id ? { ...s, label: e.target.value } : s))} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">القيمة</label>
                <input type="number" value={stat.value} onChange={(e) => setStats(stats.map((s) => s.id === stat.id ? { ...s, value: Number(e.target.value) } : s))} className={inputClass} />
              </div>
              <button onClick={() => handleUpdate(stat)} className="btn btn-secondary w-full text-sm py-2">
                <Save className="w-4 h-4" />
                حفظ
              </button>
            </div>
          </div>
        ))}
      </div>

      {saving && <p className="text-center text-sm text-primary-600">جاري الحفظ...</p>}
    </div>
  );
}

