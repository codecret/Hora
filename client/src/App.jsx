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
import Settings from "./pages/Settings/Settings";
import Landing from "./pages/Landing/Landing";
import Requests from "./pages/Requests/Requests";
import SearchPage from "./pages/Search/SearchPage";
import ThemeProvider from "./theme/theme";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="requests" element={<Requests />} />
        </Route>
        <Route path="appointments" element={<SearchPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
