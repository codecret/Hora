import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useGetAuth } from "../hooks/useAuth";
import BeatLoader from "react-spinners/BeatLoader";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

const override = {
  display: "block",
  margin: "auto",
};
const Layout = () => {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetAuth({ state: "protected" });
  if (isLoading || isFetching) {
    return (
      <BeatLoader
        color="var(--primary-color)"
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  return (
    <main className="dashboard-container">
      <div className="sidebar-left-column">
        <Sidebar />
      </div>

      <div className="dashboard-right-column">
        <NavBar user={user} />
        <Outlet user={user} />
        <div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
      </div>
    </main>
  );
};

export default Layout;
