import { Grid } from "@mui/material";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { CustomButton } from "../../components/buttons/CustomButton";
import SearchTable from "../../components/tables/SearchTable";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { TopCardAttendance } from "./TopCardAttendance";

export const TeamsAttendance = () => {
  const tableHeads = [
    "S.No",
    "Date",
    "Production",
    "Punch In",
    "Punch Out",
    "Break",
    "Overtime",
  ];

  const tableData = [
    {
      sNo: 1001,
      date: "2023-11-01",
      production: "8.5 hrs",
    },
  ];

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const onSearch = (data: any) => {};

  const topCardsData = [
    {
      title: "Total Days",
      value: "11, 500",
      borderColor: "#3730a3",
    },
    {
      title: "Total Hours",
      value: "201.50",
      borderColor: "#3730a3",
    },
    {
      title: "Average Hours",
      value: "7.50",
      borderColor: "#3730a3",
    },
    {
      title: "Overtime Hours",
      value: "1.20",
      borderColor: "#3730a3",
    },
  ];

  return (
    <>
      <Grid container spacing={2} mb={5}>
        <Grid item xs={12} sm={12} md={3}>
          <FormAutocomplete
            error={!!errors?.nationality?.message}
            helperText={errors?.nationality?.message?.toString()}
            setValue={setValue}
            label={"Team Member Name"}
            options={[]}
            id={"teamMemberName"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Date From"}
            name={"dateFrom"}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Date From"}
            name={"dateFrom"}
            control={control}
          />
        </Grid>
        <Grid
          item
          md={3}
          display={"flex"}
          flexWrap={"wrap"}
          gap={2}
          alignItems={"center"}
        >
          <CustomButton
            text={"Search"}
            variant={"contained"}
            onClick={handleSubmit(onSearch)}
          />
          <CustomButton
            text={"Clear"}
            variant={"outlined"}
            onClick={() => {}}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={5}>
        {topCardsData?.map((d: any, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <TopCardAttendance data={d} />
          </Grid>
        ))}
      </Grid>
      <SearchTable
        tableData={[]}
        tableHeaders={tableHeads}
        id={""}
        paginate={true}
      />
    </>
  );
};
