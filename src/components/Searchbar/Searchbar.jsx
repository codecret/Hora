import { useState } from "react";
import "./Searchbar.css";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Perform search logic here
  };

return (
    <div className="searchbar-inner-container">
        <input
            className="searchbar-input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
        />
    </div>
);
};

export default Searchbar;
