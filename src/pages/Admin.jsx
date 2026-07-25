import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, CalendarDays, UserRound, Building2, Users,
  Cpu, Building, BarChart3, Info, Shield, Award, HelpCircle,
  Phone, Settings, Menu, X, Cross, ArrowRight, Bell,
  Calendar, FileText,
} from 'lucide-react';
import DashboardHome from '@/admin/DashboardHome';
import AppointmentsAdmin from '@/admin/AppointmentsAdmin';
import DoctorsAdmin from '@/admin/DoctorsAdmin';
import DepartmentsAdmin from '@/admin/DepartmentsAdmin';
import StaffAdmin from '@/admin/StaffAdmin';
import EquipmentAdmin from '@/admin/EquipmentAdmin';
import PartnersAdmin from '@/admin/PartnersAdmin';
import StatisticsAdmin from '@/admin/StatisticsAdmin';
import ContentAdmin from '@/admin/ContentAdmin';
import MessagesAdmin from '@/admin/MessagesAdmin';
import PatientsAdmin from '@/admin/PatientsAdmin';
import CalendarAdmin from '@/admin/CalendarAdmin';
import NotificationsPanel from '@/admin/NotificationsPanel';
import { useNotifications } from '@/lib/hooks';
import { markAllNotificationsRead } from '@/services/notifications';

const sidebarItems = [
  { key: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { key: 'appointments', label: 'المواعيد', icon: CalendarDays },
  { key: 'calendar', label: 'التقويم', icon: Calendar },
  { key: 'doctors', label: 'الأطباء', icon: UserRound },
  { key: 'departments', label: 'الأقسام', icon: Building2 },
  { key: 'patients', label: 'المرضى', icon: Users },
  { key: 'equipment', label: 'الأجهزة الطبية', icon: Cpu },
  { key: 'staff', label: 'الطاقم الإداري', icon: Users },
  { key: 'partners', label: 'الشركات الشريكة', icon: Building },
  { key: 'statistics', label: 'الإحصائيات', icon: BarChart3 },
  { key: 'about', label: 'من نحن', icon: Info },
  { key: 'rights', label: 'حقوق المرضى', icon: Shield },
  { key: 'why', label: 'لماذا نختارنا', icon: Award },
  { key: 'messages', label: 'رسائل التواصل', icon: HelpCircle },
  { key: 'contact', label: 'معلومات التواصل', icon: Phone },
  { key: 'settings', label: 'الإعدادات', icon: Settings },
];

export default function Admin() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { data: notifications, refetch: refetchNotifs } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    const interval = setInterval(() => refetchNotifs(), 30000);
    return () => clearInterval(interval);
  }, [refetchNotifs]);

  const markAllRead = async () => {
    await markAllNotificationsRead();
    refetchNotifs();
  };

  const renderContent = () => {
    switch (active) {
      case 'dashboard': return <DashboardHome onNavigate={setActive} />;
      case 'appointments': return <AppointmentsAdmin />;
      case 'calendar': return <CalendarAdmin />;
      case 'doctors': return <DoctorsAdmin />;
      case 'departments': return <DepartmentsAdmin />;
      case 'patients': return <PatientsAdmin />;
      case 'staff': return <StaffAdmin />;
      case 'equipment': return <EquipmentAdmin />;
      case 'partners': return <PartnersAdmin />;
      case 'statistics': return <StatisticsAdmin />;
      case 'about': return <ContentAdmin section="about" title="من نحن" />;
      case 'rights': return <ContentAdmin section="patient_rights" title="حقوق المرضى" />;
      case 'why': return <ContentAdmin section="why_choose" title="لماذا نختارنا" />;
      case 'messages': return <MessagesAdmin />;
      case 'contact': return <ContentAdmin section="contact" title="معلومات التواصل" />;
      case 'settings': return <SettingsPage />;
      default: return <DashboardHome onNavigate={setActive} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 right-0 z-40 h-screen w-72 bg-slate-900 text-slate-300 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <Cross className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-white">مستشفي رواد الطب</h2>
              <p className="text-xs text-slate-400">لوحة التحكم</p>
            </div>
          </Link>

          <nav className="space-y-1 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActive(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    active === item.key
                      ? 'bg-gradient-to-l from-primary-600 to-secondary-600 text-white shadow-lg'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-extrabold text-slate-800">
                {sidebarItems.find((i) => i.key === active)?.label}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Bell className="w-6 h-6 text-slate-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-error-500 text-white text-xs font-bold flex items-center justify-center animate-scale-in">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                    <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl z-40 max-h-96 overflow-y-auto animate-fade-in-down">
                      <div className="flex items-center justify-between p-4 border-b border-slate-100 sticky top-0 bg-white">
                        <h3 className="font-bold text-slate-800">الإشعارات</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-xs text-primary-600 font-bold hover:underline">
                            تحديد الكل كمقروء
                          </button>
                        )}
                      </div>
                      <NotificationsPanel onNavigate={(key) => { setActive(key); setNotifOpen(false); }} />
                    </div>
                  </>
                )}
              </div>
              <Link to="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 font-bold transition-colors">
                <ArrowRight className="w-4 h-4" />
                العودة للموقع
              </Link>
            </div>
          </div>
        </header>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="card p-8 text-center">
      <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-800 mb-2">الإعدادات</h3>
      <p className="text-slate-500">سيتم إضافة الإعدادات قريباً</p>
    </div>
  );
}

