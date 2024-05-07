import "./DashboardPage.css";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem";
import { useGetAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardPage = () => {
  const { data, isLoading, isFetching } = useGetAppointments();
  if (isLoading || isFetching) {
    return <Loader />;
  }
  const transformedData = Object.entries(data.statusMap).map(
    ([label, value], id) => ({
      id,
      value,
      label,
    })
  );
  return (
    <div className="two-column-div">
      <div className="left-column">
        <div className="appointment-list">
          <h2 className="appointment-list-heading">Upcoming Appointments</h2>
          {data.appointments?.slice(0, 3).map((appointment, index) => (
            <AppointmentItem key={index} {...appointment} />
          ))}
        </div>
      </div>

      <div className="right-column">
        <div className="top-row">
          <div className="piechart">
            <PieChart
              slotProps={{ legend: { hidden: true } }}
              colors={["#81C8D8", "#0098EE", "#589DFB", "#B1D5FF"]}
              series={[
                {
                  data: transformedData,
                },
              ]}
              width={250}
              height={160}
            />
          </div>
          <div className="chartLabel">
            <p>Analytics</p>
          </div>
        </div>
        <div className="bottom-row">
          <div className="container-bottom-row">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={150}
                height={40}
                data={data.appointmentCountsByDay}
              >
                <div>BarChart</div>
                <XAxis
                  dataKey="day"
                  stroke="white"
                  tickFormatter={(tick) => {
                    return tick.charAt(0);
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                {/* <YAxis stroke="white" /> */}
                <Tooltip
                  formatter={(value) => [value]}
                  content={"1"}
                  contentStyle={{
                    backgroundColor: "white",
                  }}
                  itemStyle={{ color: "black" }}
                />
                <Bar dataKey="count" barSize={75} radius={[20, 20, 20, 20]}>
                  <Bar dataKey="count" barSize={75} radius={[20, 20, 20, 20]} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="chartLabel white-bg">
              <p>Number of appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
