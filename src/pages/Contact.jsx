import { useState } from "react";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/lib/hooks";

const COMPLAINTS_STORAGE_KEY = "road_hospital_complaints";

export default function Contact() {
  const { content } = useSiteContent("contact");
  const [form, setForm] = useState({ name: "", message: "" });
  const [submitState, setSubmitState] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (submitState.message) {
      setSubmitState({ type: "", message: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName || !trimmedMessage) {
      setSubmitState({
        type: "error",
        message: "يرجى إدخال الاسم ونص الرسالة.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const existing = (() => {
        try {
          const raw = window.localStorage.getItem(COMPLAINTS_STORAGE_KEY);
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          console.error("READ COMPLAINTS ERROR:", error);
          return [];
        }
      })();

      const complaint = {
        id: String(Date.now()),
        name: trimmedName,
        message: trimmedMessage,
        createdAt: new Date().toISOString(),
      };

      const next = [complaint, ...existing];
      window.localStorage.setItem(COMPLAINTS_STORAGE_KEY, JSON.stringify(next));

      setForm({ name: "", message: "" });
      setSubmitState({
        type: "success",
        message: "تم إرسال رسالتك بنجاح، شكرًا لتواصلك معنا.",
      });
    } catch (error) {
      console.error("SAVE COMPLAINT ERROR:", error);
      setSubmitState({
        type: "error",
        message: "حدث خطأ أثناء إرسال رسالتك، يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

 const contact = {
  address: content?.address || "الفيوم",

  phone:
    content?.phone &&
    content.phone.replace(/\D/g, "").length >= 8
      ? content.phone
      : "+20102345678",

  whatsapp:
    content?.whatsapp &&
    content.whatsapp.replace(/\D/g, "").length >= 8
      ? content.whatsapp
      : "+20102345678",

  email: content?.email || "info@road-hospital.sa",

  hours:
    content?.hours ||
    "طوارئ 24 ساعة | العيادات: 8 صباحاً - 10 مساءً",

  map_url: content?.map_url || "",
};
  const whatsappLink = `https://wa.me/${contact.whatsapp?.replace(
    /[^0-9]/g,
    ""
  )}`;

  return (
    <div className="pt-24">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative py-20 overflow-hidden">

        <div className="absolute inset-0">

          <img
            src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 hero-overlay" />

        </div>

        <div className="container-custom relative z-10 text-center">

          <Reveal>

            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-lg font-bold mb-4 border border-white/20">
              تواصل معنا
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              تواصل معنا
            </h1>

            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              نحن هنا للإجابة على استفساراتك ومساعدتك في أي وقت
            </p>

          </Reveal>

        </div>

      </section>


      {/* =====================================================
          COMPLAINTS / SUGGESTIONS
      ===================================================== */}

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="card p-6 md:p-8">
              <div className="mb-8 text-center">
                <span className="inline-flex items-center rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-sm font-bold text-primary-700">
                  الشكاوى والمقترحات
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-800">
                  الشكاوى والمقترحات
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  نسعد باستقبال ملاحظاتكم ومقترحاتكم، ونعمل دائمًا على تحسين مستوى الخدمة المقدمة.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="complaint-name" className="mb-2 block text-sm font-bold text-slate-700">
                    الاسم
                  </label>
                  <input
                    id="complaint-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="اكتب اسمك"
                    className="w-full rounded-xl border border-[#E7E3E3] bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400"
                  />
                </div>

                <div>
                  <label htmlFor="complaint-message" className="mb-2 block text-sm font-bold text-slate-700">
                    نص الرسالة
                  </label>
                  <textarea
                    id="complaint-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="اكتب شكاوى أو مقترحاتك هنا"
                    className="w-full rounded-xl border border-[#E7E3E3] bg-[#FAF6F6] px-4 py-3 text-slate-700 outline-none transition focus:border-primary-400"
                  />
                </div>

                {submitState.message && (
                  <div
                    className={`rounded-xl border px-4 py-3 text-sm font-bold ${
                      submitState.type === "success"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    {submitState.message}
                  </div>
                )}

                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary min-w-[180px]"
                  >
                    {isSubmitting ? "جاري الإرسال..." : "إرسال"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ===================================================== */}

      <section className="section-padding bg-slate-50">

        <div className="container-custom">

          {/* =================================================
              CONTACT CARDS
          ================================================= */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 items-stretch">

            {/* ADDRESS */}
            <Reveal className="h-full">

              <div className="card card-lift p-6 text-center h-full min-h-[220px] flex flex-col items-center justify-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 shrink-0">
                  <MapPin className="w-7 h-7" />
                </div>

                <h3 className="font-bold text-slate-800 mb-2">
                  العنوان
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {contact.address}
                </p>

              </div>

            </Reveal>


            {/* PHONE */}
            <Reveal delay={100} className="h-full">

              <div className="card card-lift p-6 text-center h-full min-h-[220px] flex flex-col items-center justify-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary-100 text-secondary-600 flex items-center justify-center mb-4 shrink-0">
                  <Phone className="w-7 h-7" />
                </div>

                <h3 className="font-bold text-slate-800 mb-2">
                  الهاتف
                </h3>

                <a
                  href={`tel:${contact.phone}`}
                  className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
                  dir="ltr"
                >
                  {contact.phone}
                </a>

                <div className="mt-2">

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-success-600 font-bold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </a>

                </div>

              </div>

            </Reveal>


            {/* EMAIL */}
            <Reveal delay={200} className="h-full">

              <div className="card card-lift p-6 text-center h-full min-h-[220px] flex flex-col items-center justify-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center mb-4 shrink-0">
                  <Mail className="w-7 h-7" />
                </div>

                <h3 className="font-bold text-slate-800 mb-2">
                  البريد الإلكتروني
                </h3>

                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-slate-600 hover:text-primary-600 break-all transition-colors"
                >
                  {contact.email}
                </a>

              </div>

            </Reveal>


            {/* WORKING HOURS */}
            <Reveal delay={300} className="h-full">

              <div className="card card-lift p-6 text-center h-full min-h-[220px] flex flex-col items-center justify-center">

                <div className="w-14 h-14 mx-auto rounded-2xl bg-warning-100 text-warning-600 flex items-center justify-center mb-4 shrink-0">
                  <Clock className="w-7 h-7" />
                </div>

                <h3 className="font-bold text-slate-800 mb-2">
                  ساعات العمل
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {contact.hours}
                </p>

              </div>

            </Reveal>

          </div>


          {/* =================================================
              MAP - FULL WIDTH
          ================================================= */}

          <Reveal>

            <div className="card overflow-hidden w-full">

              <div className="w-full h-[450px] md:h-[520px] bg-slate-200">

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sar!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقع المستشفى"
                />

              </div>

            </div>

          </Reveal>


          {/* =================================================
              SOCIAL MEDIA
          ================================================= */}

          <Reveal>

            <div className="text-center mt-12">

              <h3 className="text-xl font-bold text-slate-800 mb-6">
                تابعنا على وسائل التواصل
              </h3>

              <div className="flex justify-center gap-4">

                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-primary-100 hover:bg-primary-600 hover:text-white text-primary-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Facebook className="w-6 h-6" />
                </a>


                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-secondary-100 hover:bg-secondary-600 hover:text-white text-secondary-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Instagram className="w-6 h-6" />
                </a>


                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-accent-100 hover:bg-accent-600 hover:text-white text-accent-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Linkedin className="w-6 h-6" />
                </a>


                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-success-100 hover:bg-success-600 hover:text-white text-success-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>

              </div>

            </div>

          </Reveal>

        </div>

      </section>

    </div>
  );
}