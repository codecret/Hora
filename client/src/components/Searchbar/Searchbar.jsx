import { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
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
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Searchbar;
