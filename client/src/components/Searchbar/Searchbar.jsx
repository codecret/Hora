import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Searchbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    navigate(`/appointments?search=${e.target.value}`);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/appointments?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="searchbar-inner-container">
      <input
        className="searchbar-input"
        type="text"
        placeholder={t("Search")}
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Searchbar;
