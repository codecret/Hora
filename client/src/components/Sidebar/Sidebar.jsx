import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import { links } from "../../../../utils/links";
import { useLogoutUser } from "../../hooks/useAuth";

const Sidebar = () => {
  const { mutateAsync: logoutUser } = useLogoutUser();

  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <div className="sidebar">
      <div>
        <h1 id="heading">Hora</h1>
      </div>
      <div className="sidebarBody">
        {links?.map((link, key) => {
          const { path, icon } = link;

          return (
            <NavLink
              to={`${path}`}
              key={key}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              <Icon icon={icon} width="1.2em" height="1.2em" className="icon" />
            </NavLink>
          );
        })}
      </div>
      <div>
        <button className="logout-icon" onClick={handleLogout}>
          <Icon icon="majesticons:logout-line" width="1.2em" height="1.2em" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
