import "./DashboardPage.css";
import AppointmentItem from "../../components/AppointmentItem/AppointmentItem";
import { useGetAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const { t } = useTranslation();

  const { data, isLoading, isFetching } = useGetAppointments();
  if (isLoading || isFetching) {
    return <Loader />;
  }
  console.log(data);
  const transformedData = Object.entries(data.statusMap).map(
    ([label, value], id) => ({
      id,
      value: t(value),
      label: t(label),
    })
  );
  const hasData = data?.appointments.length > 0;
  return (
    <div className="two-column-div">
      <div className="left-column">
        <div className="appointment-list">
          <h2 className="appointment-list-heading">
            {t("Upcoming Appointments")}
          </h2>

          {data.appointments?.slice(0, 3).map((appointment, index) => (
            <AppointmentItem key={index} {...appointment} />
          ))}
        </div>
      </div>

      <div className="right-column">
        <div className="top-row">
          <div className="piechart">
            {hasData ? (
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
            ) : (
              <p>{t("No data to display")}</p> // Translatable message for no data
            )}
          </div>
          <div className="chartLabel">
            <p>{t("Analytics")}</p>
          </div>
        </div>
        <div className="bottom-row">
          <div className="container-bottom-row">
            <ResponsiveContainer width="95%" height="80%">
              {hasData ? (
                <BarChart
                  width={150}
                  height={40}
                  data={data.appointmentCountsByDay.map((entry) => ({
                    ...entry,
                    day: t(entry.day),
                  }))}
                >
                  <div>{t("BarChart")}</div>
                  <XAxis
                    dataKey="day"
                    stroke="white"
                    tickFormatter={(tick) => {
                      const translatedTick = tick ? t(tick) : t("N/A");
                      return translatedTick.charAt(0);
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  {/* <YAxis stroke="white" /> */}
                  <Tooltip
                    formatter={(value) => {
                      return [
                        value !== null && value !== undefined
                          ? value
                          : t("N/A"),
                      ];
                    }}
                    content={"1"}
                    contentStyle={{
                      backgroundColor: "white",
                    }}
                    itemStyle={{ color: "black" }}
                  />
                  <Bar dataKey="count" barSize={75} radius={[20, 20, 20, 20]}>
                    <Bar
                      dataKey="count"
                      barSize={75}
                      radius={[20, 20, 20, 20]}
                    />
                  </Bar>
                </BarChart>
              ) : (
                <p>{t("No data to display")}</p> // Translatable message for no data
              )}
            </ResponsiveContainer>
            <div className="chartLabel white-bg">
              <p>{t("Number of appointments")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
