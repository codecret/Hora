import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarPage.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import { Calendar } from "@fullcalendar/core";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddAppointmentWindow from "../../components/modals/AddAppointmentWindow";

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        plugins: [dayGridPlugin, bootstrap5Plugin],
        themeSystem: "bootstrap5",
        height: "550px",
      });
      calendar.render();
    }
  }, []);
  const events = [
    { title: "Meeting", start: new Date() },
    { title: "Meeting", start: new Date() },
    { title: "Meeting", start: new Date() },
  ];

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
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
