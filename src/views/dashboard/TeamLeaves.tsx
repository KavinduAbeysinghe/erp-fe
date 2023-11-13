import { FormDropdown } from "../../components/inputs/FormDropdown";
import { axisClasses, BarChart } from "@mui/x-charts";
import React from "react";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";
import { employees, OptionIn } from "../../util";
import { Grid } from "@mui/material";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";

interface TeamLeavesProps {
  control: any;
  setValue: any;
  watch: any;
}

export const TeamLeaves = ({ control, setValue, watch }: TeamLeavesProps) => {
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
    { dataKey: "casual", valueFormatter, color: "#818cf8", label: "Casual" },
    {
      dataKey: "familyAndMedical",
      valueFormatter,
      color: "#6366f1",
      label: "Family & Medical",
    },
    { dataKey: "study", valueFormatter, color: "#4f46e5", label: "Study" },
    {
      dataKey: "bereavement",
      valueFormatter,
      color: "#312e81",
      label: "Bereavement",
    },
  ];

  const myAttendanceOptions: Array<OptionIn> = [
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const employeeOptions: Array<OptionIn> = employees?.map((e: any) => ({
    label: e?.name,
    value: e?.empId,
  }));

  return (
    <>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Employee Name"}
            options={employeeOptions}
            id={"employeeName"}
            required={false}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
      </Grid>
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
