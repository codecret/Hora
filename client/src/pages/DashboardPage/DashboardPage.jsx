import "./DashboardPage.css";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem";
import { useGetAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";

const DashboardPage = () => {
  const { data, isLoading, isFetching, isError } = useGetAppointments();
  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <div className="two-column-div">
      <div className="left-column">
        <div className="appointment-list">
          <h2 className="appointment-list-heading">Upcoming Appointments</h2>
          {data
            ?.slice(0, 3)
            .map(
              (appointment, index) => (
                console.log(appointment),
                (<AppointmentItem key={index} {...appointment} />)
              )
            )}
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
