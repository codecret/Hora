import { PieChart } from "@mui/x-charts/PieChart";

const PieChartComponent = ({ transformedData, t }) => {
  return (
    <>
      <div className="piechart">
        {transformedData ? (
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
          <p>{t("No data to display")}</p>
        )}
      </div>
      <div className="chartLabel">
        <p>{t("Analytics")}</p>
      </div>
    </>
  );
};

export default PieChartComponent;
