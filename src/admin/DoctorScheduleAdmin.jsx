import { useState, useEffect } from 'react';
import {
  ArrowRight, Save, Plus, Trash2, Calendar, Clock,
  Check, Loader2, CalendarOff,
} from 'lucide-react';
import { WEEK_DAYS, SLOT_DURATIONS, generateSlots } from '@/lib/booking';
import {
  addDoctorVacation,
  getDoctorSchedule,
  getDoctorVacations,
  removeDoctorVacation,
  saveDoctorSchedule,
} from '@/services/doctors';

export default function DoctorScheduleAdmin({ doctor, onBack }) {
  const [schedule, setSchedule] = useState(null);
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newVacationDate, setNewVacationDate] = useState('');
  const [newVacationReason, setNewVacationReason] = useState('vacation');

  const fetchData = async () => {
    setLoading(true);
    const [schedRes, vacRes] = await Promise.all([
      getDoctorSchedule(doctor.id),
      getDoctorVacations(doctor.id),
    ]);
    setSchedule(schedRes || null);
    setVacations(vacRes || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [doctor.id]);

  const initSchedule = async () => {
    await saveDoctorSchedule(doctor.id, {
      working_days: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday'],
      start_time: '09:00',
      end_time: '17:00',
      slot_duration: 30,
    });
    fetchData();
  };

  const handleSave = async () => {
    if (!schedule) return;
    setSaving(true);
    await saveDoctorSchedule(doctor.id, {
      working_days: schedule.working_days,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      slot_duration: schedule.slot_duration,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleDay = (dayKey) => {
    if (!schedule) return;
    const days = schedule.working_days.includes(dayKey)
      ? schedule.working_days.filter((d) => d !== dayKey)
      : [...schedule.working_days, dayKey];
    setSchedule({ ...schedule, working_days: days });
  };

  const addVacation = async () => {
    if (!newVacationDate) return;
    const data = await addDoctorVacation(doctor.id, {
      vacation_date: newVacationDate,
      reason: newVacationReason,
    });
    if (data) setVacations([...vacations, data]);
    setNewVacationDate('');
  };

  const removeVacation = async (id) => {
    await removeDoctorVacation(id);
    setVacations(vacations.filter((v) => v.id !== id));
  };

  const inputClass = "px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  const previewSlots = schedule ? generateSlots(schedule) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">جدول العمل: {doctor.name}</h2>
          <p className="text-sm text-slate-500">{doctor.specialty}</p>
        </div>
      </div>

      {!schedule ? (
        <div className="card p-8 text-center">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">لا يوجد جدول عمل</h3>
          <p className="text-slate-500 mb-6">أنشئ جدول عمل لهذا الطبيب لتفعيل الحجز</p>
          <button onClick={initSchedule} className="btn btn-primary">
            <Plus className="w-5 h-5" />
            إنشاء جدول عمل
          </button>
        </div>
      ) : (
        <>
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              أيام العمل
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {WEEK_DAYS.map((day) => {
                const isActive = schedule.working_days.includes(day.key);
                return (
                  <button
                    key={day.key}
                    onClick={() => toggleDay(day.key)}
                    className={`p-3 rounded-xl font-bold text-sm transition-all ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {isActive && <Check className="w-4 h-4 inline mb-1 ml-1" />}
                    {day.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              ساعات العمل ومدة الموعد
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              <div><label className={labelClass}>وقت البداية</label><input type="time" value={schedule.start_time} onChange={(e) => setSchedule({ ...schedule, start_time: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>وقت النهاية</label><input type="time" value={schedule.end_time} onChange={(e) => setSchedule({ ...schedule, end_time: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>مدة الموعد</label>
                <select value={schedule.slot_duration} onChange={(e) => setSchedule({ ...schedule, slot_duration: Number(e.target.value) })} className={inputClass}>
                  {SLOT_DURATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button onClick={handleSave} disabled={saving} className="btn btn-primary disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'جاري الحفظ...' : 'حفظ الجدول'}
              </button>
              {saved && <span className="text-sm text-success-600 font-bold">تم الحفظ بنجاح</span>}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">معاينة المواعيد المتاحة</h3>
            {previewSlots.length === 0 ? (
              <p className="text-slate-500 text-sm">لا توجد مواعيد متاحة بهذه الإعدادات</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {previewSlots.map((slot) => (
                  <span key={slot} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-bold" dir="ltr">{slot}</span>
                ))}
              </div>
            )}
            <p className="text-xs text-slate-400 mt-3">إجمالي المواعيد اليومية: {previewSlots.length}</p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CalendarOff className="w-5 h-5 text-error-500" />
              الإجازات والعطل
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input type="date" value={newVacationDate} onChange={(e) => setNewVacationDate(e.target.value)} className={inputClass} />
              <select value={newVacationReason} onChange={(e) => setNewVacationReason(e.target.value)} className={inputClass}>
                <option value="vacation">إجازة</option>
                <option value="holiday">عطلة رسمية</option>
                <option value="unavailable">غير متاح</option>
              </select>
              <button onClick={addVacation} disabled={!newVacationDate} className="btn btn-secondary disabled:opacity-50 shrink-0">
                <Plus className="w-4 h-4" />
                إضافة
              </button>
            </div>
            {vacations.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-4">لا توجد إجازات مسجلة</p>
            ) : (
              <div className="space-y-2">
                {vacations.map((v) => (
                  <div key={v.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div>
                      <span className="font-bold text-slate-800 text-sm">{v.vacation_date}</span>
                      <span className="text-xs text-slate-500 mr-3">
                        {v.reason === 'vacation' ? 'إجازة' : v.reason === 'holiday' ? 'عطلة رسمية' : 'غير متاح'}
                      </span>
                    </div>
                    <button onClick={() => removeVacation(v.id)} className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

