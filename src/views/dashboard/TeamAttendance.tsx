import { Grid } from "@mui/material";
import { axisClasses, BarChart } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";
import { useEffect, useState } from "react";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { employees, OptionIn } from "../../util";

interface TeamAttendanceProps {
  control: any;
  setValue: any;
  watch: any;
}

export const TeamAttendance = ({
  control,
  setValue,
  watch,
}: TeamAttendanceProps) => {
  const [seriesData, setSeriesData] = useState<any>(null);

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
      color: filterMyAttendance === "weekly" ? "#1565c0" : "#1565c0",
    },
  ];

  const myAttendanceOptions: Array<OptionIn> = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  useEffect(() => {
    setValue("filterMyAttendance", "weekly");
    setValue("employeeName_TA", 1);
  }, []);

  const attendanceData = [
    {
      empId: 1,
      weeklyDataSet: weeklyDataSet,
      monthlyDataSet: monthlyDataSet,
    },
    {
      empId: 2,
      weeklyDataSet: weeklyDataSet,
      monthlyDataSet: monthlyDataSet,
    },
    {
      empId: 3,
      weeklyDataSet: weeklyDataSet,
      monthlyDataSet: monthlyDataSet,
    },
    {
      empId: 4,
      weeklyDataSet: weeklyDataSet,
      monthlyDataSet: monthlyDataSet,
    },
    {
      empId: 5,
      weeklyDataSet: weeklyDataSet,
      monthlyDataSet: monthlyDataSet,
    },
  ];

  const employeeOptions: Array<OptionIn> = employees?.map((e: any) => ({
    label: e?.name,
    value: e?.empId,
  }));

  const empId = watch("employeeName_TA");

  useEffect(() => {
    if (empId && filterMyAttendance) {
      const i = attendanceData?.find((d: any) => d?.empId === empId);
      if (i) {
        setSeriesData(
          filterMyAttendance === "weekly" ? i?.weeklyDataSet : i?.monthlyDataSet
        );
      }
    }
  }, [empId, filterMyAttendance]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={2}>
          <FormDropdown
            name={"filterMyAttendance"}
            options={myAttendanceOptions}
            helperText={""}
            control={control}
            label={"Filter"}
            labelId={"filter-attendance-label"}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={10}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Employee Name"}
            options={employeeOptions}
            id={"employeeName_TA"}
            required={false}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
      </Grid>
      {seriesData && (
        <BarChart
          dataset={seriesData}
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
      )}
    </>
  );
};
