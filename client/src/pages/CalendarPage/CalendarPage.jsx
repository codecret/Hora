import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarPage.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AddAppointmentWindow from "../../components/modals/AddAppointmentWindow";
import { useGetAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import { convertMinutesTo24hoursTime } from "../../utils/hooks";
import FullCalendar from "@fullcalendar/react";
import { StyledCalendar } from "../../assets/styles";
import { useTranslation } from "react-i18next";
import allLocales from "@fullcalendar/core/locales-all";

const COLOR_OPTIONS = [
  "#00AB55",
  "#1890FF",
  "#FFC107",
  "#FF4842",
  "#04297A",
  "#7A0C2E",
];
const CalendarPage = () => {
  const { t, i18n } = useTranslation();
  const calendarRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedId, setEditedId] = useState("");
  const { data, isLoading, isFetching } = useGetAppointments();
  const [filteredDate, setFilteredDate] = useState([]);
  useEffect(() => {
    if (data?.appointments) {
      const events = data?.appointments?.map((e, index) => {
        // Split the startDate into date and time parts
        const startDateParts = e.startDate.split("T");
        const startTimeConvertedToHours = convertMinutesTo24hoursTime(
          e.startTime
        );
        let startDateTimeCombined = `${startDateParts[0]}T${startTimeConvertedToHours}`; // Split the endDate into date and time parts
        startDateTimeCombined = dayjs(startDateTimeCombined).tz(
          "Europe/Istanbul",
          true
        );

        const endDateParts = e.endDate.split("T");
        const endTimeConvertedToHours = convertMinutesTo24hoursTime(e.endTime);
        let endDateTimeCombined = `${endDateParts[0]}T${endTimeConvertedToHours}`; // Split the endDate into date and time parts
        endDateTimeCombined = dayjs(endDateTimeCombined).tz(
          "Europe/Istanbul",
          true
        );
        return {
          id: e._id,
          title: e.title,
          start: startDateTimeCombined.isValid()
            ? startDateTimeCombined.toDate()
            : null, // Convert to Date object
          end: endDateTimeCombined.isValid()
            ? endDateTimeCombined.toDate()
            : null, // Convert to Date object
          status: e.status,
          participants: e.participants,
          description: e.description,
          color: COLOR_OPTIONS[index % COLOR_OPTIONS.length],
          textColor: COLOR_OPTIONS[index % COLOR_OPTIONS.length],
        };
      });

      setFilteredDate(events);
    } else {
      setFilteredDate([]);
    }
  }, [data?.appointments]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="calendarContainer">
      {createPortal(
        <AddAppointmentWindow
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          editedId={editedId}
          dates={filteredDate}
        />,
        document.body
      )}
      <div className="header">
        <p>{t("Make Appointment")}</p>
        <button
          className="reset-btn custom-btn"
          onClick={() => {
            setEditedId("");
            setIsModalOpen(!isModalOpen);
          }}
        >
          <p>{t("Add")}</p>
        </button>
      </div>
      <StyledCalendar>
        <FullCalendar
          weekends
          editable
          droppable
          selectable
          rerenderDelay={10}
          allDayMaintainDuration
          height="calc(100vh - 200px)"
          eventResizableFromStart
          ref={calendarRef}
          locales={allLocales}
          locale={i18n.language}
          // initialDate={date}
          // initialView={view}
          dayMaxEventRows={3}
          eventDisplay="block"
          events={filteredDate}
          eventClick={(info) => {
            setEditedId(info.event.id);
            setIsModalOpen(true);
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
          }}
          // initialEvents={events}
          // select={handleSelectRange}
          // eventDrop={handleDropEvent}
          // eventResize={handleResizeEvent}
          plugins={[listPlugin, dayGridPlugin, timeGridPlugin]}
        />
      </StyledCalendar>
    </div>
  );
};
export default CalendarPage;
