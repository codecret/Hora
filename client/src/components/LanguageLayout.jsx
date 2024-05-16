import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const LanguageLayout = ({ setShowLanguage, showLanguage }) => {
  const currentLanguage = localStorage.getItem("language");
  const { i18n } = useTranslation();

  return (
    <div className="btn-container">
      <MdLanguage
        size={32}
        className="lang-icon"
        onClick={() => setShowLanguage(!showLanguage)}
      />

      <div
        className={
          showLanguage
            ? "dropdown lang-container show-dropdown"
            : "lang-container"
        }
      >
        {currentLanguage !== "tr" && (
          <button
            className="lang-btn"
            onClick={() => {
              localStorage.setItem("language", "tr");
              i18n.changeLanguage("tr");
              setShowLanguage(!showLanguage);
            }}
          >
            Türkçe
          </button>
        )}
        {currentLanguage !== "eng" && (
          <button
            className="lang-btn"
            onClick={() => {
              localStorage.setItem("language", "eng");
              i18n.changeLanguage("en");
              setShowLanguage(!showLanguage);
            }}
          >
            English
          </button>
        )}
      </div>
    </div>
  );
};

export default LanguageLayout;
