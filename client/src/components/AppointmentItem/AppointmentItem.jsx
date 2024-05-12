import "./AppointmentItem.css";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { convertMinutesTo24hoursTime } from "../../utils/hooks";

const AppointmentItem = ({
  title,
  startDate,
  startTime,
  endTime,
  participants,
  description,
}) => {
  const emptyStartDate = startDate || "";
  const emptyStartTime = startTime
    ? convertMinutesTo24hoursTime(startTime)
    : "";
  const emptyEndTime = endTime ? convertMinutesTo24hoursTime(endTime) : "";
  const formattedStartDate = dayjs(emptyStartDate).format("dddd, MMM D");

  return (
    <div className="appointment-card">
      <div className="card-leftside">
        <h2 className="appointment-title">{title}</h2>
        <div className="appointment-date">
          <Icon icon="majesticons:calendar-line" width="1.2em" height="1.2em" />
          <p>{startDate && formattedStartDate}</p>
        </div>
        {startTime && (
          <div className="appointment-time">
            <Icon icon="majesticons:clock-line" width="1.2em" height="1.2em" />
            <p>{`${startTime && emptyStartTime} - ${
              endTime && emptyEndTime
            }`}</p>
          </div>
        )}
      </div>
      <div className="card-rightside">
        <p className="appointment-name">
          {participants.length > 1
            ? `${participants[0]} +${participants.length - 1} others.`
            : participants[0]}
        </p>
        <p className="appointment-description">{description}</p>
      </div>
    </div>
  );
};

export default AppointmentItem;
