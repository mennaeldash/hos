import { Bell, CalendarPlus, X } from 'lucide-react';
import { useNotifications } from '@/lib/hooks';
import { deleteNotification, markNotificationRead } from '@/services/notifications';

export default function NotificationsPanel({ onNavigate }) {
  const { data: notifications, refetch } = useNotifications();

  const markRead = async (id) => {
    await markNotificationRead(id);
    refetch();
  };

  const deleteNotif = async (id, e) => {
    e.stopPropagation();
    await deleteNotification(id);
    refetch();
  };

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">لا توجد إشعارات</p>
      </div>
    );
  }

  return (
    <div className="py-2">
      {notifications.slice(0, 20).map((notif) => (
        <div
          key={notif.id}
          onClick={() => { if (!notif.is_read) markRead(notif.id); if (onNavigate) onNavigate('appointments'); }}
          className={`flex items-start gap-3 p-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${
            !notif.is_read ? 'bg-primary-50/50' : ''
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            notif.is_read ? 'bg-slate-100 text-slate-400' : 'bg-primary-100 text-primary-600'
          }`}>
            <CalendarPlus className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-sm">{notif.title}</p>
            <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{notif.message}</p>
            <p className="text-xs text-slate-400 mt-1">
              {new Date(notif.created_at).toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' })}
            </p>
          </div>
          {!notif.is_read && <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0 mt-2" />}
          <button onClick={(e) => deleteNotif(notif.id, e)} className="p-1 rounded-lg text-slate-300 hover:text-error-500 transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

