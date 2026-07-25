import { useState, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, X, Search, Image as ImageIcon,
  Calendar, Eye, RotateCcw,
} from 'lucide-react';
import PlaceholderImage from '@/components/PlaceholderImage';
import DoctorScheduleAdmin from './DoctorScheduleAdmin';
import {
  createDoctor,
  getAllDoctors,
  restoreDoctor,
  softDeleteDoctor,
  updateDoctor,
} from '@/services/doctors';
import { getDepartments } from '@/services/departments';

export default function DoctorsAdmin() {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [scheduleDoctor, setScheduleDoctor] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const [docRes, deptRes] = await Promise.all([
      getAllDoctors(),
      getDepartments(),
    ]);
    setData(docRes || []);
    setDepartments(deptRes || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((d) =>
    d.name.includes(search) || d.specialty.includes(search)
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ status: 'active', sort_order: 0, experience_years: 0 });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      const { id, created_at, ...updateData } = form;
      await updateDoctor(editing.id, updateData);
    } else {
      await createDoctor(form);
    }
    setSaving(false);
    setModalOpen(false);
    fetchData();
  };

  const handleSoftDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطبيب؟ (حذف مؤقت)')) return;
    await softDeleteDoctor(id);
    fetchData();
  };

  const handleRestore = async (id) => {
    await restoreDoctor(id);
    fetchData();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";

  if (scheduleDoctor) {
    return <DoctorScheduleAdmin doctor={scheduleDoctor} onBack={() => { setScheduleDoctor(null); fetchData(); }} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input type="text" placeholder="ابحث عن طبيب..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pr-11`} />
        </div>
        <button onClick={openAdd} className="btn btn-primary shrink-0">
          <Plus className="w-5 h-5" />
          إضافة طبيب
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="card p-6 shimmer-bg h-56 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className={`card p-5 group ${item.is_deleted ? 'opacity-50' : ''}`}>
              <div className="text-center">
                <PlaceholderImage type="doctor" src={item.image_url} alt={item.name} className="w-20 h-20 mx-auto mb-3" rounded="rounded-full" />
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="text-sm text-primary-600 font-bold">{item.specialty}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {departments.find((d) => d.id === item.department_id)?.name || 'غير محدد'}
                </p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  item.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-slate-100">
                <button onClick={() => openEdit(item)} className="flex-1 btn btn-secondary text-xs py-2 px-2">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setScheduleDoctor(item)} title="الجدول" className="flex-1 btn btn-secondary text-xs py-2 px-2">
                  <Calendar className="w-3.5 h-3.5" />
                </button>
                {item.is_deleted ? (
                  <button onClick={() => handleRestore(item.id)} title="استعادة" className="px-2 py-2 rounded-xl bg-success-50 text-success-600 hover:bg-success-600 hover:text-white transition-all">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button onClick={() => handleSoftDelete(item.id)} title="حذف" className="px-2 py-2 rounded-xl bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <h3 className="text-xl font-extrabold text-slate-800">{editing ? 'تعديل طبيب' : 'إضافة طبيب'}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className={labelClass}>صورة الطبيب</label>
                <div className="flex items-center gap-4">
                  <PlaceholderImage type="doctor" src={form.image_url} className="w-20 h-20" rounded="rounded-xl" />
                  <div className="flex-1">
                    <input type="url" value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className={inputClass} placeholder="رابط الصورة (URL)" />
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><ImageIcon className="w-3 h-3" /> اتركه فارغاً لصورة افتراضية</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>الاسم الكامل *</label><input type="text" required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="اسم الطبيب" /></div>
                <div><label className={labelClass}>القسم *</label>
                  <select required value={form.department_id || ''} onChange={(e) => setForm({ ...form, department_id: e.target.value })} className={inputClass}>
                    <option value="">اختر...</option>
                    {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>التخصص *</label><input type="text" required value={form.specialty || ''} onChange={(e) => setForm({ ...form, specialty: e.target.value })} className={inputClass} placeholder="التخصص" /></div>
                <div><label className={labelClass}>المؤهل العلمي</label><input type="text" value={form.qualification || ''} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className={inputClass} placeholder="المؤهل العلمي" /></div>
              </div>

              <div><label className={labelClass}>السيرة الذاتية</label><textarea value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={inputClass} rows={3} placeholder="نبذة عن الطبيب" /></div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className={labelClass}>سنوات الخبرة</label><input type="number" value={form.experience_years ?? 0} onChange={(e) => setForm({ ...form, experience_years: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className={labelClass}>رقم الغرفة</label><input type="text" value={form.office_number || ''} onChange={(e) => setForm({ ...form, office_number: e.target.value })} className={inputClass} placeholder="مكتب 101" /></div>
                <div><label className={labelClass}>الحالة</label>
                  <select value={form.status || 'active'} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>الهاتف</label><input type="text" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="05xxxxxxxx" dir="ltr" /></div>
                <div><label className={labelClass}>البريد الإلكتروني</label><input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="email@hospital.sa" dir="ltr" /></div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>فيسبوك</label><input type="url" value={form.facebook || ''} onChange={(e) => setForm({ ...form, facebook: e.target.value })} className={inputClass} placeholder="رابط" /></div>
                <div><label className={labelClass}>لينكدإن</label><input type="url" value={form.linkedin || ''} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} className={inputClass} placeholder="رابط" /></div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="submit" disabled={saving} className="btn btn-primary flex-1 disabled:opacity-50">{saving ? 'جاري الحفظ...' : 'حفظ'}</button>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

