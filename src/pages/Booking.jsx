import {
  useState,
  useEffect,
} from "react";

import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import {
  Loader2,
  ArrowRight,
  CalendarPlus,
} from "lucide-react";

import BookingWizard from "@/components/BookingWizard";

import {
  getDoctor,
} from "@/services/doctors";

import {
  getDepartment,
} from "@/services/departments";

export default function Booking() {
  const [
    searchParams,
  ] = useSearchParams();

  const navigate =
    useNavigate();

  const doctorId =
    searchParams.get(
      "doctor"
    );

  const deptId =
    searchParams.get(
      "dept"
    );

  const [
    doctor,
    setDoctor,
  ] = useState(null);

  const [
    department,
    setDepartment,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  useEffect(() => {
    let cancelled =
      false;

    const loadBookingData =
      async () => {
        try {
          setLoading(
            true
          );

          setError(
            null
          );

          /* =================================================
             DOCTOR
          ================================================= */

          if (!doctorId) {
            if (!cancelled) {
              setError(
                "لم يتم اختيار طبيب. يرجى اختيار قسم وطبيب أولاً."
              );

              setLoading(
                false
              );
            }

            return;
          }

          const doc =
            await getDoctor(
              doctorId
            );

          if (!doc) {
            if (!cancelled) {
              setError(
                "الطبيب غير موجود."
              );

              setLoading(
                false
              );
            }

            return;
          }

          if (
            cancelled
          ) {
            return;
          }

          setDoctor(
            doc
          );

          /* =================================================
             DEPARTMENT
          ================================================= */

          const targetDeptId =
            deptId ||
            doc.department_id ||
            doc.departmentId;

          if (
            !targetDeptId
          ) {
            setError(
              "لم يتم العثور على القسم الخاص بالطبيب."
            );

            setLoading(
              false
            );

            return;
          }

          const dept =
            await getDepartment(
              targetDeptId
            );

          if (
            cancelled
          ) {
            return;
          }

          if (!dept) {
            setError(
              "القسم غير موجود."
            );

            setLoading(
              false
            );

            return;
          }

          setDepartment(
            dept
          );

          setLoading(
            false
          );
        } catch (err) {
          console.error(
            "BOOKING PAGE ERROR:",
            err
          );

          if (
            !cancelled
          ) {
            setError(
              "تعذر تحميل بيانات الحجز حالياً."
            );

            setLoading(
              false
            );
          }
        }
      };

    loadBookingData();

    return () => {
      cancelled =
        true;
    };
  }, [
    doctorId,
    deptId,
  ]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div
        className="
          pt-24
          pb-16
          min-h-screen
          bg-slate-50

          flex
          items-center
          justify-center
        "
      >
        <Loader2
          className="
            w-8
            h-8

            text-primary-500

            animate-spin
          "
        />
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (
    error ||
    !doctor ||
    !department
  ) {
    return (
      <div
        className="
          pt-24
          pb-16
          min-h-screen
          bg-slate-50

          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            card
            p-8

            text-center

            max-w-md
          "
        >
          <CalendarPlus
            className="
              w-16
              h-16

              text-slate-300

              mx-auto
              mb-4
            "
          />

          <h2
            className="
              text-xl
              font-bold
              text-slate-800
              mb-3
            "
          >
            {error ||
              "بيانات غير مكتملة"}
          </h2>

          <p
            className="
              text-slate-500
              mb-6
            "
          >
            يرجى اختيار قسم وطبيب من صفحة العيادات الخارجية.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/clinics"
              )
            }
            className="
              btn
              btn-primary
            "
          >
            <ArrowRight
              className="
                w-4
                h-4
              "
            />

            الذهاب للعيادات
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     BOOKING
  ========================================================= */

  return (
    <div
      className="
        pt-24
        pb-16
        min-h-screen
        bg-slate-50
      "
    >
      <div
        className="
          container-custom
          max-w-2xl
        "
      >
        <BookingWizard
          doctor={
            doctor
          }
          department={
            department
          }
          onClose={() =>
            navigate(
              "/clinics"
            )
          }
        />
      </div>
    </div>
  );
}