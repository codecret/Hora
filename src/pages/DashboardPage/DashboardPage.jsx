import Sidebar from "../../components/Sidebar/Sidebar";
import "./DashboardPage.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem";
import { Icon } from "@iconify/react/dist/iconify.js";

const DashboardPage = () => {

  const name = "John Doe";

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
  ];

  return (
    <main className="dashboard-container">
      <div className="sidebar-left-column">
        <Sidebar />
      </div>

      <div className="dashboard-right-column">
        <div className="searchbar-container">
          <Searchbar />
          <div className="user-name-container">
            <h3>{name}</h3>
            <a href="/ProfilePage"><Icon icon="majesticons:user-line" width="1.2em" height="1.2em" /></a>
          </div>
        </div>

        <div className="two-column-div">
          <div className="left-column">
            <div className="appointment-list">
                <h2 className="appointment-list-heading">Upcoming Appointments</h2>
              {appointments.map((appointment, index) => (
                <AppointmentItem
                  key={index}
                  {...appointment}
                />
              ))}
            </div>
          </div>

          <div className="right-column">
            <div className="top-row"></div>
            <div className="bottom-row"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
