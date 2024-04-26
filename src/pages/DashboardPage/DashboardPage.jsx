import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <main className="dashboard-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
    </main>
  );
};

export default DashboardPage;
