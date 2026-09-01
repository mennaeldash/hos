import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarPlus, GraduationCap } from "lucide-react";

import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderImage from "@/components/PlaceholderImage";

const dayLabels = {
  saturday: "السبت",
  sunday: "الأحد",
  monday: "الإثنين",
  tuesday: "الثلاثاء",
  wednesday: "الأربعاء",
  thursday: "الخميس",
  friday: "الجمعة",
};

const physicalTherapyDoctors = [
  {
    id: "physical-therapy-1",
    name: "د/ حسام عادل الهاين",
    specialty:
      "أخصائي العلاج الطبيعي لأمراض العظام والعضلات والمفاصل والعمود الفقري",
    qualification: "ماجستير العلاج الطبيعي",
    bio: "أخصائي العلاج الطبيعي بمستشفى 1 أكتوبر العسكري سابقاً",
    image_url: "",
    department_id: "physical-therapy",
    working_days: ["saturday", "wednesday"],
  },
];

export default function PhysicalTherapy() {
  const doctors = useMemo(() => physicalTherapyDoctors, []);
  const navigate = useNavigate();

  return (
    <div className="pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-lg font-bold mb-4 border border-white/20">
              العلاج الطبيعي
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              قسم العلاج الطبيعي
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              رعاية متخصصة لاستعادة الحركة وتحسين الوظائف الجسدية بأحدث أساليب
              العلاج الطبيعي والتأهيل.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-[#F8FAFB]">
        <div className="container-custom">
          <Reveal>
            <SectionHeading
              badge="الأطباء"
              title="أطباء العلاج الطبيعي"
              subtitle="تعرف على فريق العلاج الطبيعي بالمستشفى"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map((doctor, idx) => (
              <Reveal key={doctor.id} delay={idx * 80} className="h-full">
                <div className="group h-full w-full overflow-hidden rounded-[24px] border border-[#E7E3E3] bg-white p-5 shadow-[0_8px_28px_rgba(47,52,55,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#83BDC4] hover:shadow-[0_16px_35px_rgba(25,119,134,0.11)]">
                  <div dir="rtl" className="text-right">
                    <div className="float-none sm:float-left w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] mx-auto sm:mx-0 sm:mr-5 mb-4 rounded-full p-[3px] bg-gradient-to-br from-[#197786] to-[#83BDC4] shadow-[0_8px_22px_rgba(25,119,134,0.15)]">
                      <div className="w-full h-full rounded-full bg-white p-[3px] overflow-hidden">
                        <PlaceholderImage
                          type="doctor"
                          src={doctor.image_url}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-center rounded-full transition-transform duration-700 group-hover:scale-[1.06]"
                          rounded="rounded-full"
                        />
                      </div>
                    </div>

                    <h3 className="text-xl lg:text-[22px] font-extrabold text-[#1E293B] leading-[1.5] mb-1">
                      {doctor.name}
                    </h3>

                    {doctor.specialty && (
                      <p className="text-[#197786] text-sm font-bold leading-6 mb-1">
                        {doctor.specialty}
                      </p>
                    )}

                    {doctor.qualification && (
                      <div className="mb-2 mt-2">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 shrink-0 rounded-lg bg-[#D1F9FC]/60 flex items-center justify-center text-[#197786]">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <p className="text-[#5F6670] text-md leading-6 font-medium">
                            {doctor.qualification}
                          </p>
                        </div>
                      </div>
                    )}

                    {doctor.bio && (
                      <p className="text-[#6D686A] text-md leading-6 mb-2">
                        {doctor.bio}
                      </p>
                    )}

                    <div className="clear-both" />

                    {doctor.working_days?.length > 0 && (
                      <div className="pt-3 mt-2 border-t border-[#E7E3E3] mb-3 flex flex-wrap items-center gap-1">
                        <span className="text-md font-extrabold text-[#197786]">
                          أيام العمل:
                        </span>

                        {doctor.working_days.map((day) => (
                          <span
                            key={day}
                            className="px-2 py-1.5 rounded-lg bg-[#D1F9FC]/55 text-[#197786] text-[16px] font-bold"
                          >
                            {dayLabels[day] || day}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/booking?doctor=${doctor.id}&dept=${doctor.department_id || "physical-therapy"}`
                        )
                      }
                      className="group/btn mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#953238] px-5 py-3 text-white text-sm font-extrabold shadow-[0_8px_20px_rgba(149,50,56,0.18)] transition-all duration-300 hover:bg-[#7C3439] hover:-translate-y-0.5"
                    >
                      <CalendarPlus className="w-4 h-4" />
                      احجز الآن
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
