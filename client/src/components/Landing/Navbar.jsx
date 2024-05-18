import Logo from "../Logo";
import "../../pages/Landing/Landing.css";
import { useTranslation } from "react-i18next";
import LanguageLayout from "../LanguageLayout";
import { useEffect, useRef, useState } from "react";
import { handleIconClick } from "../../utils/outclick";

const Navbar = ({ handleNavigate }) => {
  const { t } = useTranslation();
  const [showLanguage, setShowLanguage] = useState(false);
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
    }
  };

  useEffect(() => {
    if (showLanguage) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguage]);

  return (
    <nav className="navContainer">
      <Logo />
      <div className="navBtns">
        <LanguageLayout
          showLanguage={showLanguage}
          setShowLanguage={setShowLanguage}
          languageRef={languageRef}
          iconRef={iconRef}
          handleIconClick={() => handleIconClick({ setShowLanguage })}
        />
        <button
          className="mybtn nav-login-btn"
          onClick={(e) => handleNavigate(e, "login")}
        >
          {t("Login")}
        </button>
        <button
          className="mybtn secBtn"
          onClick={(e) => handleNavigate(e, "signup")}
        >
          {t("Sign Up")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
