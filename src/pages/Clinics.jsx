import { useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Stethoscope, HeartPulse, Bone, Scissors, Droplet, Smile, Flower, Activity, Brain,
  ArrowLeft, CalendarPlus, GraduationCap, Briefcase, Clock,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import PlaceholderImage from '@/components/PlaceholderImage';
import { useDepartments, useDoctors, useDoctorSchedule } from '@/lib/hooks';

const departmentIcons = {
  'heart-pulse': HeartPulse,
  stethoscope: Stethoscope,
  activity: Activity,
  flower: Flower,
  bone: Bone,
  scissors: Scissors,
  droplet: Droplet,
  smile: Smile,
  brain: Brain,
};

const dayLabels = {
  saturday: 'السبت', sunday: 'الأحد', monday: 'الإثنين',
  tuesday: 'الثلاثاء', wednesday: 'الأربعاء', thursday: 'الخميس', friday: 'الجمعة',
};

/** Convert 24h time to 12h format */
function formatTime(time) {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'م' : 'ص';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function ClinicsList() {
  const { data: departments, loading: deptLoading } = useDepartments();
  const { data: doctors } = useDoctors();

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-4 border border-white/20">
              العيادات الخارجية
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">أقسامنا الطبية</h1>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              اختر القسم ثم الطبيب واحجز موعدك في خطوات بسيطة
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          {deptLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="card p-8 shimmer-bg h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departments.map((dept, idx) => {
                const Icon = departmentIcons[dept.icon || ''] || Stethoscope;
                const count = doctors.filter((d) => d.department_id === dept.id && d.status === 'active').length;
                return (
                  <Reveal key={dept.id} delay={idx * 50}>
                    <Link
                      to={`/clinics/${dept.slug}`}
                      className="card card-lift p-6 text-center w-full group h-full block"
                    >
                      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-5 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-500">
                        <Icon className="w-10 h-10 text-primary-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{dept.name}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">{dept.description}</p>
                      <div className="flex items-center justify-center gap-2 mb-3">
                      
                      </div>
                      <span className="inline-flex items-center gap-1 text-primary-600 font-bold text-sm group-hover:gap-2 transition-all">
                        عرض الأطباء
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function DepartmentDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: departments } = useDepartments();
  const { data: doctors } = useDoctors();

  const department = useMemo(
    () => departments.find((d) => d.slug === slug),
    [departments, slug]
  );

  const deptDoctors = useMemo(
    () => (department ? doctors.filter((d) => d.department_id === department.id && d.status === 'active') : []),
    [department, doctors]
  );

  if (!department) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-lg mb-4">القسم غير موجود</p>
          <button onClick={() => navigate('/clinics')} className="btn btn-primary">
            العودة للأقسام
          </button>
        </div>
      </div>
    );
  }

  const Icon = departmentIcons[department.icon || ''] || Stethoscope;

  return (
    <div className="pt-24">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="container-custom relative z-10">
          <button
            onClick={() => navigate('/clinics')}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-bold mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة للأقسام
          </button>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{department.name}</h1>
              <p className="text-white/80">{department.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <Reveal>
            <SectionHeading
              badge="أطباء القسم"
              title={`أطباء ${department.name}`}
              subtitle="اختر الطبيب المناسب واحجز موعدك مباشرة"
            />
          </Reveal>

          {deptDoctors.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">لا يوجد أطباء متاحون في هذا القسم حالياً</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {deptDoctors.map((doctor, idx) => (
                <Reveal key={doctor.id} delay={idx * 80}>
                  <DoctorCardWithSchedule doctor={doctor} department={department} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DoctorCardWithSchedule({ doctor, department }) {
  const navigate = useNavigate();
  const { schedule } = useDoctorSchedule(doctor.id);

  const handleBook = () => {
    navigate(`/booking?doctor=${doctor.id}&dept=${department.id}`);
  };

  return (
    <div className="card card-lift p-6 group">
      <PlaceholderImage
        type="doctor"
        src={doctor.image_url}
        alt={doctor.name}
        className="w-full mb-5"
        rounded="rounded-2xl"
      />
      <h3 className="text-xl font-bold text-slate-800 mb-1">{doctor.name}</h3>
      <p className="text-primary-600 font-bold text-sm mb-3">{doctor.specialty}</p>
      <p className="text-xs text-slate-400 font-bold mb-3">{department.name}</p>

      {doctor.bio && (
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">{doctor.bio}</p>
      )}

      <div className="space-y-2 mb-4">
        {doctor.qualification && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="line-clamp-2">{doctor.qualification}</span>
          </div>
        )}
        {doctor.experience_years != null && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{doctor.experience_years} سنة خبرة</span>
          </div>
        )}
        {schedule && schedule.working_days?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-start gap-2 text-sm text-slate-600">
              <Clock className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-primary-700 mb-1.5">مواعيد العيادة:</p>
                <div className="space-y-1">
                  {(() => {
                    // Group consecutive working days for nicer display
                    const days = schedule.working_days;
                    const dayPairs = [];
                    for (let i = 0; i < days.length; i += 2) {
                      if (i + 1 < days.length) {
                        dayPairs.push(`${dayLabels[days[i]] || days[i]} و ${dayLabels[days[i + 1]] || days[i + 1]}`);
                      } else {
                        dayPairs.push(dayLabels[days[i]] || days[i]);
                      }
                    }
                    return dayPairs.map((pair, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-primary-400" />
                        <span className="text-slate-600">{pair}</span>
                        <span className="text-slate-900 font-bold" dir="ltr">
                          {formatTime(schedule.start_time)} – {formatTime(schedule.end_time)}
                        </span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleBook} className="btn btn-primary w-full group">
        <CalendarPlus className="w-4 h-4" />
        احجز موعد
      </button>
    </div>
  );
}

export default function Clinics() {
  const { slug } = useParams();

  if (slug) {
    return <DepartmentDetailPage />;
  }

  return <ClinicsList />;
}

