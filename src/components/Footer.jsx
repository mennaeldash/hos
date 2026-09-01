import { Link } from 'react-router-dom';
import {
  Cross,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  MessageCircle,
} from 'lucide-react';
import { useSiteContent } from '@/lib/hooks';

export default function Footer() {
  const { content } = useSiteContent('contact');

  const contact = content || {
    address: ' الفيوم',
    phone: '+20101234567',
    whatsapp: '+20101234567',
    email: 'info@rowd-hospital.sa',
    hours: 'طوارئ 24 ساعة | العيادات: 8 صباحاً - 10 مساءً',
  };

  const quickLinks = [
    { to: '/', label: 'الرئيسية' },
    { to: '/clinics', label: 'العيادات الخارجية' },
    { to: '/doctors', label: 'أطباؤنا' },
    { to: '/technologies', label: 'خدماتنا' },
    { to: '/contact', label: 'تواصل معنا' },
  ];

  const departments = [
    'الباطنة', 'القلب', 'العظام', 'الأطفال', 'الأعصاب', 'الجراحة',
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-10 pb-2 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient" />
<div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-600/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24 mb-1">
          {/* About */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
                <Cross className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-white"> مستشفي روادالطب التخصصي</h3>
              </div>
            </Link>
            <p className="text-md leading-relaxed text-slate-400 mb-5">
              صرح طبي رائد يقدم خدمات صحية متكاملة بأعلى المعايير العالمية، نجمع بين الخبرة الطبية والتقنية المتقدمة.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-secondary-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-accent-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${contact.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-success-600 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-xl mb-5 relative inline-block ">
              روابط سريعة
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-primary-500 rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-md text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
         

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-xl mb-5 relative inline-block">
              تواصل معنا
              <span className="absolute -bottom-2 right-0 w-12 h-1 bg-accent-500 rounded-full" />
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-md">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">{contact.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-secondary-400 shrink-0" />
                <a href={`tel:${contact.phone}`} className="text-slate-400 hover:text-white transition-colors" dir="ltr">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-accent-400 shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-white transition-colors">{contact.email}</a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-warning-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-4 pb-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} مستشفى رواد الطب التخصصي. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-primary-400 transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-primary-400 transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

