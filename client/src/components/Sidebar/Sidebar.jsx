import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { links } from "../../../../utils/links";
import { useLogoutUser } from "../../hooks/useAuth";
import Wrapper from "../../assets/styles/SideBarWrapper";

const Sidebar = () => {
  const navigate = useNavigate();
  const { mutateAsync: logoutUser } = useLogoutUser();

  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <Wrapper>
      <div className="headingContainer">
        <h1
          id="heading"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Hora
        </h1>
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
      <div className="logoutContainer">
        <button className="logout-icon" onClick={handleLogout}>
          <Icon icon="majesticons:logout-line" width="1.8em" height="1.8em" />
        </button>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
