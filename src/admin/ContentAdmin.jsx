import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { getSiteContent, updateSiteContent } from '@/services/content';

export default function ContentAdmin({ section, title }) {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getSiteContent(section);
      setContent(data || {});
      setLoading(false);
    })();
  }, [section]);

  const handleSave = async () => {
    setSaving(true);
    await updateSiteContent(section, content);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";

  if (loading) return <div className="card p-8 shimmer-bg h-64 rounded-2xl" />;

  const renderField = (key, value) => {
    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-3">
          <label className={labelClass}>{key}</label>
          {value.map((item, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 rounded-xl bg-slate-50">
              {Object.entries(item).map(([k, v]) => (
                <div key={k}>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{k}</label>
                  <input type="text" value={String(v)} onChange={(e) => {
                    const newArr = [...value];
                    newArr[idx] = { ...item, [k]: e.target.value };
                    setContent({ ...content, [key]: newArr });
                  }} className={inputClass} />
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'string' && value.length > 80) {
      return (
        <div key={key}>
          <label className={labelClass}>{key}</label>
          <textarea value={value} onChange={(e) => setContent({ ...content, [key]: e.target.value })} className={inputClass} rows={4} />
        </div>
      );
    }

    return (
      <div key={key}>
        <label className={labelClass}>{key}</label>
        <input type="text" value={String(value || '')} onChange={(e) => setContent({ ...content, [key]: e.target.value })} className={inputClass} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="card p-6 space-y-4">
        <h3 className="text-lg font-bold text-slate-800 mb-4">إدارة محتوى: {title}</h3>
        {Object.keys(content).length === 0 ? (
          <p className="text-slate-500 text-center py-8">لا يوجد محتوى. أضف محتوى من الحقول أدناه.</p>
        ) : (
          Object.entries(content).map(([key, value]) => renderField(key, value))
        )}

        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <button onClick={handleSave} disabled={saving} className="btn btn-primary disabled:opacity-50">
            <Save className="w-5 h-5" />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
          {saved && <span className="text-sm text-success-600 font-bold">تم الحفظ بنجاح</span>}
        </div>
      </div>
    </div>
  );
}

