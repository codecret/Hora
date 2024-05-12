import { useEffect, useRef, useState } from "react";
import { useGetAppointmentsSearch } from "../../hooks/useAppointments";
import "./SearchPage.css";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { data, error, status } = useGetAppointmentsSearch({
    search,
    inputRef,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const querySearchTerm = searchParams.get("search");
    if (querySearchTerm) {
      setSearch(querySearchTerm);
    }
  }, [location]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    navigate(`/appointments?search=${e.target.value}`);
  };

  return (
    <main className="dashboard-container">
      <div className="sidebar-left-column">
        <Sidebar />
      </div>
      <div className="dashboard-right-column topColumns">
        <input
          type="text"
          ref={inputRef}
          value={search}
          onChange={handleInputChange}
          className="searchAppointment borderedDiv"
        />
        <div className="appointment-list search-list">
          {status === "pending" ? (
            <Loader />
          ) : status === "error" ? (
            <span>Error: {error.message}</span>
          ) : data && data.appointments && data.appointments.length > 0 ? (
            data.appointments.map((appointment, index) => (
              <AppointmentItem key={index} {...appointment} />
            ))
          ) : (
            <h3>No Appointment Data..</h3>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
