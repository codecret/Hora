import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarPage.css";

const CalendarPage = () => {
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
      <FullCalendar
        height={700}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};
export default CalendarPage;
