import Logo from "../Logo";
import "../../pages/Landing/Landing.css";
import { useTranslation } from "react-i18next";
import LanguageLayout from "../LanguageLayout";
import { useState } from "react";

const Navbar = ({ handleNavigate }) => {
  const { t } = useTranslation();
  const [showLanguage, setShowLanguage] = useState(false);

  return (
    <nav className="navContainer">
      <Logo />
      <div className="navBtns">
        <LanguageLayout
          showLanguage={showLanguage}
          setShowLanguage={setShowLanguage}
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
