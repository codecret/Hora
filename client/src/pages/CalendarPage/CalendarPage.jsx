import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarPage.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { Calendar } from "@fullcalendar/core";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddAppointmentWindow from "../../components/modals/AddAppointmentWindow";
import { useGetAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isFetching, isError } = useGetAppointments();
  const [filteredDate, setFilteredDate] = useState([]);
  useEffect(() => {
    if (data?.appointments) {
      let events = data?.appointments?.map((e) => ({
        title: e.title,
        start: e.startDate,
        end: e.endDate,
        background: "red",
      }));
      setFilteredDate(events);
    } else {
      setFilteredDate([]);
    }
  }, [data?.appointments]);

  useEffect(() => {
    if (calendarRef.current) {
      const eventColors = [
        "#315ebf",
        "#2c8ea0",
        "#d#861cbf",
        "#de53b5",
        "#5a73d0",
      ];

      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
        themeSystem: "bootstrap5",
        height: "calc(100vh - 200px)",

        events: filteredDate,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        navLinks: true,
        dayMaxEvents: true,
      });
      calendar.render();
    }
  }, [filteredDate, isFetching]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="calendarContainer">
      {createPortal(
        <AddAppointmentWindow
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />,
        document.body
      )}
      <div className="header">
        <p>Make Appointment</p>
        <button
          className="reset-btn custom-btn"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Add
        </button>
      </div>
      <div ref={calendarRef} style={{ height: "300px" }} />
    </div>
  );
};
export default CalendarPage;
