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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ✅ Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request-reset" element={<RequestReset />} />

          <Route path="/reset-password" element={<ResetPassword />} />

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
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
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
