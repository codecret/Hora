import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { Icon } from "@iconify/react";
import { links } from "../../../../utils/links";

const Sidebar = () => {
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
        <a className="logout-icon" href="/">
          <Icon icon="majesticons:logout-line" width="1.2em" height="1.2em" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
