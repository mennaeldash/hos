import {
  CalendarDays, UserRound, Building2, Users, Cpu, Building,
  BarChart3, MessageSquare, TrendingUp, Clock, CheckCircle, XCircle,
  CalendarClock, UserCircle, Stethoscope,
} from 'lucide-react';
import { useAppointments, useDoctors, useDepartments, useStaff, useEquipment, usePartners, useContactMessages, usePatients } from '@/lib/hooks';
import { getDayKey } from '@/lib/booking';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function DashboardHome({ onNavigate }) {
  const { data: appointments } = useAppointments();
  const { data: doctors } = useDoctors();
  const { data: departments } = useDepartments();
  const { data: staff } = useStaff();
  const { data: equipment } = useEquipment();
  const { data: partners } = usePartners();
  const { data: messages } = useContactMessages();
  const { data: patients } = usePatients();

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const pendingApts = appointments.filter((a) => a.status === 'pending');
  const confirmedApts = appointments.filter((a) => a.status === 'confirmed');
  const completedApts = appointments.filter((a) => a.status === 'completed');
  const cancelledApts = appointments.filter((a) => a.status === 'cancelled');
  const noShowApts = appointments.filter((a) => a.status === 'no_show');
  const todayApts = appointments.filter((a) => a.appointment_date === todayStr);
  const tomorrowApts = appointments.filter((a) => a.appointment_date === tomorrowStr);

  const activeDoctors = doctors.filter((d) => d.status === 'active');

  const stats = [
    { label: 'مواعيد اليوم', value: todayApts.length, icon: CalendarClock, color: 'from-primary-500 to-primary-700', key: 'appointments' },
    { label: 'مواعيد الغد', value: tomorrowApts.length, icon: CalendarDays, color: 'from-accent-500 to-accent-700', key: 'appointments' },
    { label: 'إجمالي الأطباء', value: doctors.length, icon: UserRound, color: 'from-secondary-500 to-secondary-700', key: 'doctors' },
    { label: 'إجمالي الأقسام', value: departments.length, icon: Building2, color: 'from-warning-500 to-warning-700', key: 'departments' },
    { label: 'إجمالي المرضى', value: patients.length, icon: Users, color: 'from-success-500 to-success-700', key: 'patients' },
    { label: 'مواعيد مكتملة', value: completedApts.length, icon: TrendingUp, color: 'from-success-500 to-success-700', key: 'appointments' },
    { label: 'مواعيد ملغاة', value: cancelledApts.length, icon: XCircle, color: 'from-error-500 to-error-700', key: 'appointments' },
    { label: 'أطباء متاحون اليوم', value: activeDoctors.length, icon: Stethoscope, color: 'from-primary-600 to-secondary-600', key: 'doctors' },
  ];

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden p-8 bg-gradient-to-l from-primary-600 to-secondary-600 text-white">
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-10 w-52 h-52 rounded-full bg-white/10" />
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold mb-2">مرحباً بك في لوحة التحكم</h2>
          <p className="text-white/80">إدارة شاملة لجميع بيانات المستشفى والمواعيد</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigate(stat.key)}
              className="card p-5 text-right hover:shadow-xl transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-extrabold text-slate-800">
                <AnimatedCounter value={stat.value} withPulse />
              </div>
              <p className="text-sm text-slate-500 font-bold">{stat.label}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card p-4 border-r-4 border-warning-500">
          <Clock className="w-7 h-7 text-warning-500 mb-2" />
          <div className="text-xl font-extrabold text-slate-800">
            <AnimatedCounter value={pendingApts.length} withPulse />
          </div>
          <p className="text-xs text-slate-500">قيد الانتظار</p>
        </div>
        <div className="card p-4 border-r-4 border-primary-500">
          <CheckCircle className="w-7 h-7 text-primary-500 mb-2" />
          <div className="text-xl font-extrabold text-slate-800">
            <AnimatedCounter value={confirmedApts.length} withPulse />
          </div>
          <p className="text-xs text-slate-500">مؤكدة</p>
        </div>
        <div className="card p-4 border-r-4 border-success-500">
          <TrendingUp className="w-7 h-7 text-success-500 mb-2" />
          <div className="text-xl font-extrabold text-slate-800">
            <AnimatedCounter value={completedApts.length} withPulse />
          </div>
          <p className="text-xs text-slate-500">مكتملة</p>
        </div>
        <div className="card p-4 border-r-4 border-error-500">
          <XCircle className="w-7 h-7 text-error-500 mb-2" />
          <div className="text-xl font-extrabold text-slate-800">
            <AnimatedCounter value={cancelledApts.length} withPulse />
          </div>
          <p className="text-xs text-slate-500">ملغاة</p>
        </div>
        <div className="card p-4 border-r-4 border-slate-400">
          <UserCircle className="w-7 h-7 text-slate-500 mb-2" />
          <div className="text-xl font-extrabold text-slate-800">
            <AnimatedCounter value={noShowApts.length} withPulse />
          </div>
          <p className="text-xs text-slate-500">لم يحضر</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">مواعيد اليوم</h3>
            <button onClick={() => onNavigate('appointments')} className="text-sm text-primary-600 font-bold hover:underline">عرض الكل</button>
          </div>
          {todayApts.length === 0 ? (
            <p className="text-slate-500 text-center py-8">لا توجد مواعيد اليوم</p>
          ) : (
            <div className="space-y-3">
              {todayApts.slice(0, 6).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm" dir="ltr">
                      {apt.appointment_time?.slice(0, 5) || '--:--'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{apt.full_name}</p>
                      <p className="text-xs text-slate-500">{apt.doctor} - {apt.department}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    apt.status === 'pending' ? 'bg-warning-100 text-warning-700' :
                    apt.status === 'confirmed' ? 'bg-primary-100 text-primary-700' :
                    apt.status === 'completed' ? 'bg-success-100 text-success-700' :
                    apt.status === 'no_show' ? 'bg-slate-200 text-slate-700' :
                    'bg-error-100 text-error-700'
                  }`}>
                    {apt.status === 'pending' ? 'انتظار' :
                     apt.status === 'confirmed' ? 'مؤكد' :
                     apt.status === 'completed' ? 'مكتمل' :
                     apt.status === 'no_show' ? 'لم يحضر' : 'ملغي'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">روابط سريعة</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('calendar')} className="p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-all text-center">
              <CalendarDays className="w-6 h-6 text-primary-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">التقويم</p>
            </button>
            <button onClick={() => onNavigate('patients')} className="p-4 rounded-xl bg-secondary-50 hover:bg-secondary-100 transition-all text-center">
              <Users className="w-6 h-6 text-secondary-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">المرضى</p>
            </button>
            <button onClick={() => onNavigate('doctors')} className="p-4 rounded-xl bg-accent-50 hover:bg-accent-100 transition-all text-center">
              <UserRound className="w-6 h-6 text-accent-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">الأطباء</p>
            </button>
            <button onClick={() => onNavigate('messages')} className="p-4 rounded-xl bg-warning-50 hover:bg-warning-100 transition-all text-center">
              <MessageSquare className="w-6 h-6 text-warning-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">الرسائل</p>
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-primary-600 mb-1">
                <AnimatedCounter value={messages.length} withPulse />
              </div>
              <p className="text-sm text-slate-500">رسائل تواصل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

