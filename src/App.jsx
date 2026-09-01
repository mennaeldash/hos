import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
/* الصفحات دي مش هتتحمل غير وقت الدخول عليها */
const Clinics = lazy(() => import("@/pages/Clinics"));
const PhysicalTherapy = lazy(() => import("@/pages/PhysicalTherapy"));
const Doctors = lazy(() => import("@/pages/Doctors"));
const Technologies = lazy(() => import("@/pages/Technologies"));
const Contact = lazy(() => import("@/pages/Contact"));
const Booking = lazy(() => import("@/pages/Booking"));
const HomeBooking = lazy(() => import("@/pages/HomeBooking"));
const Login = lazy(() => import("@/pages/Login"));
const Admin = lazy(() => import("@/pages/Admin"));

function ProtectedAdmin() {
  const location = useLocation();
  const enteredFromLogin = location.state?.authenticated === true;

  return enteredFromLogin ? <Admin /> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#FAF6F6]" />
        }
      >
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/clinics"
              element={<Clinics />}
            />

            <Route
              path="/clinics/:slug"
              element={<Clinics />}
            />

            <Route
              path="/physical-therapy"
              element={<PhysicalTherapy />}
            />

            <Route
              path="/doctors"
              element={<Doctors />}
            />

            <Route
              path="/technologies"
              element={<Technologies />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="/home-booking"
              element={<HomeBooking />}
            />

            <Route
              path="/booking"
              element={<Booking />}
            />
          </Route>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/admin"
            element={<ProtectedAdmin />}
          />

        </Routes>
      </Suspense>
    </BrowserRouter>
    
  );
  
}