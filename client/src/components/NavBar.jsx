import { useState } from "react";
import { useLogoutUser } from "../hooks/useAuth";
import Searchbar from "./Searchbar/Searchbar";
import { IoPersonCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import LanguageLayout from "./LanguageLayout";

const NavBar = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const { mutateAsync: logoutUser } = useLogoutUser();
  const { t } = useTranslation();

  return (
    <div className="searchbar-container">
      <Searchbar />
      <LanguageLayout
        showLanguage={showLanguage}
        setShowLanguage={setShowLanguage}
      />

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
                  width={30}
                  height={30}
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
              {t("logout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
