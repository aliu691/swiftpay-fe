import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/user/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import RequestReset from "./pages/auth/RequestReset";
import ResetPassword from "./pages/auth/ResetPassword";
import MyGroups from "./pages/user/MyGroups";
import GroupDetails from "./pages/user/GroupDetails";
import HomeRedirect from "./pages/HomeRedirect";
import JoinGroup from "./pages/user/JoinGroup";
import PaymentCallback from "./pages/PaymentCallback";
import AdminRoute from "./components/AdminRoutes";
import AdminLayout from "./components/AdminLayout";
import FailedPaymentsReport from "./pages/admin/FailedPaymentsReports";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import AdminLedgerPage from "./pages/admin/AdminLedgerPage";
import AdminLedgerHistoricalPage from "./pages/admin/AdminLedgerHistoricalPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ✅ Default Route */}
          <Route path="/" element={<HomeRedirect />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request-reset" element={<RequestReset />} />

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/payment/callback" element={<PaymentCallback />} />

          {/* User Protected Routes */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <MyGroups />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <GroupDetails />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/join/:token"
            element={
              <ProtectedRoute>
                <JoinGroup />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/failed-payments"
            element={
              <AdminRoute>
                <AdminLayout>
                  <FailedPaymentsReport />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/payments"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminPaymentsPage />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/ledger"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminLedgerPage />
                </AdminLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/admin/ledger/all"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminLedgerHistoricalPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            padding: "16px",
          },
        }}
      />
    </>
  );
}

export default App;
