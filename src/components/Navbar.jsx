import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, CalendarPlus } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/clinics', label: 'العيادات الخارجية' },
  { to: '/physical-therapy', label: 'العلاج الطبيعي' },
  { to: '/doctors', label: 'أطباؤنا' },
  { to: '/technologies', label: ' خدماتنا' },
  { to: '/home-booking', label: 'الرعايه المنزليه' },
  { to: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div
        className={`mx-auto max-w-7xl rounded-[28px] border transition-all duration-300 backdrop-blur-xl ${
          scrolled
            ? 'bg-white/80 border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.12)]'
            : 'bg-white/75 border-white/60 shadow-[0_12px_35px_rgba(15,23,42,0.08)]'
        }`}
      >
        <nav className="container-custom flex items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_10px_25px_rgba(25,119,134,0.18)] ring-2 ring-primary-100 group-hover:scale-110 transition-transform duration-300 bg-white">
              <img
                src="/images/logo.jpeg"
                alt="مستشفى رواد الطب"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="font-extrabold text-lg leading-tight text-primary-900">
                مستشفى رواد الطب
              </h1>
              <p className="text-[11px] font-bold tracking-[0.14em] text-primary-600">التخصصي</p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 rounded-full bg-slate-50/80 px-2 py-2 border border-slate-200/80 shadow-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link rounded-full px-4 py-2.5 ${
                    location.pathname === link.to
                      ? 'active text-primary-700 bg-primary-50'
                      : 'text-slate-700 hover:text-primary-700'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/clinics"
              className="btn btn-accent text-sm shadow-[0_12px_25px_rgba(149,50,56,0.28)] hover:-translate-y-0.5"
            >
              <CalendarPlus className="w-4 h-4" />
              احجز الآن
            </Link>
          </div>

          <button
            className={`lg:hidden p-2.5 rounded-xl transition-all ${
              scrolled ? 'bg-slate-100 text-primary-700' : 'bg-primary-50 text-primary-700'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-4 mb-3 rounded-2xl bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] border border-primary-100">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block px-4 py-3 rounded-xl font-bold transition-all ${
                      location.pathname === link.to
                        ? 'bg-primary-50 text-primary-700 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/clinics" className="btn btn-accent w-full mt-2 shadow-[0_10px_18px_rgba(149,50,56,0.2)]">
                  <CalendarPlus className="w-4 h-4" />
                  احجز الآن
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

