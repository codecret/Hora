import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ data, t }) => {
  return (
    <div className="container-bottom-row">
      <ResponsiveContainer width="95%" height="80%">
        {data?.appointments.length > 0 ? (
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
            <Tooltip
              formatter={(value) => {
                return [
                  value !== null && value !== undefined ? value : t("N/A"),
                ];
              }}
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
        ) : (
          <p>{t("No data to display")}</p>
        )}
      </ResponsiveContainer>
      <div className="chartLabel white-bg">
        <p>{t("Number of appointments")}</p>
      </div>
    </div>
  );
};

export default BarChartComponent;
