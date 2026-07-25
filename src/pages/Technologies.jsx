import {
  Scan, Activity, FlaskConical, Scissors, Siren, Cpu,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import PlaceholderImage from '@/components/PlaceholderImage';
import { useEquipment } from '@/lib/hooks';

const categories = [
  { key: 'radiology', label: 'أجهزة الأشعة', icon: Scan, color: 'from-primary-500 to-primary-700', bg: 'bg-primary-50', text: 'text-primary-600' },
  { key: 'icu', label: 'أجهزة العناية المركزة', icon: Activity, color: 'from-error-500 to-error-700', bg: 'bg-error-50', text: 'text-error-600' },
  { key: 'laboratory', label: 'أجهزة المختبرات', icon: FlaskConical, color: 'from-secondary-500 to-secondary-700', bg: 'bg-secondary-50', text: 'text-secondary-600' },
  { key: 'operating', label: 'أجهزة غرف العمليات', icon: Scissors, color: 'from-accent-500 to-accent-700', bg: 'bg-accent-50', text: 'text-accent-600' },
  { key: 'emergency', label: 'أجهزة الطوارئ', icon: Siren, color: 'from-warning-500 to-warning-700', bg: 'bg-warning-50', text: 'text-warning-600' },
];

export default function Technologies() {
  const { data: equipment, loading } = useEquipment();

  return (
    <div className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8413121/pexels-photo-8413121.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-4 border border-white/20">
              التقنيات الطبية
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">تقنياتنا الطبية</h1>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              نستخدم أحدث الأجهزة والمعدات الطبية لضمان تشخيص دقيق وعلاج فعال
            </p>
          </Reveal>
        </div>
      </section>

      {categories.map((cat) => {
        const items = equipment.filter((e) => e.category === cat.key);
        const Icon = cat.icon;
        return (
          <section key={cat.key} className="section-padding bg-slate-50">
            <div className="container-custom">
              <Reveal>
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">{cat.label}</h2>
                    <p className="text-slate-500">أحدث المعدات في هذا المجال</p>
                  </div>
                </div>
              </Reveal>

              {loading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="card p-6 shimmer-bg h-64 rounded-2xl" />
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((item, idx) => (
                    <Reveal key={item.id} delay={idx * 60}>
                      <div className="card card-lift p-5 group">
                        <div className="relative overflow-hidden rounded-2xl mb-4">
                          <PlaceholderImage
                            type="device"
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-44"
                            rounded="rounded-2xl"
                          />
                          <div className={`absolute top-3 right-3 w-10 h-10 rounded-xl ${cat.bg} ${cat.text} flex items-center justify-center`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-800 mb-2 group-hover:text-primary-600 transition-colors">{item.name}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <section className="py-20 bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600" />
              <div className="relative z-10">
                <Cpu className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-3xl font-extrabold text-white mb-4">تقنية في خدمة الصحة</h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                  نستثمر في أحدث التقنيات الطبية لضمان أفضل رعاية لمرضانا
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

