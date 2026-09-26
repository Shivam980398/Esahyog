import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const EmergencyHistoryPage = lazy(
  () => import("../pages/EmergencyHistoryPage"),
);

const Dashboard = lazy(() => import("../pages/dashboard"));
const EmergencyReport = lazy(() => import("../pages/EmergencyReport"));
const SignUpWizard = lazy(() => import("../pages/SignUpWizard"));
const AdminDashboardHome = lazy(
  () => import("../pages/Admin/AdminDashboardHome"),
);
const BillsPage = lazy(() => import("../pages/Admin/BillsPage"));
const PaymentsPage = lazy(
  () => import("../features/payments/pages/PaymentsPage"),
);
const ComplaintsPage = lazy(() => import("../pages/Admin/ComplaintsPage"));
const NoticesPage = lazy(() => import("../pages/Admin/NoticesPage"));
const EmergencyPage = lazy(() => import("../pages/Admin/EmergencyPage"));
const AdminLayout = lazy(() => import("../components/admin/AdminLayout"));
const ComplaintPage = lazy(
  () => import("../features/complaints/pages/ComplaintPage"),
);
const ForgotPasswordPage = lazy(
  () => import("../components/ui/ForgetPasswordPage"),
);
const DepartmentDashboardPage = lazy(
  () => import("../features/departments/pages/DepartmentDashboardPage"),
);
const ProtectedRoute = lazy(() => import("./guards/ProtectedRoute"));

const NotFound = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 text-slate-700">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-lg">The page you are looking for does not exist.</p>
  </div>
);

const RouteFallback = () => (
  <div className="min-h-screen grid place-items-center bg-slate-950 text-slate-200">
    Loading...
  </div>
);

export const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/signup"
        element={<SignUpWizard key="signup" initialStep={2} />}
      />
      <Route path="/login" element={<SignUpWizard key="login" />} />
      <Route path="/forgetpassword" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
        <Route path="/emergency" element={<EmergencyReport />} />

        <Route path="/emergency-history" element={<EmergencyHistoryPage />} />
      </Route>
      <Route
        path="/water-department"
        element={<DepartmentDashboardPage departmentKey="water" />}
      />
    
      <Route
        path="/traffic-department"
        element={<DepartmentDashboardPage departmentKey="traffic" />}
      />
   
      <Route
        path="/sewer-department"
        element={<DepartmentDashboardPage departmentKey="sewer" />}
      />
    
      <Route
        path="/pwd-department"
        element={<DepartmentDashboardPage departmentKey="pwd" />}
      />
   
      <Route
        path="/garbage-department"
        element={<DepartmentDashboardPage departmentKey="garbage" />}
      />
    
      <Route
        path="/fire-department"
        element={<DepartmentDashboardPage departmentKey="fire" />}
      />
      <Route
        path="/electricity-department"
        element={<DepartmentDashboardPage departmentKey="electricity" />}
      />
      <Route
        path="/police-department"
        element={<DepartmentDashboardPage departmentKey="police" />}
      />

      <Route element={<ProtectedRoute allowedRoles={["officer"]} />}>
        <Route
          path="/waterdepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="water" />}
        />
        <Route
          path="/trafficdepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="traffic" />}
        />
        <Route
          path="/sewerdepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="sewer" />}
        />
        <Route
          path="/pwddepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="pwd" />}
        />
        <Route
          path="/garbagedepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="garbage" />}
        />
        <Route
          path="/firedepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="fire" />}
        />
        <Route
          path="/electricitydepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="electricity" />}
        />
        <Route
          path="/policedepartmentDashboard"
          element={<DepartmentDashboardPage departmentKey="police" />}
        />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["citizen"]} />}>
        <Route path="/payments" element={<PaymentsPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="bills" element={<BillsPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/complaint" element={<ComplaintPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
