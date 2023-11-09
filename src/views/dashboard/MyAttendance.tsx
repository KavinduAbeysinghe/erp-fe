import { axisClasses, BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { months, OptionIn } from "../../util";
import { Grid } from "@mui/material";

interface MyAttendanceProps {
  control: any;
  setValue: any;
  watch: any;
}

export const MyAttendance = ({
  control,
  setValue,
  watch,
}: MyAttendanceProps) => {
  const chartSetting = {
    yAxis: [
      {
        label: "Days",
      },
    ],
    sx: {
      width: "100%",
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  const weeklyDataSet = [
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

  const monthlyDataSet = [
    { month: "Jan", attendance: 20 },
    { month: "Feb", attendance: 30 },
    { month: "Mar", attendance: 16 },
    { month: "Apr", attendance: 25 },
    { month: "May", attendance: 28 },
    { month: "Jun", attendance: 31 },
    { month: "Jul", attendance: 10 },
    { month: "Aug", attendance: 18 },
    { month: "Sep", attendance: 28 },
    { month: "Oct", attendance: 16 },
    { month: "Nov", attendance: 27 },
    { month: "Dec", attendance: 31 },
  ];

  const valueFormatter = (value: number) => `${value} days`;

  const filterMyAttendance = watch("filterMyAttendance");

  const series: MakeOptional<BarSeriesType, "type">[] = [
    {
      dataKey: "attendance",
      valueFormatter,
      color: filterMyAttendance === "weekly" ? "#312e81" : "#1e1b4b",
    },
  ];

  const myAttendanceOptions: Array<OptionIn> = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  useEffect(() => {
    setValue("filterMyAttendance", "weekly");
  }, []);

  return (
    <>
      <FormDropdown
        name={"filterMyAttendance"}
        options={myAttendanceOptions}
        helperText={""}
        control={control}
        label={"Filter"}
        labelId={"filter-attendance-label"}
      />
      <BarChart
        dataset={
          filterMyAttendance === "weekly" ? weeklyDataSet : monthlyDataSet
        }
        xAxis={[
          {
            scaleType: "band",
            dataKey: filterMyAttendance === "weekly" ? "week" : "month",
          },
        ]}
        series={series}
        // width={350}
        height={400}
        {...chartSetting}
      />
    </>
  );
};
