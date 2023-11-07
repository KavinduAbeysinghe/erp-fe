import { axisClasses, BarChart } from "@mui/x-charts";
import React from "react";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";

export const MyAttendance = () => {
  const chartSetting = {
    yAxis: [
      {
        label: "Week",
      },
    ],
    sx: {
      width: "100%",
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  const dataSet = [
    {
      week: "Week 1",
      attendance: 3,
    },
    {
      week: "Week 2",
      attendance: 1,
    },
    {
      week: "Week 3",
      attendance: 7,
    },
    {
      week: "Week 4",
      attendance: 3,
    },
    {
      week: "Week 5",
      attendance: 2,
    },
  ];

  const valueFormatter = (value: number) => `${value} days`;

  const series: MakeOptional<BarSeriesType, "type">[] = [
    { dataKey: "attendance", valueFormatter },
  ];

  return (
    <>
      <BarChart
        dataset={dataSet}
        xAxis={[{ scaleType: "band", dataKey: "week" }]}
        series={series}
        // width={350}
        height={400}
        {...chartSetting}
      />
    </>
  );
};
