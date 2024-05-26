import AppointmentItem from "../../components/AppointmentItem";

const AppointmentsColumn = ({ upcomingAppointments, t }) => {
  return (
    <div className="left-column">
      <div className="appointment-list">
        <h2 className="appointment-list-heading">
          {t("Upcoming Appointments")}
        </h2>

        {upcomingAppointments.map((appointment, index) => (
          <AppointmentItem key={index} {...appointment} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsColumn;
