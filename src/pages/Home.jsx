import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Cross, Eye, Target, Shield, Heart, Award, ShieldCheck,
  Lock, Info, UserRound, Cpu, Clock, Activity, Zap, Target as TargetIcon,
  Phone, Mail, Facebook, Linkedin, Star, ChevronRight, ArrowLeft,
  Stethoscope, Baby, Brain, Ear, Hand, Eye as EyeIcon, Smile,
  Scissors, Droplet, Flower, Bone, HeartPulse, Building2,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import PlaceholderImage from '@/components/PlaceholderImage';
import {
  useSiteContent, useStatistics, useTestimonials,
  useStaff, usePartners,
} from '@/lib/hooks';

const patientRightsIcons = {
  shield: Shield,
  heart: Heart,
  award: Award,
  'shield-check': ShieldCheck,
  lock: Lock,
  info: Info,
};

const whyChooseIcons = {
  'user-md': UserRound,
  cpu: Cpu,
  clock: Clock,
  activity: Activity,
  zap: Zap,
  target: TargetIcon,
};

const statIcons = {
  'user-md': UserRound,
  bed: Activity,
  'door-open': Building2,
  building: Building2,
  truck: Activity,
  users: Activity,
};

export default function Home() {
  const { content: aboutContent } = useSiteContent('about');
  const { content: rightsContent } = useSiteContent('patient_rights');
  const { content: whyContent } = useSiteContent('why_choose');
  const { data: stats } = useStatistics();
  const { data: testimonials } = useTestimonials();
  const { data: staff } = useStaff();
  const { data: partners } = usePartners();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const about = aboutContent || {
    title: 'من نحن',
    description: 'مستشفى رواد الطب التخصصي هو صرح طبي رائد يقدم خدمات صحية متكاملة بأعلى المعايير العالمية.',
    vision: 'أن نكون المستشفى الرائد في تقديم الرعاية الصحية المتكاملة على المستوى الإقليمي.',
    mission: 'تقديم خدمات طبية متميزة بأحدث التقنيات وأمهر الكوادر الطبية مع الالتزام بأعلى معايير الجودة.',
  };

  const rights = rightsContent?.items || [
    { title: 'الخصوصية', description: 'الحفاظ التام على خصوصية المريض', icon: 'shield' },
    { title: 'الاحترام', description: 'معاملة كل مريض باحترام وتقدير', icon: 'heart' },
    { title: 'جودة الرعاية', description: 'رعاية صحية بأعلى المعايير', icon: 'award' },
    { title: 'سلامة المريض', description: 'بيئة آمنة خالية من الأخطار', icon: 'shield-check' },
    { title: 'السرية الطبية', description: 'حماية المعلومات الطبية', icon: 'lock' },
    { title: 'حق المعرفة', description: 'الإطلاع على التشخيص والعلاج', icon: 'info' },
  ];

  const whyChoose = whyContent?.items || [
    { title: 'أطباء ذوو خبرة', description: 'نخبة من أمهر الأطباء', icon: 'user-md' },
    { title: 'أحدث الأجهزة الطبية', description: 'تقنيات طبية متطورة', icon: 'cpu' },
    { title: 'طوارئ 24/7', description: 'خدمات طوارئ متواصلة', icon: 'clock' },
    { title: 'العناية المركزة ICU', description: 'وحدة عناية مركزة مجهزة', icon: 'activity' },
    { title: 'خدمة سريعة', description: 'سرعة في الإجراءات', icon: 'zap' },
    { title: 'تشخيص دقيق', description: 'تشخيص بأحدث التقنيات', icon: 'target' },
  ];

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="مستشفى"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="container-custom relative z-10 pt-20">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-6 border border-white/20">
                <Cross className="w-4 h-4" />
                رعاية صحية متكاملة بأعلى المعايير العالمية
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
               ستشفي رواد الطب
                <span className="block text-gradient bg-gradient-to-l from-white to-secondary-300 bg-clip-text text-transparent">
                  التخصصي
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 max-w-2xl">
                صرح طبي رائد يجمع بين الخبرة الطبية والتقنية المتقدمة والرعاية الإنسانية، لنقدم لك ولعائلتك أفضل خدمة صحية.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/clinics" className="btn btn-primary text-lg px-8 py-4 group">
                  احجز الآن
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <Link to="/clinics" className="btn btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20">
                  تعرف علينا
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-white/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary-50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-secondary-50 translate-x-1/2 translate-y-1/2" />
        <div className="container-custom relative">
          <Reveal>
            <SectionHeading
              badge="من نحن"
              title="نحن هنا من أجل صحتك"
              subtitle="مستشفى رواد الطب التخصصي صرح طبي رائد يقدم رعاية صحية متكاملة بأعلى المعايير العالمية"
            />
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-8">
            <Reveal>
              <div className="card card-lift p-8 h-full border-t-4 border-primary-500">
                <div className="icon-circle bg-primary-100 text-primary-600 mb-6">
                  <Cross className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-4">عن المستشفى</h3>
                <p className="text-slate-600 leading-relaxed">{about.description}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card card-lift p-8 h-full border-t-4 border-secondary-500">
                <div className="icon-circle bg-secondary-100 text-secondary-600 mb-6">
                  <Eye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-4">الرؤية</h3>
                <p className="text-slate-600 leading-relaxed">{about.vision}</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card card-lift p-8 h-full border-t-4 border-accent-500">
                <div className="icon-circle bg-accent-100 text-accent-600 mb-6">
                  <Target className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 mb-4">الرسالة</h3>
                <p className="text-slate-600 leading-relaxed">{about.mission}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Patient Rights */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="container-custom">
          <Reveal>
            <SectionHeading
              badge="حقوق المرضى"
              title="نحن نحترم حقوقك"
              subtitle="نلتزم بأعلى معايير حقوق المرضى لضمان رعاية عادلة وآمنة للجميع"
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rights.map((right, idx) => {
              const Icon = patientRightsIcons[right.icon] || Shield;
              return (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="card card-lift p-6 group">
                    <div className="flex items-start gap-4">
                      <div className="icon-circle bg-gradient-to-br from-primary-500 to-secondary-500 text-white shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{right.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{right.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-custom relative">
          <Reveal>
            <SectionHeading
              badge="لماذا نحن"
              title="لماذا تختار مستشفى رواد الطب"
              subtitle="نقدم لك أسباباً وجيهة لاختيارنا وجهتك الصحية الأولى"
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, idx) => {
              const Icon = whyChooseIcons[item.icon] || Award;
              return (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="card card-lift p-8 text-center group">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-5 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-500">
                      <Icon className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-primary-900/95 to-secondary-900/90" />
        </div>
        <div className="container-custom relative z-10">
          <Reveal>
            <SectionHeading
              title="إنجازاتنا بالأرقام"
              subtitle="أرقام تعكس التزامنا بخدمة المجتمع"
              light
            />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = statIcons[stat.icon || ''] || Activity;
              return (
                <Reveal key={stat.id} delay={idx * 80}>
                  <div className="text-center group">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                      <AnimatedCounter value={stat.value} suffix="+" withPulse />
                    </div>
                    <p className="text-slate-300 text-sm font-bold">{stat.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="section-padding bg-slate-50 overflow-hidden">
        <div className="container-custom">
          <Reveal>
            <SectionHeading
              badge="شركاؤنا"
              title="شركاء النجاح"
              subtitle="نتعاون مع نخبة من الشركات الطبية الرائدة"
            />
          </Reveal>
          <div className="relative">
            <div className="flex overflow-hidden gap-6 pb-4">
              <div className="flex gap-4 animate-[shimmer_30s_linear_infinite] shrink-0">
                {[...partners, ...partners].map((partner, idx) => (
                  <div
                    key={`${partner.id}-${idx}`}
className="w-40 shrink-0 card p-6 flex flex-col items-center gap-4 card-lift
transition-all duration-300
hover:bg-blue-50
hover:border-blue-200
hover:shadow-lg
cursor-pointer"                  >
                    <PlaceholderImage
                      type="company"
                      src={partner.logo_url}
                      alt={partner.name}
                      className="w-20 h-20"
                      rounded="rounded-2xl"
                    />
                    <h3 className="font-bold text-slate-700 text-center">{partner.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Administrative Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Reveal>
            <SectionHeading
              badge="فريق الإدارة"
              title="فريقنا الإداري"
              subtitle="قيادة متميزة تقود المستشفى نحو التميز"
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, idx) => (
              <Reveal key={member.id} delay={idx * 90}>
<div className="card card-lift p-6 text-center group transition-all duration-500 hover:-translate-y-12 hover:shadow-4xl">                  <div className="relative inline-block mb-5">
                    <PlaceholderImage
                      type="admin"
                      src={member.image_url}
                      alt={member.name}
                      className="w-28 h-28"
                      rounded="rounded-full"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-bold text-sm mb-3">{member.position}</p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{member.description}</p>
                  <div className="flex justify-center gap-3">
                    {member.facebook ? (
                      <a href={member.facebook} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-primary-600 hover:text-white flex items-center justify-center transition-all">
                        <Facebook className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Facebook className="w-4 h-4" />
                      </span>
                    )}
                    {member.linkedin ? (
                      <a href={member.linkedin} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-accent-600 hover:text-white flex items-center justify-center transition-all">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Linkedin className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-primary-900 to-secondary-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary-500/20 blur-3xl" />
        <div className="container-custom relative">
          <Reveal>
            <SectionHeading
              badge="آراء المرضى"
              title="ماذا يقول مرضانا"
              subtitle="تجارب حقيقية من مرضى وثقوا بنا"
              light
            />
          </Reveal>
          {testimonials.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <div className="glass rounded-3xl p-8 md:p-12 text-center">
                  <div className="flex justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial]?.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-warning-400 fill-warning-400" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-white leading-relaxed mb-6 font-medium">
                    "{testimonials[activeTestimonial]?.text}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <PlaceholderImage
                      type="patient"
                      src={testimonials[activeTestimonial]?.image_url}
                      alt={testimonials[activeTestimonial]?.patient_name}
                      className="w-16 h-16"
                      rounded="rounded-full"
                    />
                    <div className="text-right">
                      <h4 className="font-bold text-white text-lg">{testimonials[activeTestimonial]?.patient_name}</h4>
                      <p className="text-slate-300 text-sm">مريض</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === activeTestimonial ? 'w-8 bg-white' : 'w-2.5 bg-white/40'
                    }`}
                    aria-label={`الرأي ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
              <div className="absolute inset-0 animated-gradient" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  هل تحتاج إلى موعد؟
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  احجز موعدك الآن مع نخبة من أمهر الأطباء في مختلف التخصصات
                </p>
                <Link to="/clinics" className="btn bg-white text-primary-700 hover:bg-slate-100 text-lg px-8 py-4 group">
                  احجز موعدك الآن
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

