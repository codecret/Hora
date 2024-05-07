import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Layout from "./pages/Layout";
import Login from "./pages/loginlayout/Login";
import ForgotPassword from "./pages/loginlayout/ForgotPassword";
import ResetPassword from "./pages/loginlayout/ResetPassword";
import Error from "./pages/Error";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
