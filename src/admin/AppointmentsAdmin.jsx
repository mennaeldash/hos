import { useState, useEffect, useMemo } from 'react';
import {
  Search, CheckCircle, XCircle, Clock, TrendingUp, Filter,
  Eye, Edit2, Trash2, ChevronLeft, ChevronRight, X,
  UserCircle, Calendar, Phone, Mail, FileText, ChevronUp, ChevronDown,
} from 'lucide-react';
import {
  deleteAppointment,
  getAppointments,
  updateAppointment,
  updateAppointmentStatus,
} from '@/services/appointments';

const statusConfig = {
  pending: { label: 'قيد الانتظار', color: 'bg-warning-100 text-warning-700', icon: Clock },
  confirmed: { label: 'مؤكد', color: 'bg-primary-100 text-primary-700', icon: CheckCircle },
  completed: { label: 'مكتمل', color: 'bg-success-100 text-success-700', icon: TrendingUp },
  cancelled: { label: 'ملغي', color: 'bg-error-100 text-error-700', icon: XCircle },
  no_show: { label: 'لم يحضر', color: 'bg-slate-200 text-slate-700', icon: UserCircle },
};

const PAGE_SIZE = 10;

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const data = await getAppointments();
    setAppointments((data || []).sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = appointments.filter((a) => {
      const matchesSearch =
        a.full_name.includes(search) ||
        a.phone.includes(search) ||
        (a.doctor || '').includes(search);
      const matchesFilter = filter === 'all' || a.status === filter;
      return matchesSearch && matchesFilter;
    });

    result.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (sortField === 'full_name' || sortField === 'status') {
        aVal = String(aVal); bVal = String(bVal);
        const cmp = aVal.localeCompare(bVal, 'ar');
        return sortDir === 'asc' ? cmp : -cmp;
      }
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [appointments, search, filter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const updateStatus = async (id, status) => {
    await updateAppointmentStatus(id, status);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm('هل أنت متأكد من حذف هذا الموعد؟')) return;
    await deleteAppointment(id);
    fetchData();
  };

  const openEdit = (apt) => {
    setEditing(apt);
    setEditForm({ ...apt });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { id, created_at, ...updateData } = editForm;
    await updateAppointment(editing.id, updateData);
    setSaving(false);
    setEditing(null);
    fetchData();
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800 text-sm";
  const labelClass = "block text-sm font-bold text-slate-700 mb-1.5";

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="w-3.5 h-3.5 text-slate-300 inline" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-primary-600 inline" />
      : <ChevronDown className="w-3.5 h-3.5 text-primary-600 inline" />;
  };

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" placeholder="ابحث بالاسم أو الهاتف أو الطبيب..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className={`${inputClass} pr-11`} />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }} className={inputClass}>
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="completed">مكتمل</option>
              <option value="cancelled">ملغي</option>
              <option value="no_show">لم يحضر</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 shimmer-bg rounded-xl" />)}
          </div>
        ) : pagedData.length === 0 ? (
          <div className="p-12 text-center text-slate-500">لا توجد مواعيد</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm cursor-pointer hover:bg-slate-100" onClick={() => toggleSort('full_name')}>
                    المريض <SortIcon field="full_name" />
                  </th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm hidden md:table-cell">الطبيب</th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm hidden lg:table-cell">القسم</th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm cursor-pointer hover:bg-slate-100" onClick={() => toggleSort('appointment_date')}>
                    التاريخ <SortIcon field="appointment_date" />
                  </th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm hidden md:table-cell">الوقت</th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm hidden lg:table-cell">الهاتف</th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm cursor-pointer hover:bg-slate-100" onClick={() => toggleSort('status')}>
                    الحالة <SortIcon field="status" />
                  </th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm cursor-pointer hover:bg-slate-100" onClick={() => toggleSort('created_at')}>
                    تاريخ الإنشاء <SortIcon field="created_at" />
                  </th>
                  <th className="text-right p-4 font-bold text-slate-700 text-sm">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {pagedData.map((apt) => {
                  const sc = statusConfig[apt.status] || statusConfig.pending;
                  const StatusIcon = sc.icon;
                  return (
                    <tr key={apt.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-slate-800 text-sm">{apt.full_name}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-600 hidden md:table-cell">{apt.doctor}</td>
                      <td className="p-4 text-sm text-slate-600 hidden lg:table-cell">{apt.department}</td>
                      <td className="p-4 text-sm text-slate-600">{apt.appointment_date || '-'}</td>
                      <td className="p-4 text-sm text-slate-600 hidden md:table-cell" dir="ltr">{apt.appointment_time || '-'}</td>
                      <td className="p-4 text-sm text-slate-600 hidden lg:table-cell" dir="ltr">{apt.phone}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${sc.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-slate-500">{new Date(apt.created_at).toLocaleDateString('ar-EG')}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <button onClick={() => setViewing(apt)} title="عرض" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-600 hover:text-white transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => openEdit(apt)} title="تعديل" className="p-2 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white transition-all">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(apt.id)} title="حذف" className="p-2 rounded-lg bg-error-50 text-error-600 hover:bg-error-600 hover:text-white transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-100">
            <span className="text-sm text-slate-500">
              صفحة {page + 1} من {totalPages} ({filtered.length} موعد)
            </span>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setViewing(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-800">تفاصيل الموعد</h3>
              <button onClick={() => setViewing(null)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <UserCircle className="w-5 h-5 text-slate-400" />
                <div><p className="text-xs text-slate-500">المريض</p><p className="font-bold text-slate-800">{viewing.full_name}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الطبيب</p><p className="font-bold text-slate-800 text-sm">{viewing.doctor}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">القسم</p><p className="font-bold text-slate-800 text-sm">{viewing.department}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">التاريخ</p><p className="font-bold text-slate-800 text-sm">{viewing.appointment_date}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الوقت</p><p className="font-bold text-slate-800 text-sm" dir="ltr">{viewing.appointment_time}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الهاتف</p><p className="font-bold text-slate-800 text-sm" dir="ltr">{viewing.phone}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">البريد</p><p className="font-bold text-slate-800 text-sm">{viewing.email || '-'}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">الجنس</p><p className="font-bold text-slate-800 text-sm">{viewing.gender === 'male' ? 'ذكر' : viewing.gender === 'female' ? 'أنثى' : '-'}</p></div>
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">العمر</p><p className="font-bold text-slate-800 text-sm">{viewing.age || '-'}</p></div>
              </div>
              {viewing.notes && (
                <div className="p-3 rounded-xl bg-slate-50"><p className="text-xs text-slate-500">ملاحظات</p><p className="text-slate-800 text-sm">{viewing.notes}</p></div>
              )}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <span className="text-sm text-slate-500">الحالة:</span>
                <select
                  value={viewing.status}
                  onChange={async (e) => { await updateStatus(viewing.id, e.target.value); setViewing({ ...viewing, status: e.target.value }); }}
                  className={inputClass}
                >
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                  <option value="no_show">لم يحضر</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h3 className="text-xl font-extrabold text-slate-800">تعديل الموعد</h3>
              <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-slate-100"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleEditSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>الاسم</label><input type="text" required value={editForm.full_name || ''} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>الهاتف</label><input type="text" required value={editForm.phone || ''} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} className={inputClass} dir="ltr" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>الطبيب</label><input type="text" value={editForm.doctor || ''} onChange={(e) => setEditForm({ ...editForm, doctor: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>القسم</label><input type="text" value={editForm.department || ''} onChange={(e) => setEditForm({ ...editForm, department: e.target.value })} className={inputClass} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>التاريخ</label><input type="date" value={editForm.appointment_date || ''} onChange={(e) => setEditForm({ ...editForm, appointment_date: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>الوقت</label><input type="time" value={editForm.appointment_time || ''} onChange={(e) => setEditForm({ ...editForm, appointment_time: e.target.value })} className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>الحالة</label>
                <select value={editForm.status || 'pending'} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })} className={inputClass}>
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغي</option>
                  <option value="no_show">لم يحضر</option>
                </select>
              </div>
              <div><label className={labelClass}>ملاحظات</label><textarea value={editForm.notes || ''} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} className={inputClass} rows={3} /></div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="submit" disabled={saving} className="btn btn-primary flex-1 disabled:opacity-50">{saving ? 'جاري الحفظ...' : 'حفظ'}</button>
                <button type="button" onClick={() => setEditing(null)} className="btn btn-secondary">إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

