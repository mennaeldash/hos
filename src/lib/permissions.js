/* =========================================================
   ADMIN ROLES
========================================================= */

export const ROLES = {
  ADMIN: "Admin",
  MANAGER: "Manager",
};

/* =========================================================
   GET CURRENT ROLE
========================================================= */

export function getAdminRole() {
  return (
    localStorage.getItem(
      "adminRole"
    ) || ""
  );
}

/* =========================================================
   ROLE CHECKS
========================================================= */

export function isAdmin() {
  return (
    getAdminRole() ===
    ROLES.ADMIN
  );
}

export function isManager() {
  return (
    getAdminRole() ===
    ROLES.MANAGER
  );
}

/* =========================================================
   ADMIN ONLY

   إضافة / تعديل / حذف البيانات
========================================================= */

export function canManageContent() {
  return isAdmin();
}

/* =========================================================
   CREATE ADMIN / MANAGER

   Admin فقط
========================================================= */

export function canCreateAdmin() {
  return isAdmin();
}

/* =========================================================
   DOCTOR STATUS

   Admin + Manager
========================================================= */

export function canChangeDoctorStatus() {
  return (
    isAdmin() ||
    isManager()
  );
}

/* =========================================================
   DOCTOR WORKING DAYS

   Admin + Manager
========================================================= */

export function canChangeDoctorWorkingDays() {
  return (
    isAdmin() ||
    isManager()
  );
}

/* =========================================================
   VIEW DASHBOARD

   Admin + Manager
========================================================= */

export function canViewDashboard() {
  return (
    isAdmin() ||
    isManager()
  );
}