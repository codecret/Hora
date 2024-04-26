import "./AppointmentItem.css";
import { Icon } from '@iconify/react';

const AppointmentItem = () => {

  return (
    <div className="appointment-card">
      <div className="card-leftside">
          <h2 className="appointment-title">Follow-up call</h2>
          <div className="appointment-date">
              <Icon icon="majesticons:calendar-line" width="1.2em" height="1.2em" />
              <p>Wednesday, Aug 7</p>
          </div>
          <div className="appointment-time">
              <Icon icon="majesticons:clock-line" width="1.2em" height="1.2em" />
              <p>9:00 - 10:00 AM</p>
          </div>
      </div>
      <div className="card-rightside">
          <p className="appointment-name">Dr. Jessica Schmidt</p>
          <p className="appointment-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam doloribus magnam ex</p>
          <Icon className="arrow-icon" icon="majesticons:arrow-right" width="1.2em" height="1.2em" />
      </div>
    </div>
  );
};

export default AppointmentItem;
