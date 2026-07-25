import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, CalendarPlus } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/clinics', label: 'العيادات الخارجية' },
  { to: '/doctors', label: 'أطباؤنا' },
  { to: '/technologies', label: 'التقنيات الطبية' },
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
    <header
    className="fixed top-0 left-0 right-0 z-50 bg-primary-950 shadow-lg"
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
      <Link to="/" className="flex items-center gap-3 group">
  <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
    <img
      src="/images/logo.jpeg"
      alt="مستشفى رواد الطب"
      className="w-full h-full object-contain"
    />
  </div>

  <div className="hidden sm:block">
    <h1 className="font-extrabold text-lg leading-tight text-white">
      مستشفى رواد الطب
    </h1>

    <p className="text-xs text-primary-100">
      التخصصي
    </p>
  </div>
</Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''} ${
                  scrolled ? 'text-white' : 'text-white hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
         
          <Link to="/clinics" className="btn btn-primary text-sm">
            <CalendarPlus className="w-4 h-4" />
            احجز الآن
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="القائمة"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass mx-4 mt-3 rounded-2xl p-4 shadow-xl">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl font-bold transition-colors ${
                    location.pathname === link.to
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/clinics" className="btn btn-primary w-full mt-2">
                <CalendarPlus className="w-4 h-4" />
                احجز الآن
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

