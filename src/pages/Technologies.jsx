import {
  Scan,
  Activity,
  Siren,
  Cpu,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Baby,
  Stethoscope,
  Pill,
  Crown,
} from "lucide-react";

import Reveal from "@/components/Reveal";
import PlaceholderImage from "@/components/PlaceholderImage";
import { useEquipment } from "@/lib/hooks";

/* =========================================================
   CATEGORIES
========================================================= */

const categoryInfo = {
  icu: {
    label: "العناية المركزة",
    icon: Activity,
  },

  "cardiac-care": {
    label: "عناية القلب",
    icon: HeartPulse,
  },

  vip: {
    label: "العناية المركزة VIP",
    icon: Crown,
  },

  nursery: {
    label: "حديثي الولادة",
    icon: Baby,
  },

  emergency: {
    label: "الطوارئ",
    icon: Siren,
  },

  radiology: {
    label: "الأشعة",
    icon: Scan,
  },

  clinics: {
    label: "العيادات الخارجية",
    icon: Stethoscope,
  },

  pharmacy: {
    label: "الصيدلية",
    icon: Pill,
  },
};

/* =========================================================
   MAIN
========================================================= */

export default function Technologies() {
  const {
    data: equipment = [],
    loading,
  } = useEquipment();

  const sortedEquipment = Array.isArray(equipment)
    ? [...equipment].sort(
        (a, b) =>
          Number(a.sort_order || 0) -
          Number(b.sort_order || 0)
      )
    : [];

  return (
    <div className="pt-20 md:pt-24 overflow-hidden">

      {/* =====================================================
          LOCAL ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes serviceEnterRight {
            from {
              opacity: 0;
              transform: translateX(45px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes serviceEnterLeft {
            from {
              opacity: 0;
              transform: translateX(-45px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes softFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-4px);
            }
          }

          @keyframes heroSoftZoom {
            0% {
              transform: scale(1);
            }

            100% {
              transform: scale(1.04);
            }
          }

          .service-enter-right {
            animation: serviceEnterRight 0.8s
              cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .service-enter-left {
            animation: serviceEnterLeft 0.8s
              cubic-bezier(0.22, 1, 0.36, 1)
              both;
          }

          .service-float {
            animation: softFloat 3.5s
              ease-in-out infinite;
          }

          .hero-soft-zoom {
            animation: heroSoftZoom 8s
              ease-in-out infinite alternate;
            will-change: transform;
          }

          .technologies-hero {
            background: #176A77;
          }

          .technologies-intro {
            position: relative;
            isolation: isolate;
          }

          .technologies-intro::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            background:
              radial-gradient(circle at 12% 24%, rgba(131,189,196,.14), transparent 26%),
              radial-gradient(circle at 88% 76%, rgba(204,174,176,.10), transparent 24%);
            pointer-events: none;
          }

          .technologies-list {
            position: relative;
            isolation: isolate;
            background:
              linear-gradient(180deg, rgba(248,250,251,.98), rgba(250,246,246,.96));
          }

          .technologies-list::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: -1;
            opacity: .38;
            background-image:
              linear-gradient(rgba(25,119,134,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(25,119,134,.035) 1px, transparent 1px);
            background-size: 42px 42px;
            mask-image: linear-gradient(to bottom, black, transparent 82%);
            pointer-events: none;
          }

          .technology-card {
            box-shadow:
              0 12px 34px rgba(47,52,55,.055),
              0 2px 4px rgba(25,119,134,.035);
          }

          .technology-card::after {
            content: "";
            position: absolute;
            inset: 10px;
            border: 1px solid rgba(131,189,196,.16);
            border-radius: 18px;
            opacity: 0;
            transform: scale(.985);
            transition: opacity .5s ease, transform .6s cubic-bezier(.22,1,.36,1);
            pointer-events: none;
          }

          .technology-card:hover::after {
            opacity: 1;
            transform: scale(1);
          }

          @media (prefers-reduced-motion: reduce) {
            .service-enter-right,
            .service-enter-left,
            .service-float,
            .hero-soft-zoom,
            .technology-card::after {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          technologies-hero
          relative
          py-16
          sm:py-20
          md:py-24
          overflow-hidden
        "
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/8413121/pexels-photo-8413121.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="خدمات مستشفى رواد الطب"
            className="
              hero-soft-zoom
              w-full
              h-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-l
              from-[#176A77]/95
              via-[#197786]/85
              to-[#953238]/45
            "
          />
        </div>

        <div
          className="
            container-custom
            relative
            z-10
            text-center
            px-4
          "
        >
          <Reveal>
            <span
              className="
                service-float
                inline-flex
                items-center
                gap-2
                px-4
                sm:px-5
                py-2
                rounded-full
                bg-white/10
                backdrop-blur-md
                text-white
                text-sm
                sm:text-base
                font-bold
                mb-5
                border
                border-white/20
              "
            >
              <Sparkles className="w-4 h-4" />
              خدماتنا
            </span>

            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                font-extrabold
                text-white
                mb-5
                leading-tight
              "
            >
              خدماتنا الطبية
            </h1>

            <p
              className="
                text-base
                sm:text-lg
                md:text-xl
                text-white/85
                max-w-3xl
                mx-auto
                leading-8
                md:leading-9
              "
            >
              نقدم مجموعة متكاملة من الخدمات الطبية
              بأحدث التجهيزات وتحت إشراف فرق طبية
              متخصصة لضمان رعاية آمنة ومتميزة.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          TITLE
      ===================================================== */}

      <section
        className="
          technologies-intro
          pt-14
          sm:pt-16
          md:pt-20
          pb-8
          md:pb-10
          bg-[#F8FAFB]
        "
      >
        <div
          className="
            container-custom
            text-center
            px-4
          "
        >
          <Reveal>
            <span
              className="
                inline-block
                px-4
                py-1.5
                rounded-full
                bg-[#D1F9FC]
                text-[#197786]
                text-xs
                sm:text-sm
                font-extrabold
                mb-4
              "
            >
              رعاية متكاملة
            </span>

            <h2
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-extrabold
                text-[#2F3437]
                mb-4
              "
            >
              خدمات مستشفى رواد الطب
            </h2>

            <p
              className="
                text-[#6D686A]
                text-sm
                sm:text-base
                md:text-lg
                max-w-2xl
                mx-auto
                leading-7
                md:leading-8
              "
            >
              خدمات طبية متكاملة لخدمة المرضى
              وتقديم أعلى مستويات الرعاية والجودة
            </p>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                mt-5
              "
            >
              <span
                className="
                  w-8
                  h-[3px]
                  rounded-full
                  bg-[#953238]
                "
              />

              <span
                className="
                  w-14
                  h-[3px]
                  rounded-full
                  bg-[#197786]
                "
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section
        className="
          technologies-list
          bg-[#F8FAFB]
          pb-16
          md:pb-24
        "
      >
        <div
          className="
            w-full
            px-4
            sm:px-6
            md:px-8
            lg:px-14
            xl:px-20
            2xl:px-28
          "
        >

          {/* LOADING */}

          {loading ? (
            <div className="space-y-6 md:space-y-8">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="
                    w-full
                    h-[330px]
                    md:h-[400px]
                    rounded-[24px]
                    md:rounded-[28px]
                    shimmer-bg
                  "
                />
              ))}
            </div>
          ) : sortedEquipment.length === 0 ? (

            /* EMPTY */

            <div className="text-center py-20">
              <p className="text-slate-500 text-base sm:text-lg">
                لا توجد خدمات متاحة حالياً
              </p>
            </div>
          ) : (

            /* SERVICES */

            <div className="space-y-6 md:space-y-8">

              {sortedEquipment.map(
                (item, index) => {
                  const category =
                    categoryInfo[item.category] || {
                      label: "خدمات المستشفى",
                      icon: Activity,
                    };

                  const Icon = category.icon;

                  const imageOnRight =
                    index % 2 === 0;

                  return (
                    <Reveal
                      key={item.id}
                      delay={index * 70}
                    >
                      <article
                        className={`
                          group
                          technology-card
                          relative
                          w-full
                          overflow-hidden
                          rounded-[24px]
                          md:rounded-[28px]
                          border
                          border-[#E7E3E3]
                          bg-white
                          shadow-[0_10px_32px_rgba(25,119,134,0.07)]
                          transition-all
                          duration-500
                          ease-[cubic-bezier(0.22,1,0.36,1)]
                          hover:-translate-y-1.5
                          hover:border-[#83BDC4]
                          hover:shadow-[0_22px_50px_rgba(25,119,134,0.15)]
                          ${
                            imageOnRight
                              ? "service-enter-right"
                              : "service-enter-left"
                          }
                        `}
                        style={{
                          animationDelay: `${index * 90}ms`,
                        }}
                      >

                        {/* ===================================
                            ANIMATED TOP LINE
                        =================================== */}

                        <div
                          className="
                            absolute
                            top-0
                            left-1/2
                            z-30
                            h-[3px]
                            w-0
                            -translate-x-1/2
                            bg-gradient-to-r
                            from-[#953238]
                            via-[#83BDC4]
                            to-[#197786]
                            transition-all
                            duration-700
                            ease-out
                            group-hover:w-full
                          "
                        />

                        {/* STATIC TOP LINE */}

                        <div
                          className="
                            absolute
                            top-0
                            right-0
                            left-0
                            z-20
                            h-[2px]
                            bg-[#83BDC4]/35
                          "
                        />

                        <div
                          className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            md:h-[400px]
                          "
                        >

                          {/* =================================================
                              IMAGE
                          ================================================= */}

                          <div
                            className={`
                              relative
                              w-full
                              h-[230px]
                              sm:h-[280px]
                              md:h-[400px]
                              overflow-hidden
                              ${
                                imageOnRight
                                  ? "md:order-1"
                                  : "md:order-2"
                              }
                            `}
                          >
                            <PlaceholderImage
                              type="device"
                              src={item.image_url}
                              alt={item.name}
                              className="
                                absolute
                                inset-0
                                w-full
                                h-full
                                transition-all
                                duration-[900ms]
                                ease-[cubic-bezier(0.22,1,0.36,1)]
                                group-hover:scale-[1.07]
                              "
                              rounded="rounded-none"
                              objectFit="object-cover"
                            />

                            {/* IMAGE OVERLAY */}

                            <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-[#176A77]/20
                                via-transparent
                                to-transparent
                                transition-all
                                duration-700
                                group-hover:from-[#176A77]/30
                              "
                            />

                            {/* LIGHT EFFECT */}

                            <div
                              className="
                                pointer-events-none
                                absolute
                                top-0
                                -left-[70%]
                                h-full
                                w-[45%]
                                rotate-[12deg]
                                bg-white/15
                                blur-xl
                                transition-all
                                duration-[1100ms]
                                ease-out
                                group-hover:left-[130%]
                              "
                            />

                            {/* IMAGE CATEGORY BADGE */}

        
                          </div>

                          {/* =================================================
                              CONTENT
                          ================================================= */}

                          <div
                            className={`
                              flex
                              min-w-0
                              items-center
                              ${
                                imageOnRight
                                  ? "md:order-2"
                                  : "md:order-1"
                              }
                            `}
                          >
                            <div
                              dir="rtl"
                              className="
                                w-full
                                min-w-0
                                p-5
                                sm:p-6
                                md:p-7
                                lg:p-8
                                text-right
                              "
                            >

                              {/* CATEGORY */}

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-3
                                  mb-3
                                "
                              >
                                <div
                                  className="
                                    w-10
                                    h-10
                                    md:w-11
                                    md:h-11
                                    shrink-0
                                    rounded-xl
                                    bg-[#D1F9FC]
                                    text-[#197786]
                                    flex
                                    items-center
                                    justify-center
                                    shadow-[0_6px_16px_rgba(25,119,134,0.10)]
                                    transition-all
                                    duration-500
                                    group-hover:scale-110
                                    group-hover:-rotate-3
                                    group-hover:bg-[#197786]
                                    group-hover:text-white
                                  "
                                >
                                  <Icon
                                    className="
                                      w-5
                                      h-5
                                      transition-all
                                      duration-500
                                      group-hover:scale-110
                                    "
                                  />
                                </div>

                                <span
                                  className="
                                    text-xs
                                    md:text-sm
                                    font-extrabold
                                    text-[#197786]
                                  "
                                >
                                  {category.label}
                                </span>
                              </div>

                              {/* NAME */}

                              <h3
                                className="
                                  text-xl
                                  sm:text-2xl
                                  lg:text-[27px]
                                  font-extrabold
                                  text-[#2F3437]
                                  leading-[1.4]
                                  mb-3
                                  transition-all
                                  duration-500
                                  group-hover:text-[#197786]
                                "
                              >
                                {item.name}
                              </h3>

                              {/* DESCRIPTION */}

                              {item.description && (
                                <p
                                  className="
                                    text-[#6D686A]
                                    text-sm
                                    sm:text-base
                                    lg:text-lg
                                    leading-7
                                    lg:leading-8
                                    mb-5
                                    max-w-2xl
                                    line-clamp-5
                                  "
                                >
                                  {item.description}
                                </p>
                              )}

                              {/* DETAILS */}

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  gap-2
                                "
                              >
                                <div
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    bg-[#FAF6F6]
                                    border
                                    border-[#CCAEB0]/40
                                    px-3
                                    py-2
                                    text-[#7C3439]
                                    text-xs
                                    font-bold
                                    transition-all
                                    duration-300
                                    group-hover:border-[#953238]/35
                                  "
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  رعاية آمنة
                                </div>

                                <div
                                  className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    rounded-lg
                                    bg-[#D1F9FC]/60
                                    border
                                    border-[#83BDC4]/35
                                    px-3
                                    py-2
                                    text-[#197786]
                                    text-xs
                                    font-bold
                                    transition-all
                                    duration-300
                                    group-hover:bg-[#D1F9FC]
                                  "
                                >
                                  <Cpu className="w-3.5 h-3.5" />
                                  تجهيزات حديثة
                                </div>
                              </div>

                            </div>
                          </div>

                        </div>
                      </article>
                    </Reveal>
                  );
                }
              )}

            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section
        className="
          py-14
          md:py-20
          bg-white
        "
      >
        <div
          className="
            container-custom
            px-4
          "
        >
          <Reveal>
            <div
              className="
                group
                shadow-[0_18px_50px_rgba(25,119,134,0.12)]
                relative
                overflow-hidden
                rounded-[24px]
                md:rounded-[32px]
                px-5
                sm:px-8
                py-10
                md:px-16
                md:py-16
                text-center
              "
            >
              {/* BACKGROUND */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-[#197786]
                  to-[#176A77]
                "
              />

              {/* DECORATION 1 */}

              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-72
                  h-72
                  rounded-full
                  bg-white/10
                  blur-2xl
                  transition-transform
                  duration-[1200ms]
                  group-hover:scale-125
                "
              />

              {/* DECORATION 2 */}

              <div
                className="
                  absolute
                  -bottom-24
                  -left-20
                  w-72
                  h-72
                  rounded-full
                  bg-[#953238]/20
                  blur-2xl
                  transition-transform
                  duration-[1200ms]
                  group-hover:scale-125
                "
              />

              {/* CONTENT */}

              <div className="relative z-10">
                <div
                  className="
                    service-float
                    w-14
                    h-14
                    md:w-16
                    md:h-16
                    mx-auto
                    mb-5
                    rounded-2xl
                    bg-white/10
                    backdrop-blur-md
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-500
                    group-hover:bg-white/20
                  "
                >
                  <Stethoscope
                    className="
                      w-7
                      h-7
                      md:w-8
                      md:h-8
                      text-white
                    "
                  />
                </div>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-extrabold
                    text-white
                    mb-4
                  "
                >
                  رعاية متكاملة لصحتك
                </h2>

                <p
                  className="
                    text-sm
                    sm:text-base
                    md:text-lg
                    text-white/85
                    max-w-2xl
                    mx-auto
                    leading-7
                    md:leading-8
                  "
                >
                  نحرص على تقديم خدمات طبية
                  متكاملة بأحدث التجهيزات وتحت
                  إشراف فرق طبية متخصصة لخدمة
                  مرضانا بأعلى مستوى من الجودة.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}