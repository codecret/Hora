import { Icon } from "@iconify/react/dist/iconify.js";
import { Outlet } from "react-router-dom";
import Searchbar from "../components/Searchbar/Searchbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useGetAuth } from "../hooks/useAuth";

const Layout = () => {
  const { data: user } = useGetAuth({ state: "layout" });

  return (
    <main className="dashboard-container">
      <div className="sidebar-left-column">
        <Sidebar />
      </div>

      <div className="dashboard-right-column">
        <div className="searchbar-container">
          <Searchbar />
          <div className="user-name-container">
            <h3>{user?.name ?? "username"}</h3>
            <a href="/ProfilePage">
              <Icon icon="majesticons:user-line" width="1.2em" height="1.2em" />
            </a>
          </div>
        </div>
        <Outlet user={user} />
      </div>
    </main>
  );
};

export default Layout;
