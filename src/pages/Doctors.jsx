import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope, HeartPulse, Activity, Flower, Bone,
  Scissors, Droplet, Smile, Brain, ArrowLeft, GraduationCap, Briefcase,
  Phone, Mail, Facebook, Linkedin, Building2,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import PlaceholderImage from '@/components/PlaceholderImage';
import { useDepartments, useDoctors } from '@/lib/hooks';

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

export default function Doctors() {
  const { data: departments, loading: deptLoading } = useDepartments();
  const { data: doctors } = useDoctors();
  const [selectedDept, setSelectedDept] = useState(null);

  if (selectedDept) {
    return (
      <DoctorsByDepartment
        department={selectedDept}
        doctors={doctors.filter((d) => d.department_id === selectedDept.id)}
        onBack={() => setSelectedDept(null)}
      />
    );
  }

  return (
    <div className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold mb-4 border border-white/20">
              فريقنا الطبي
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">أطباؤنا</h1>
            <p className="text-lg text-slate-200 max-w-2xl mx-auto">
              نخبة من أمهر الأطباء والاستشاريين في مختلف التخصصات الطبية
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <Reveal>
            <SectionHeading
              badge="التخصصات"
              title="اختر القسم"
              subtitle="تصفح أقسامنا واختر التخصص المناسب لك"
            />
          </Reveal>

          {deptLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="card p-8 shimmer-bg h-48 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departments.map((dept, idx) => {
                const Icon = departmentIcons[dept.icon || ''] || Stethoscope;
                const count = doctors.filter((d) => d.department_id === dept.id).length;
                return (
                  <Reveal key={dept.id} delay={idx * 50}>
                    <button
                      onClick={() => setSelectedDept(dept)}
                      className="card card-lift p-6 text-center w-full group h-full"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-4 group-hover:from-primary-500 group-hover:to-secondary-500 transition-all duration-500">
                        <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{dept.name}</h3>
                      <p className="text-sm text-slate-500">{count} طبيب</p>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DoctorsByDepartment({ department, doctors, onBack }) {
  const Icon = departmentIcons[department.icon || ''] || Stethoscope;

  return (
    <div className="pt-24">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 animated-gradient" />
        <div className="container-custom relative z-10">
          <button
            onClick={onBack}
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
          {doctors.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">لا يوجد أطباء في هذا القسم حالياً</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor, idx) => (
                <Reveal key={doctor.id} delay={idx * 80}>
                  <div className="card card-lift p-6 group">
                    <PlaceholderImage
                      type="doctor"
                      src={doctor.image_url}
                      alt={doctor.name}
                      className="w-full mb-5"
                      rounded="rounded-2xl"
                    />
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{doctor.name}</h3>
                    <p className="text-primary-600 font-bold text-sm mb-4">{doctor.specialty}</p>

                    <div className="space-y-2 mb-4 text-sm">
                      {doctor.qualification && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{doctor.qualification}</span>
                        </div>
                      )}
                      {doctor.experience_years != null && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{doctor.experience_years} سنة خبرة</span>
                        </div>
                      )}
                      {doctor.office_number && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{doctor.office_number}</span>
                        </div>
                      )}
                    </div>

                    {doctor.bio && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{doctor.bio}</p>
                    )}

                    <div className="flex gap-2 mb-4">
                      {doctor.phone && (
                        <a href={`tel:${doctor.phone}`} className="w-9 h-9 rounded-xl bg-success-50 hover:bg-success-600 hover:text-white text-success-600 flex items-center justify-center transition-all">
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      {doctor.email && (
                        <a href={`mailto:${doctor.email}`} className="w-9 h-9 rounded-xl bg-accent-50 hover:bg-accent-600 hover:text-white text-accent-600 flex items-center justify-center transition-all">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

