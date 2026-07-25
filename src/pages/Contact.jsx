import { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Facebook, Instagram, Linkedin, Send, CheckCircle,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { useSiteContent } from '@/lib/hooks';
import { createContactMessage } from '@/services/contact';

export default function Contact() {
  const { content } = useSiteContent('contact');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const contact = content || {
    address: 'الفيوم ',
    phone: '+20102345678',
    whatsapp: '+20102345678',
    email: 'info@road-hospital.sa',
    hours: 'طوارئ 24 ساعة | العيادات: 8 صباحاً - 10 مساءً',
    map_url: '',
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Send contact message to backend API
    await createContactMessage(form);
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white text-slate-800";
  const labelClass = "block text-sm font-bold text-slate-700 mb-2";

  return (
    <div className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-4 border border-white/20">
              تواصل معنا
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">تواصل معنا</h1>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              نحن هنا للإجابة على استفساراتك ومساعدتك في أي وقت
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Reveal>
              <div className="card card-lift p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">العنوان</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{contact.address}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card card-lift p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary-100 text-secondary-600 flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">الهاتف</h3>
                <a href={`tel:${contact.phone}`} className="text-sm text-slate-600 hover:text-primary-600" dir="ltr">{contact.phone}</a>
                <p className="mt-2">
                  <a href={`https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-success-600 font-bold">
                    <MessageCircle className="w-4 h-4" />
                    واتساب
                  </a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card card-lift p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-accent-100 text-accent-600 flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">البريد الإلكتروني</h3>
                <a href={`mailto:${contact.email}`} className="text-sm text-slate-600 hover:text-primary-600 break-all">{contact.email}</a>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="card card-lift p-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-warning-100 text-warning-600 flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">ساعات العمل</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{contact.hours}</p>
              </div>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="card overflow-hidden h-full min-h-[400px]">
                <div className="w-full h-full min-h-[400px] bg-slate-200 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sar!2ssa!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="موقع المستشفى"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="card p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto rounded-full bg-success-100 flex items-center justify-center mb-6 animate-scale-in">
                      <CheckCircle className="w-10 h-10 text-success-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">تم إرسال رسالتك بنجاح</h3>
                    <p className="text-slate-600 mb-6">سنتواصل معك في أقرب وقت ممكن</p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-extrabold text-slate-800 mb-6">أرسل لنا رسالة</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className={labelClass}>الاسم *</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="اسمك" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelClass}>البريد الإلكتروني *</label>
                          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="example@email.com" dir="ltr" />
                        </div>
                        <div>
                          <label className={labelClass}>الهاتف</label>
                          <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="05xxxxxxxx" dir="ltr" />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>الرسالة *</label>
                        <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputClass} rows={5} placeholder="اكتب رسالتك هنا..." />
                      </div>
                      <button type="submit" disabled={loading} className="btn btn-primary w-full text-lg disabled:opacity-50">
                        {loading ? 'جاري الإرسال...' : (
                          <>
                            <Send className="w-5 h-5" />
                            إرسال الرسالة
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="text-center mt-12">
              <h3 className="text-xl font-bold text-slate-800 mb-6">تابعنا على وسائل التواصل</h3>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-12 h-12 rounded-2xl bg-primary-100 hover:bg-primary-600 hover:text-white text-primary-600 flex items-center justify-center transition-all hover:scale-110">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-secondary-100 hover:bg-secondary-600 hover:text-white text-secondary-600 flex items-center justify-center transition-all hover:scale-110">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-accent-100 hover:bg-accent-600 hover:text-white text-accent-600 flex items-center justify-center transition-all hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={`https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-success-100 hover:bg-success-600 hover:text-white text-success-600 flex items-center justify-center transition-all hover:scale-110">
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

