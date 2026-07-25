import { useState } from 'react';
import {
  CheckCircle,
  User,
  Loader2,
  Check,
  X,
  Building2,
  Stethoscope,
  Clock,
} from 'lucide-react';

import { createAppointment } from '@/services/appointments';
import { createNotification } from '@/services/notifications';
import { useDoctorSchedule } from '@/lib/hooks';

export default function BookingWizard({ doctor, department, onClose }) {
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    notes: '',
  });

  const { schedule } = useDoctorSchedule(doctor.id);

  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-slate-200 ' +
    'focus:border-primary-500 focus:ring-2 focus:ring-primary-200 ' +
    'outline-none transition-all bg-white text-slate-800';

  const labelClass = 'block text-sm font-bold text-slate-700 mb-2';

  const dayLabels = {
    saturday: 'السبت',
    sunday: 'الأحد',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
  };

  const canSubmit =
    form.full_name.trim() !== '' &&
    form.phone.trim() !== '';

  const handleInputChange = (field, value) => {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  };

  const handleConfirm = async () => {
    if (!canSubmit || submitting) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createAppointment({
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        age: form.age || null,
        gender: form.gender || null,

        department: department.name,
        doctor: doctor.name,

        department_id: department.id,
        doctor_id: doctor.id,

        notes: form.notes.trim() || null,

        /*
          لا يوجد اختيار تاريخ أو وقت في الصفحة.
          القيمتان ترسلان فارغتين حتى يتم تحديد الموعد لاحقًا
          بواسطة إدارة المستشفى.
        */
        appointment_date: null,
        appointment_time: null,

        status: 'pending',
      });

      await createNotification({
        type: 'appointment',
        title: 'طلب حجز جديد',
        message: `طلب حجز جديد: ${form.full_name.trim()} مع ${doctor.name}`,
      });

      setConfirmed(true);
    } catch (err) {
      console.error('Booking error:', err);

      setError(
        'حدث خطأ أثناء إرسال طلب الحجز. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-lg w-full p-8 md:p-12 text-center animate-scale-in shadow-xl">
          <div className="w-24 h-24 mx-auto rounded-full bg-success-100 flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-success-600" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 mb-3">
            تم إرسال طلب الحجز بنجاح
          </h2>

          <p className="text-slate-600 mb-6">
            تم تسجيل بياناتك، وسوف يتم التواصل معك لتحديد موعد الحجز
            وتأكيده.
          </p>

          <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-right space-y-3">
            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 text-sm">
                الطبيب
              </span>

              <span className="font-bold text-slate-800 text-sm">
                {doctor.name}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 text-sm">
                القسم
              </span>

              <span className="font-bold text-slate-800 text-sm">
                {department.name}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 text-sm">
                المريض
              </span>

              <span className="font-bold text-slate-800 text-sm">
                {form.full_name}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 text-sm">
                الهاتف
              </span>

              <span
                className="font-bold text-slate-800 text-sm"
                dir="ltr"
              >
                {form.phone}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-slate-500 text-sm">
                حالة الطلب
              </span>

              <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold">
                في انتظار التأكيد
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary w-full"
          >
            تم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full mx-auto overflow-hidden">
      {/* رأس نموذج الحجز */}
      <div className="bg-gradient-to-l from-primary-600 to-secondary-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold">
            حجز موعد
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="p-2 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
              <Building2 className="w-4 h-4" />
              القسم
            </div>

            <p className="font-bold text-lg">
              {department.name}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
              <Stethoscope className="w-4 h-4" />
              الطبيب
            </div>

            <p className="font-bold text-lg">
              {doctor.name}
            </p>

            {doctor.specialty && (
              <p className="text-xs text-white/70">
                {doctor.specialty}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* عنوان بيانات المريض */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-500/30">
            <User className="w-5 h-5" />
          </div>

          <div>
            <h3 className="font-extrabold text-slate-800">
              بيانات المريض
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              أدخل بياناتك وسوف نتواصل معك لتحديد الموعد
            </p>
          </div>
        </div>
      </div>

      {/* حقول البيانات */}
      <div className="p-6">
        {error && (
          <div className="bg-error-50 text-error-700 p-4 rounded-xl mb-5 text-sm font-bold">
            {error}
          </div>
        )}

        <div className="space-y-5 animate-fade-in">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                الاسم الكامل *
              </label>

              <input
                type="text"
                required
                value={form.full_name}
                onChange={(event) =>
                  handleInputChange(
                    'full_name',
                    event.target.value
                  )
                }
                className={inputClass}
                placeholder="أدخل اسمك الكامل"
                disabled={submitting}
              />
            </div>

            <div>
              <label className={labelClass}>
                رقم الهاتف *
              </label>

              <input
                type="tel"
                required
                value={form.phone}
                onChange={(event) =>
                  handleInputChange(
                    'phone',
                    event.target.value
                  )
                }
                className={inputClass}
                placeholder="05xxxxxxxx"
                dir="ltr"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  handleInputChange(
                    'email',
                    event.target.value
                  )
                }
                className={inputClass}
                placeholder="example@email.com"
                dir="ltr"
                disabled={submitting}
              />
            </div>

            <div>
              <label className={labelClass}>
                العمر
              </label>

              <input
                type="number"
                min="0"
                max="120"
                value={form.age}
                onChange={(event) =>
                  handleInputChange(
                    'age',
                    event.target.value
                  )
                }
                className={inputClass}
                placeholder="العمر"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                الجنس
              </label>

              <select
                value={form.gender}
                onChange={(event) =>
                  handleInputChange(
                    'gender',
                    event.target.value
                  )
                }
                className={inputClass}
                disabled={submitting}
              >
                <option value="">
                  اختر
                </option>

                <option value="male">
                  ذكر
                </option>

                <option value="female">
                  أنثى
                </option>
              </select>
            </div>

            <div>
              <label className={labelClass}>
                ملاحظات (اختياري)
              </label>

              <input
                type="text"
                value={form.notes}
                onChange={(event) =>
                  handleInputChange(
                    'notes',
                    event.target.value
                  )
                }
                className={inputClass}
                placeholder="أي ملاحظات إضافية"
                disabled={submitting}
              />
            </div>
          </div>

          {/* مواعيد عمل الطبيب للعرض فقط */}
          {schedule && (
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                <Clock className="w-4 h-4 text-primary-500" />
                مواعيد عمل الطبيب
              </div>

              {schedule.working_days?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {schedule.working_days.map((day) => (
                    <span
                      key={day}
                      className="px-2.5 py-1 rounded-lg bg-primary-100 text-primary-700 text-xs font-bold"
                    >
                      {dayLabels[day] || day}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-xs text-slate-500">
                ساعات العمل:{' '}

                <span dir="ltr">
                  {schedule.start_time} - {schedule.end_time}
                </span>

                {schedule.slot_duration && (
                  <>
                    {' '}• مدة الموعد: {schedule.slot_duration} دقيقة
                  </>
                )}
              </p>

              <p className="text-xs text-slate-400 mt-2">
                سيتم التواصل معك لاختيار الموعد المناسب.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* أزرار النموذج */}
      <div className="border-t border-slate-100 p-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="btn btn-secondary disabled:opacity-50"
        >
          <X className="w-4 h-4" />
          إلغاء
        </button>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canSubmit || submitting}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري الحجز...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              تأكيد الحجز
            </>
          )}
        </button>
      </div>
    </div>
  );
}