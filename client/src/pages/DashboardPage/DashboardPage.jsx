// import "./DashboardPage.css";
import { useGetAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";
import { combineDateAndTime } from "../../utils/hooks";
import BarChartComponent from "./BarChartComponent";
import AppointmentsColumn from "./AppointmentsColumn";
import PieChartComponent from "./PieChartComponent";
import Wrapper from "../../assets/styles/DashboardWrapper";

const DashboardPage = () => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching } = useGetAppointments();
  if (isLoading || isFetching) {
    return <Loader center />;
  }
  const transformedData = Object.entries(data.statusMap).map(
    ([label, value], id) => ({
      id,
      value: t(value),
      label: t(label),
    })
  );
  const upcomingAppointments = getUpcomingAppointments(data.appointments);

  return (
    <Wrapper>
      <AppointmentsColumn upcomingAppointments={upcomingAppointments} t={t} />
      <div className="right-column">
        <div className="top-row">
          <PieChartComponent transformedData={transformedData} t={t} />
        </div>
        <div className="bottom-row">
          <BarChartComponent data={data} t={t} />
        </div>
      </div>
    </Wrapper>
  );
};

export default DashboardPage;

const getUpcomingAppointments = (appointments) => {
  const now = new Date();
  return appointments?.filter((appointment) => {
    const startDateTimeCombined = combineDateAndTime(
      appointment.startDate,
      appointment.startTime
    );
    return startDateTimeCombined >= now;
  });
};
