import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import PlaceholderImage from '@/components/PlaceholderImage';

const serviceOptions = ['كشف منزلي', 'متابعة حالة', 'خدمة طوارئ منزلية','أشعه منزليه'];

const initialForm = {
  fullName: '',
  phone: '',
  address: '',
  serviceType: '',
  caseDescription: '',
};

export default function HomeBooking() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  const servicesList = useMemo(
    () => ['كشف منزلي', 'متابعة حالة', 'خدمة طوارئ منزلية','أشعه منزليه'],
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitState.type) {
      setSubmitState({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'يرجى إدخال الاسم بالكامل.';
    if (!form.phone.trim()) nextErrors.phone = 'يرجى إدخال رقم الهاتف.';
    if (!form.address.trim()) nextErrors.address = 'يرجى إدخال عنوانك.';
    if (!form.serviceType) nextErrors.serviceType = 'يرجى اختيار نوع الخدمة.';
    if (!form.caseDescription.trim()) nextErrors.caseDescription = 'يرجى تقديم وصف مختصر للحالة.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmitState({ type: 'error', message: 'يرجى إكمال جميع الحقول المطلوبة.' });
      return;
    }

    // TODO: Connect to real API endpoint for home booking requests later.
    // Example: await fetch('/api/home-booking', { method: 'POST', body: JSON.stringify(form) });

    setSubmitState({
      type: 'success',
      message: 'تم إرسال الطلب بنجاح. سيتم التواصل معك من فريق المستشفى لتأكيد الموعد.',
    });
    setForm(initialForm);
    setErrors({});
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#FAF6F6]">
      <div className="container-custom max-w-6xl">
        <section className="pt-6 md:pt-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Reveal>
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-bold text-primary-700">
                  خدمة المنزل
                </span>

                <h1 className="text-3xl font-extrabold text-slate-800 md:text-4xl">
                  الحجز المنزلي
                </h1>

                <p className="text-lg leading-8 text-slate-600">
                  نقدم لك الرعاية الطبية في منزلك بكل أمان وراحة، حيث نرسل فريقاً طبياً أو أخصائياً إلى منزلك لتقديم الخدمة التي تحتاجها سواء كانت زيارة طبية، متابعة حالة، أو خدمة طوارئ منزلية.
                </p>

                <div className="space-y-3">
                  <h2 className="text-lg font-extrabold text-primary-700">خدماتنا تشمل:</h2>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-[#E7E3E3] bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#home-booking-form"
                  className="btn btn-accent mt-2 shadow-[0_12px_25px_rgba(149,50,56,0.2)] hover:-translate-y-0.5"
                >
                  احجز الآن
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-[28px] border border-[#E7E3E3] bg-white p-3 shadow-[0_20px_45px_rgba(25,119,134,0.08)]">
                <div className="overflow-hidden rounded-[22px]">
                  <PlaceholderImage
                    type="department"
                    src="/public/images/ChatGPT Image Aug 16, 2026, 04_31_45 AM.png"
                    alt="خدمة الرعاية المنزلية"
                    className="h-[360px] w-full md:h-[360px]"
                    rounded="rounded-[22px]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="home-booking-form" className="mt-14 md:mt-16">
          <Reveal>
            <SectionHeading
              badge="الحجز المنزلي"
              title=" طلب الحجز المنزلي"
              subtitle="املأ البيانات التالية وسيتواصل معك فريقنا لتأكيد الموعد المناسب."
              center={false}
            />
          </Reveal>

          <div className="mx-auto max-w-4xl rounded-[28px] border border-[#E7E3E3] bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-bold text-slate-700">
                    الاسم بالكامل
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400 ${errors.fullName ? 'border-red-300' : 'border-[#E7E3E3]'}`}
                    placeholder="أدخل الاسم بالكامل"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-bold text-slate-700">
                    رقم الهاتف
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400 ${errors.phone ? 'border-red-300' : 'border-[#E7E3E3]'}`}
                    placeholder="05xxxxxxxx"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="address" className="mb-2 block text-sm font-bold text-slate-700">
                    العنوان
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400 ${errors.address ? 'border-red-300' : 'border-[#E7E3E3]'}`}
                    placeholder="أدخل العنوان التفصيلي"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="serviceType" className="mb-2 block text-sm font-bold text-slate-700">
                    نوع الخدمة
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className={`w-full rounded-xl border bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400 ${errors.serviceType ? 'border-red-300' : 'border-[#E7E3E3]'}`}
                  >
                    <option value="">اختر الخدمة</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="caseDescription" className="mb-2 block text-sm font-bold text-slate-700">
                    وصف الحالة
                  </label>
                  <textarea
                    id="caseDescription"
                    name="caseDescription"
                    value={form.caseDescription}
                    onChange={handleChange}
                    rows={2}
                    className={`w-full rounded-xl border bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400 ${errors.caseDescription ? 'border-red-300' : 'border-[#E7E3E3]'}`}
                    placeholder="اكتب وصفاً مختصراً للحالة واحتياجاتك الطبية"
                  />
                  {errors.caseDescription && <p className="mt-1 text-sm text-red-500">{errors.caseDescription}</p>}
                </div>
              </div>

              {submitState.message && (
                <div
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold ${
                    submitState.type === 'success'
                      ? 'border-green-200 bg-green-50 text-green-700'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                >
                  {submitState.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                  {submitState.message}
                </div>
              )}

              <div className="pt-2">
                <button type="submit" className="btn btn-accent w-full justify-center shadow-[0_12px_25px_rgba(149,50,56,0.2)] hover:-translate-y-0.5 md:w-auto md:min-w-[220px]">
                  إرسال الطلب
                </button>
                <p className="mt-4 text-sm text-slate-500">
                  سيتم التواصل معك من فريق المستشفى لتأكيد الطلب وموعد الزيارة.
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
