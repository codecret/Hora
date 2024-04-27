import "./AppointmentItem.css";
import { Icon } from "@iconify/react";

const AppointmentItem = ({ title, date, time, participant, description }) => {
  return (
    <div className="appointment-card">
      <div className="card-leftside">
        <h2 className="appointment-title">{title}</h2>
        <div className="appointment-date">
          <Icon icon="majesticons:calendar-line" width="1.2em" height="1.2em" />
          <p>{date}</p>
        </div>
        <div className="appointment-time">
          <Icon icon="majesticons:clock-line" width="1.2em" height="1.2em" />
          <p>{time}</p>
        </div>
      </div>
      <div className="card-rightside">
        <p className="appointment-name">{participant}</p>
        <p className="appointment-description">{description}</p>
        <Icon
          className="arrow-icon"
          icon="majesticons:arrow-right"
          width="1.2em"
          height="1.2em"
        />
      </div>
    </div>
  );
};

export default AppointmentItem;
