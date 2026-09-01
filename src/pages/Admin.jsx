import { useState } from "react";
import { Link } from "react-router-dom";

import {
  CalendarDays,
  UserRound,
  Building2,
  Users,
  UserPlus,
  Cpu,
  Building,
  BarChart3,
  Phone,
  Menu,
  X,
  Cross,
  ArrowRight,
  MessageSquareText,
} from "lucide-react";

import AppointmentsAdmin from "@/admin/AppointmentsAdmin";
import DoctorsAdmin from "@/admin/DoctorsAdmin";
import DepartmentsAdmin from "@/admin/DepartmentsAdmin";
import StaffAdmin from "@/admin/StaffAdmin";
import EquipmentAdmin from "@/admin/EquipmentAdmin";
import PartnersAdmin from "@/admin/PartnersAdmin";
import StatisticsAdmin from "@/admin/StatisticsAdmin";
import ContentAdmin from "@/admin/ContentAdmin";
import ComplaintsAdmin from "@/admin/ComplaintsAdmin";

/* إضافة */
import CreateAdminAdmin from "@/admin/CreateAdminAdmin";

/* =========================================================
   SIDEBAR ITEMS
========================================================= */

const sidebarItems = [
  {
    key: "appointments",
    label: "المواعيد",
    icon: CalendarDays,
  },

  {
    key: "doctors",
    label: "الأطباء",
    icon: UserRound,
  },

  {
    key: "departments",
    label: "الأقسام",
    icon: Building2,
  },

  {
    key: "equipment",
    label: "الأجهزة الطبية",
    icon: Cpu,
  },

  {
    key: "staff",
    label: "الطاقم الإداري",
    icon: Users,
  },

  {
    key: "partners",
    label: "الشركات الشريكة",
    icon: Building,
  },

  {
    key: "statistics",
    label: "الإحصائيات",
    icon: BarChart3,
  },

  {
    key: "contact",
    label: "معلومات التواصل",
    icon: Phone,
  },

  {
    key: "complaints",
    label: "الشكاوى والمقترحات",
    icon: MessageSquareText,
  },

  /* =========================
     CREATE ADMIN
  ========================== */

  {
    key: "create-admin",
    label: "إضافة أدمن",
    icon: UserPlus,
  },
];

/* =========================================================
   ADMIN
========================================================= */

export default function Admin() {
  const [active, setActive] =
    useState("appointments");

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  /* =======================================================
     CONTENT
  ======================================================= */

  const renderContent = () => {
    switch (active) {
      case "appointments":
        return <AppointmentsAdmin />;

      case "doctors":
        return <DoctorsAdmin />;

      case "departments":
        return <DepartmentsAdmin />;

      case "staff":
        return <StaffAdmin />;

      case "equipment":
        return <EquipmentAdmin />;

      case "partners":
        return <PartnersAdmin />;

      case "statistics":
        return <StatisticsAdmin />;

      case "about":
        return (
          <ContentAdmin
            section="about"
            title="من نحن"
          />
        );

      case "rights":
        return (
          <ContentAdmin
            section="patient_rights"
            title="حقوق المرضى"
          />
        );

      case "why":
        return (
          <ContentAdmin
            section="why_choose"
            title="لماذا نختارنا"
          />
        );

      case "contact":
        return (
          <ContentAdmin
            section="contact"
            title="معلومات التواصل"
          />
        );

      case "complaints":
        return <ComplaintsAdmin />;

      /* =========================
         CREATE ADMIN
      ========================== */

      case "create-admin":
        return <CreateAdminAdmin />;

      default:
        return <AppointmentsAdmin />;
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        flex
      "
      dir="rtl"
    >
      {/* =================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed
          lg:sticky

          top-0
          right-0

          z-40

          h-screen
          w-72

          bg-slate-900
          text-slate-300

          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="p-6">
          {/* LOGO */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-3

              mb-8
            "
          >
            <div
              className="
                w-11
                h-11

                rounded-2xl

                bg-gradient-to-br
                from-primary-500
                to-secondary-500

                flex
                items-center
                justify-center
              "
            >
              <Cross
                className="
                  w-6
                  h-6
                  text-white
                "
              />
            </div>

            <div>
              <h2
                className="
                  font-extrabold
                  text-white
                "
              >
                مستشفي رواد الطب
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                لوحة التحكم
              </p>
            </div>
          </Link>

          {/* NAVIGATION */}

          <nav
            className="
              space-y-1

              max-h-[calc(100vh-120px)]

              overflow-y-auto

              no-scrollbar
            "
          >
            {sidebarItems.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => {
                      setActive(
                        item.key
                      );

                      setSidebarOpen(
                        false
                      );
                    }}
                    className={`
                      w-full

                      flex
                      items-center
                      gap-3

                      px-4
                      py-3

                      rounded-xl

                      font-bold
                      text-sm

                      transition-all

                      ${
                        active ===
                        item.key
                          ? `
                            bg-gradient-to-l
                            from-primary-600
                            to-secondary-600

                            text-white

                            shadow-lg
                          `
                          : `
                            text-slate-400

                            hover:bg-slate-800
                            hover:text-white
                          `
                      }
                    `}
                  >
                    <Icon
                      className="
                        w-5
                        h-5
                        shrink-0
                      "
                    />

                    {item.label}
                  </button>
                );
              }
            )}
          </nav>
        </div>
      </aside>

      {/* =================================================
          MOBILE OVERLAY
      ================================================== */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0

            bg-black/50

            z-30

            lg:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* =================================================
          MAIN CONTENT
      ================================================== */}

      <div
        className="
          flex-1
          min-w-0
        "
      >
        {/* TOP BAR */}

        <header
          className="
            bg-white

            shadow-sm

            sticky
            top-0

            z-20
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              px-6
              py-4
            "
          >
            {/* PAGE TITLE */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <button
                type="button"
                onClick={() =>
                  setSidebarOpen(
                    !sidebarOpen
                  )
                }
                className="
                  lg:hidden

                  p-2

                  rounded-xl

                  hover:bg-slate-100
                "
              >
                {sidebarOpen ? (
                  <X
                    className="
                      w-6
                      h-6
                    "
                  />
                ) : (
                  <Menu
                    className="
                      w-6
                      h-6
                    "
                  />
                )}
              </button>

              <h1
                className="
                  text-xl
                  font-extrabold
                  text-slate-800
                "
              >
                {
                  sidebarItems.find(
                    (item) =>
                      item.key ===
                      active
                  )?.label
                }
              </h1>
            </div>

            {/* BACK TO WEBSITE */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <Link
                to="/"
                className="
                  flex
                  items-center
                  gap-2

                  text-sm
                  text-slate-600

                  hover:text-primary-600

                  font-bold

                  transition-colors
                "
              >
                <ArrowRight
                  className="
                    w-4
                    h-4
                  "
                />

                العودة للموقع
              </Link>
            </div>
          </div>
        </header>

        {/* PAGE */}

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}