import DashboardPage from "./pages/DashboardPage/DashboardPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Layout from "./pages/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}

export default App;
