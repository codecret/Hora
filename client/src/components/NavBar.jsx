import { useState } from "react";
import { useLogoutUser } from "../hooks/useAuth";
import Searchbar from "./Searchbar/Searchbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IoPersonCircle } from "react-icons/io5";

const NavBar = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { mutateAsync: logoutUser } = useLogoutUser();

  return (
    <div className="searchbar-container">
      <Searchbar />
      <div className="user-name-container">
        <div className="btn-container">
          <button
            type="button"
            className="reset-btn logoutBtn"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <h3 className="name">{user?.name ?? "username"}</h3>
            <div className="userContainer">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="profile"
                  width={20}
                  height={20}
                  className="profileImg"
                />
              ) : (
                <IoPersonCircle size={40} />
              )}
            </div>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            {/* //TODO */}
            {/* <button
          type="button"
          className="dropdown-btn"
          onClick={async () => {
            //   navigate(`/${user._id}/profile-edit`);
          }}
        >
          Edit Profile
        </button> */}
            <button
              type="button"
              className="dropdown-btn"
              onClick={async () => {
                await logoutUser();
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
