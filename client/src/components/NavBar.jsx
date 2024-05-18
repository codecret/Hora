import { useEffect, useRef, useState } from "react";
import { useLogoutUser } from "../hooks/useAuth";
import Searchbar from "./Searchbar/Searchbar";
import { IoPersonCircle } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import LanguageLayout from "./LanguageLayout";
import { handleIconClick, handleUserDropdownClick } from "../utils/outclick";

const NavBar = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const { mutateAsync: logoutUser } = useLogoutUser();
  const { t } = useTranslation();
  const languageRef = useRef(null);
  const iconRef = useRef(null);
  const userDropdownRef = useRef(null);
  const userButtonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      languageRef.current &&
      !languageRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target) &&
      userDropdownRef.current &&
      !userDropdownRef.current.contains(event.target) &&
      userButtonRef.current &&
      !userButtonRef.current.contains(event.target)
    ) {
      setShowLanguage(false);
      setShowLogout(false);
    }
  };

  useEffect(() => {
    if (showLanguage || showLogout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguage, showLogout]);

  return (
    <div className="searchbar-container">
      <Searchbar />
      <LanguageLayout
        showLanguage={showLanguage}
        setShowLanguage={setShowLanguage}
        languageRef={languageRef}
        iconRef={iconRef}
        handleIconClick={() =>
          handleIconClick({ setShowLanguage, setShowLogout })
        }
      />

      <div className="user-name-container">
        <div className="btn-container">
          {/* the button */}
          <button
            ref={userButtonRef}
            type="button"
            className="reset-btn logoutBtn"
            onClick={() =>
              handleUserDropdownClick({ setShowLanguage, setShowLogout })
            }
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
          {/* the container */}
          <div
            ref={userDropdownRef}
            className={showLogout ? "dropdown show-dropdown" : "dropdown"}
          >
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
