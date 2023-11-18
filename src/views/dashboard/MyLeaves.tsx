import { Box, useMediaQuery } from "@mui/material";
import { axisClasses, BarChart } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";
import { OptionIn } from "../../util";

export const MyLeaves = () => {
  const chartSetting = {
    yAxis: [
      {
        label: "Week",
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  const dataSet = [
    {
      week: "January",
      annual: 0,
      casual: 2,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "February",
      annual: 0,
      casual: 3,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "March",
      annual: 15,
      casual: 0,
      study: 2,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "April",
      annual: 0,
      casual: 0,
      study: 0,
      bereavement: 1,
      familyAndMedical: 1,
    },
    {
      week: "May",
      annual: 0,
      casual: 1,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "June",
      annual: 0,
      casual: 1,
      study: 0,
      bereavement: 7,
      familyAndMedical: 1,
    },
    {
      week: "July",
      annual: 0,
      casual: 1,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "August",
      annual: 0,
      casual: 3,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "September",
      annual: 0,
      casual: 0,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "October",
      annual: 0,
      casual: 0,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "November",
      annual: 0,
      casual: 0,
      study: 1,
      bereavement: 0,
      familyAndMedical: 0,
    },
    {
      week: "December",
      annual: 15,
      casual: 0,
      study: 0,
      bereavement: 0,
      familyAndMedical: 0,
    },
  ];

  const valueFormatter = (value: number) => `${value} days`;

  const series: MakeOptional<BarSeriesType, "type">[] = [
    { dataKey: "casual", valueFormatter, color: "#90caf9", label: "Casual" },
    {
      dataKey: "familyAndMedical",
      valueFormatter,
      color: "#42a5f5",
      label: "Family & Medical",
    },
    { dataKey: "study", valueFormatter, color: "#1e88e5", label: "Study" },
    {
      dataKey: "bereavement",
      valueFormatter,
      color: "#1565c0",
      label: "Bereavement",
    },
  ];

  const media = useMediaQuery("(max-width: 827px)");

  return (
    <Box sx={{ overflow: "auto" }}>
      {media ? (
        <BarChart
          dataset={dataSet}
          xAxis={[{ scaleType: "band", dataKey: "week" }]}
          series={series}
          height={400}
          width={550}
          {...chartSetting}
        />
      ) : (
        <BarChart
          dataset={dataSet}
          xAxis={[{ scaleType: "band", dataKey: "week" }]}
          series={series}
          height={400}
          {...chartSetting}
        />
      )}
    </Box>
  );
};
