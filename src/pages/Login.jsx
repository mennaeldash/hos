import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail, ShieldCheck } from "lucide-react";
import { loginAdmin } from "@/services/login";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");

  if (!email.trim() || !password) {
    setError("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
    return;
  }

  try {
    setLoading(true);

    const data = await loginAdmin(email.trim(), password);

    console.log("LOGIN RESPONSE:", data);

    if (!data?.token) {
      setError("تم تسجيل الدخول ولكن لم يتم استلام رمز الدخول.");
      return;
    }

    localStorage.setItem("adminToken", data.token);

    navigate("/admin", {
      replace: true,
      state: { authenticated: true },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    if (err.response?.status === 401) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    } else if (err.response?.status === 400) {
      setError("بيانات تسجيل الدخول غير صحيحة.");
    } else if (err.response) {
      setError("حدث خطأ أثناء تسجيل الدخول.");
    } else if (err.request) {
      setError("تعذر الاتصال بالسيرفر.");
    } else {
      setError("حدث خطأ غير متوقع.");
    }

  } finally {
    setLoading(false);
  }
};

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FAF6F6] text-[#2F3437] flex items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-[28px] border border-[#E7E3E3] bg-white shadow-[0_24px_70px_rgba(47,52,55,0.12)]">
        <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#197786] to-[#176A77] p-10 text-white">
          <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#83BDC4]/25" />

          <div className="relative z-10">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white p-1 shadow-lg">
                <img
                  src="/images/logo.jpeg"
                  alt="مستشفى رواد الطب"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-extrabold">مستشفى رواد الطب</h1>
                <p className="text-sm font-bold text-white/75">التخصصي</p>
              </div>
            </div>

            <p className="mb-3 text-sm font-bold text-[#D1F9FC]">منطقة الإدارة</p>
            <h2 className="max-w-md text-4xl font-black leading-tight">
              إدارة الموقع تبدأ من هنا
            </h2>
            <p className="mt-5 max-w-md leading-8 text-white/75">
              دخول مخصص لإدارة محتوى وخدمات مستشفى رواد الطب التخصصي.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-sm font-bold text-white/80">
            <ShieldCheck className="h-5 w-5 text-[#D1F9FC]" />
            وصول مخصص لفريق الإدارة
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 lg:hidden flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white p-1 ring-2 ring-[#D1F9FC]">
              <img
                src="/images/logo.jpeg"
                alt="مستشفى رواد الطب"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-[#176A77]">مستشفى رواد الطب</h1>
              <p className="text-xs font-bold text-[#197786]">التخصصي</p>
            </div>
          </div>

          <div className="mb-8">
            <p className="mb-2 text-sm font-bold text-[#197786]">لوحة الإدارة</p>
            <h2 className="text-3xl font-black text-[#2F3437]">تسجيل دخول لوحة التحكم</h2>
            <p className="mt-3 leading-7 text-[#6D686A]">
              هذه الصفحة مخصصة لإدارة محتوى وخدمات الموقع.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-[#CCAEB0] bg-[#FAF0F1] px-4 py-3 text-sm font-bold leading-6 text-[#7C3439]"
              >
                {error}
              </div>
            )}

            <div>
          <label
  htmlFor="email"
  className="mb-2 block text-sm font-bold text-[#2F3437]"
>
  البريد الإلكتروني
</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6D686A]" />
            <input
  id="email"
  type="email"
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  placeholder="أدخل البريد الإلكتروني"
  autoComplete="email"
  disabled={loading}
  className="w-full rounded-xl border border-[#E7E3E3] bg-white py-3.5 pr-12 pl-4 text-[#2F3437] outline-none transition focus:border-[#197786] focus:ring-2 focus:ring-[#D1F9FC] disabled:bg-slate-50"
/>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold text-[#2F3437]">
                كلمة المرور
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6D686A]" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="أدخل كلمة المرور"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-[#E7E3E3] bg-white py-3.5 pr-12 pl-12 text-[#2F3437] outline-none transition focus:border-[#197786] focus:ring-2 focus:ring-[#D1F9FC] disabled:bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  disabled={loading}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[#6D686A] transition hover:bg-[#D1F9FC] hover:text-[#176A77] disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#197786] px-5 py-3.5 font-extrabold text-white shadow-[0_10px_24px_rgba(25,119,134,0.2)] transition hover:bg-[#176A77] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-5 w-5" />
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>

          <Link
            to="/"
            className="mt-6 block text-center text-sm font-bold text-[#197786] transition hover:text-[#176A77]"
          >
            العودة إلى الموقع
          </Link>
        </section>
      </div>
    </main>
  );
}
