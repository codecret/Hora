import "./DashboardPage.css";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem";

const DashboardPage = () => {
  const appointments = [
    {
      title: "Appointment 1",
      date: "2024-04-30",
      time: "10:00 AM",
      participant: "John Doe",
      description:
        "Lorem ipsum, dolor sit amet consectetur atione facilis, at mollitia recusandae ullam. Error, earum magnam a est animi porro illo aliquid consequuntur?",
    },
    {
      title: "Appointment 2",
      date: "2024-05-05",
      time: "2:30 PM",
      participant: "Jane Smith",
      description:
        "Lorem ipsum, dolor sit amet consectetur atione facilis, at mollitia recusandae ullam. Error, earum magnam a est animi porro illo aliquid consequuntur?",
    },
    {
      title: "Appointment 2",
      date: "2024-05-05",
      time: "2:30 PM",
      participant: "Jane Smith",
      description:
        "Lorem ipsum, dolor sit amet consectetur atione facilis, at mollitia recusandae ullam. Error, earum magnam a est animi porro illo aliquid consequuntur?",
    },
    {
      title: "Appointment 2",
      date: "2024-05-05",
      time: "2:30 PM",
      participant: "Jane Smith",
      description:
        "Lorem ipsum, dolor sit amet consectetur atione facilis, at mollitia recusandae ullam. Error, earum magnam a est animi porro illo aliquid consequuntur?",
    },
    {
      title: "Appointment 2",
      date: "2024-05-05",
      time: "2:30 PM",
      participant: "Jane Smith",
      description:
        "Lorem ipsum, dolor sit amet consectetur atione facilis, at mollitia recusandae ullam. Error, earum magnam a est animi porro illo aliquid consequuntur?",
    },
  ];

  return (
    <div className="two-column-div">
      <div className="left-column">
        <div className="appointment-list">
          <h2 className="appointment-list-heading">Upcoming Appointments</h2>
          {appointments.map((appointment, index) => (
            <AppointmentItem key={index} {...appointment} />
          ))}
        </div>
      </div>

      <div className="right-column">
        <div className="top-row"></div>
        <div className="bottom-row"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
