import { useState, useEffect } from 'react';
import {
  Search, Edit2, X, Phone, Mail, User, Calendar,
  Clock, TrendingUp, CheckCircle, XCircle, ChevronLeft,
} from 'lucide-react';
import { getAppointmentsByPatient } from '@/services/appointments';
import { getPatients, updatePatient } from '@/services/patients';

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'bg-warning-100 text-warning-700' },
  confirmed: { label: 'مؤكد', color: 'bg-primary-100 text-primary-700' },
  completed: { label: 'مكتمل', color: 'bg-success-100 text-success-700' },
  cancelled: { label: 'ملغي', color: 'bg-error-100 text-error-700' },
  no_show: { label: 'لم يحضر', color: 'bg-slate-200 text-slate-700' },
};

export default function PatientsAdmin() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientApts, setPatientApts] = useState([]);
  const [loadingApts, setLoadingApts] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getPatients();
    setPatients((data || []).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPatientAppointments = async (patientId) => {
    setLoadingApts(true);
    const data = await getAppointmentsByPatient(patientId);
    setPatientApts((data || []).sort((a, b) => (b.appointment_date || '').localeCompare(a.appointment_date || '')));
    setLoadingApts(false);
  };

  const openPatient = (p) => {
    setSelectedPatient(p);
    setEditing(false);
    fetchPatientAppointments(p.id);
  };

  const openEdit = () => {
    setEditForm({ ...selectedPatient });
    setEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { id, created_at, ...updateData } = editForm;
    await updatePatient(selectedPatient.id, updateData);
    setSaving(false);
    setEditing(false);
    fetchData();
    if (selectedPatient) {
      setSelectedPatient({ ...selectedPatient, ...updateData });
    }
  };

  const filtered = patients.filter((p) =>
    p.full_name.includes(search) || p.phone.includes(search) || (p.email || '').includes(search)
  );

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";

  if (selectedPatient) {
    const upcoming = patientApts.filter((a) => a.appointment_date && new Date(a.appointment_date) >= new Date(new Date().toDateString()) && a.status !== 'cancelled' && a.status !== 'completed');
    const past = patientApts.filter((a) => a.status === 'completed' || (a.appointment_date && new Date(a.appointment_date) < new Date(new Date().toDateString())));

    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedPatient(null)} className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 font-bold text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" />
          العودة لقائمة المرضى
        </button>

        <div className="card p-6">
          {editing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>الاسم</label><input type="text" required value={editForm.full_name || ''} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>الهاتف</label><input type="text" required value={editForm.phone || ''} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className={inputClass} dir="ltr" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>البريد الإلكتروني</label><input type="email" value={editForm.email || ''} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className={inputClass} dir="ltr" /></div>
                <div><label className={labelClass}>رقم الهوية</label><input type="text" value={editForm.national_id || ''} onChange={(e) => setEditForm({ ...editForm, national_id: e.target.value })} className={inputClass} dir="ltr" /></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>الجنس</label><select value={editForm.gender || ''} onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })} className={inputClass}><option value="">اختر</option><option value="male">ذكر</option><option value="female">أنثى</option></select></div>
                <div><label className={labelClass}>العمر</label><input type="text" value={editForm.age || ''} onChange={(e) => setEditForm({ ...editForm, age: e.target.value })} className={inputClass} /></div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="submit" disabled={saving} className="btn btn-primary flex-1 disabled:opacity-50">{saving ? 'جاري الحفظ...' : 'حفظ'}</button>
                <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">إلغاء</button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-800">{selectedPatient.full_name}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1" dir="ltr"><Phone className="w-4 h-4" /> {selectedPatient.phone}</span>
                      {selectedPatient.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {selectedPatient.email}</span>}
                    </div>
                  </div>
                </div>
                <button onClick={openEdit} className="btn btn-secondary text-sm">
                  <Edit2 className="w-4 h-4" />
                  تعديل
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="text-center p-3 rounded-xl bg-slate-50"><div className="text-2xl font-extrabold text-primary-600">{patientApts.length}</div><p className="text-xs text-slate-500">إجمالي المواعيد</p></div>
                <div className="text-center p-3 rounded-xl bg-slate-50"><div className="text-2xl font-extrabold text-success-600">{past.length}</div><p className="text-xs text-slate-500">مواعيد مكتملة</p></div>
                <div className="text-center p-3 rounded-xl bg-slate-50"><div className="text-2xl font-extrabold text-warning-600">{upcoming.length}</div><p className="text-xs text-slate-500">مواعيد قادمة</p></div>
                <div className="text-center p-3 rounded-xl bg-slate-50"><div className="text-2xl font-extrabold text-slate-600">{selectedPatient.age || '-'}</div><p className="text-xs text-slate-500">العمر</p></div>
              </div>
            </>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary-600" /> المواعيد القادمة</h3>
          {loadingApts ? (
            <div className="space-y-2">{Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-16 shimmer-bg rounded-xl" />)}</div>
          ) : upcoming.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">لا توجد مواعيد قادمة</p>
          ) : (
            <div className="space-y-2">
              {upcoming.map((apt) => {
                const sc = statusConfig[apt.status] || statusConfig.pending;
                return (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{apt.doctor} - {apt.department}</p>
                      <p className="text-xs text-slate-500">{apt.appointment_date} <span dir="ltr">{apt.appointment_time}</span></p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${sc.color}`}>{sc.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-success-600" /> سجل المواعيد السابقة</h3>
          {loadingApts ? (
            <div className="space-y-2">{Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-16 shimmer-bg rounded-xl" />)}</div>
          ) : past.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">لا توجد مواعيد سابقة</p>
          ) : (
            <div className="space-y-2">
              {past.map((apt) => {
                const sc = statusConfig[apt.status] || statusConfig.pending;
                return (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{apt.doctor} - {apt.department}</p>
                      <p className="text-xs text-slate-500">{apt.appointment_date} <span dir="ltr">{apt.appointment_time}</span></p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${sc.color}`}>{sc.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input type="text" placeholder="ابحث عن مريض..." value={search} onChange={(e) => setSearch(e.target.value)} className={`${inputClass} pr-11`} />
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="card p-6 shimmer-bg h-32 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">لا يوجد مرضى</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <button key={p.id} onClick={() => openPatient(p)} className="card p-5 text-right hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center group-hover:from-primary-500 group-hover:to-secondary-500 transition-all">
                  <User className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 truncate">{p.full_name}</h3>
                  <p className="text-sm text-slate-500" dir="ltr">{p.phone}</p>
                  {p.email && <p className="text-xs text-slate-400 truncate">{p.email}</p>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

