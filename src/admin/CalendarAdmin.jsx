import { useState, useEffect, useMemo } from 'react';
import {
  ChevronRight, ChevronLeft, Calendar as CalendarIcon,
  Clock, X, User, Building2, UserRound,
} from 'lucide-react';
import { getAppointments } from '@/services/appointments';

const statusColors = {
  pending: 'bg-warning-100 text-warning-700 border-warning-300',
  confirmed: 'bg-primary-100 text-primary-700 border-primary-300',
  completed: 'bg-success-100 text-success-700 border-success-300',
  cancelled: 'bg-error-100 text-error-700 border-error-300',
  no_show: 'bg-slate-200 text-slate-700 border-slate-300',
};

const statusLabels = {
  pending: 'انتظار',
  confirmed: 'مؤكد',
  completed: 'مكتمل',
  cancelled: 'ملغي',
  no_show: 'لم يحضر',
};

const dayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

export default function CalendarAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedApt, setSelectedApt] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = await getAppointments();
    setAppointments((data || []).sort((a, b) => (a.appointment_date || '').localeCompare(b.appointment_date || '')));
    setLoading(false);
  };

  const aptsByDate = useMemo(() => {
    const map = {};
    appointments.forEach((a) => {
      if (a.appointment_date) {
        if (!map[a.appointment_date]) map[a.appointment_date] = [];
        map[a.appointment_date].push(a);
      }
    });
    return map;
  }, [appointments]);

  const dateStr = (d) => d.toISOString().split('T')[0];

  const monthGrid = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const days = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
    while (days.length % 7 !== 0) days.push(null);
    return days;
  }, [currentDate]);

  const weekDays = useMemo(() => {
    const start = new Date(currentDate);
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const navigate = (dir) => {
    const d = new Date(currentDate);
    if (viewMode === 'month') d.setMonth(d.getMonth() + dir);
    else if (viewMode === 'week') d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir);
    setCurrentDate(d);
  };

  const headerTitle = () => {
    if (viewMode === 'month') return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    if (viewMode === 'week') {
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.getDate()} - ${end.getDate()} ${monthNames[end.getMonth()]} ${end.getFullYear()}`;
    }
    return `${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const inputClass = "px-4 py-2 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-extrabold text-slate-800 min-w-[200px] text-center">{headerTitle()}</h2>
            <button onClick={() => navigate(1)} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentDate(new Date())} className="btn btn-secondary text-sm py-2">اليوم</button>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-slate-400" />
            <select value={viewMode} onChange={(e) => setViewMode(e.target.value)} className={inputClass}>
              <option value="day">يوم</option>
              <option value="week">أسبوع</option>
              <option value="month">شهر</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="card p-8 shimmer-bg h-96 rounded-2xl" />
      ) : (
        <>
          {viewMode === 'month' && (
            <div className="card p-4 overflow-x-auto">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((d) => (
                  <div key={d} className="text-center text-sm font-bold text-slate-600 py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {monthGrid.map((date, i) => {
                  if (!date) return <div key={i} className="min-h-[80px] rounded-xl bg-slate-50/50" />;
                  const ds = dateStr(date);
                  const dayApts = aptsByDate[ds] || [];
                  const isToday = ds === dateStr(new Date());
                  return (
                    <div key={i} className={`min-h-[80px] rounded-xl p-1.5 border transition-all ${isToday ? 'border-primary-400 bg-primary-50' : 'border-slate-100 bg-white hover:bg-slate-50'}`}>
                      <div className={`text-xs font-bold mb-1 ${isToday ? 'text-primary-700' : 'text-slate-600'}`}>{date.getDate()}</div>
                      <div className="space-y-1">
                        {dayApts.slice(0, 3).map((apt) => (
                          <button key={apt.id} onClick={() => setSelectedApt(apt)} className={`w-full text-right text-xs px-1.5 py-0.5 rounded-md border truncate ${statusColors[apt.status] || statusColors.pending}`}>
                            <span dir="ltr">{apt.appointment_time}</span> {apt.full_name}
                          </button>
                        ))}
                        {dayApts.length > 3 && <div className="text-xs text-slate-400 px-1.5">+{dayApts.length - 3} موعد</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'week' && (
            <div className="card p-4 overflow-x-auto">
              <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                {weekDays.map((date, i) => {
                  const ds = dateStr(date);
                  const dayApts = aptsByDate[ds] || [];
                  const isToday = ds === dateStr(new Date());
                  return (
                    <div key={i} className={`rounded-xl p-2 border min-h-[300px] ${isToday ? 'border-primary-400 bg-primary-50' : 'border-slate-100'}`}>
                      <div className="text-center mb-2">
                        <div className="text-xs text-slate-500">{dayNames[date.getDay()]}</div>
                        <div className={`text-lg font-extrabold ${isToday ? 'text-primary-700' : 'text-slate-800'}`}>{date.getDate()}</div>
                      </div>
                      <div className="space-y-1.5">
                        {dayApts.map((apt) => (
                          <button key={apt.id} onClick={() => setSelectedApt(apt)} className={`w-full text-right text-xs px-2 py-1.5 rounded-lg border ${statusColors[apt.status] || statusColors.pending}`}>
                            <div className="font-bold" dir="ltr">{apt.appointment_time}</div>
                            <div className="truncate">{apt.full_name}</div>
                            <div className="truncate opacity-70">{apt.doctor}</div>
                          </button>
                        ))}
                        {dayApts.length === 0 && <div className="text-xs text-slate-300 text-center py-4">لا مواعيد</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {viewMode === 'day' && (
            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">مواعيد {currentDate.getDate()} {monthNames[currentDate.getMonth()]}</h3>
              {(aptsByDate[dateStr(currentDate)] || []).length === 0 ? (
                <p className="text-slate-500 text-center py-8">لا توجد مواعيد في هذا اليوم</p>
              ) : (
                <div className="space-y-2">
                  {(aptsByDate[dateStr(currentDate)] || []).sort((a, b) => (a.appointment_time || '').localeCompare(b.appointment_time || '')).map((apt) => (
                    <button key={apt.id} onClick={() => setSelectedApt(apt)} className={`w-full flex items-center gap-4 p-4 rounded-xl border text-right transition-all hover:shadow-md ${statusColors[apt.status] || statusColors.pending}`}>
                      <div className="flex items-center gap-2 font-bold text-lg" dir="ltr">
                        <Clock className="w-5 h-5" />
                        {apt.appointment_time}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{apt.full_name}</p>
                        <p className="text-sm text-slate-600">{apt.doctor} - {apt.department}</p>
                      </div>
                      <span className="text-xs font-bold">{statusLabels[apt.status]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedApt(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-800">تفاصيل الموعد</h3>
              <button onClick={() => setSelectedApt(null)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <User className="w-5 h-5 text-slate-400" />
                <div><p className="text-xs text-slate-500">المريض</p><p className="font-bold text-slate-800">{selectedApt.full_name}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الطبيب</p><p className="font-bold text-slate-800 text-sm">{selectedApt.doctor}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">القسم</p><p className="font-bold text-slate-800 text-sm">{selectedApt.department}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">التاريخ</p><p className="font-bold text-slate-800 text-sm">{selectedApt.appointment_date}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الوقت</p><p className="font-bold text-slate-800 text-sm" dir="ltr">{selectedApt.appointment_time}</p></div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الهاتف</p><p className="font-bold text-slate-800 text-sm" dir="ltr">{selectedApt.phone}</p></div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[selectedApt.status] || statusColors.pending}`}>{statusLabels[selectedApt.status]}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

