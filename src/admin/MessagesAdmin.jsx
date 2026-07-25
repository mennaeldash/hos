import { useEffect, useState } from 'react';
import { Trash2, Mail, Phone, Clock } from 'lucide-react';
import { deleteContactMessage, getContactMessages } from '@/services/contact';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await getContactMessages();
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    await deleteContactMessage(id);
    setMessages(messages.filter((m) => m.id !== id));
  };

  if (loading) {
    return <div className="space-y-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="card p-6 shimmer-bg h-32 rounded-2xl" />)}</div>;
  }

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="card p-12 text-center">
          <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">لا توجد رسائل</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-800">{msg.name}</h3>
                <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 hover:text-primary-600" dir="ltr">
                    <Mail className="w-4 h-4" /> {msg.email}
                  </a>
                  {msg.phone && (
                    <span className="flex items-center gap-1" dir="ltr">
                      <Phone className="w-4 h-4" /> {msg.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(msg.created_at).toLocaleDateString('ar-EG')}
                </span>
                <button onClick={() => handleDelete(msg.id)} className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

