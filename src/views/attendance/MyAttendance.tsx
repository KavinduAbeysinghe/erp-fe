import { Box, Grid, Typography } from "@mui/material";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { useForm } from "react-hook-form";
import { CustomButton } from "../../components/buttons/CustomButton";
import SearchTable from "../../components/tables/SearchTable";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { TopCardAttendance } from "./TopCardAttendance";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { CustomModal } from "../../components/modals/CustomModal";
import { useState } from "react";
import { MyAttendanceForm } from "./MyAttendanceForm";

export const MyAttendance = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

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
      punchIn: "",
      punchOut: "",
      break: "",
      overtime: "",
    },
    {
      sNo: 1002,
      date: "2023-11-02",
      production: "8.5 hrs",
      punchIn: "8 AM",
      punchOut: "5 PM",
      break: "1.5 hrs",
      overtime: "2.5 hrs",
    },
    {
      sNo: 1003,
      date: "2023-11-03",
      production: "8.5 hrs",
      punchIn: "8 AM",
      punchOut: "5 PM",
      break: "1.5 hrs",
      overtime: "2.5 hrs",
    },
    {
      sNo: 1004,
      date: "2023-11-04",
      production: "8.5 hrs",
      punchIn: "8 AM",
      punchOut: "5 PM",
      break: "1.5 hrs",
      overtime: "2.5 hrs",
    },
    {
      sNo: 1005,
      date: "2023-11-05",
      production: "8.5 hrs",
      punchIn: "8 AM",
      punchOut: "5 PM",
      break: "1.5 hrs",
      overtime: "2.5 hrs",
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
      title: "Your Total Days",
      value: "256",
      borderColor: "#3730a3",
    },
    {
      title: "Your Total Hours",
      value: "12,500",
      borderColor: "#3730a3",
    },
    {
      title: "Average Hours",
      value: "12.90",
      borderColor: "#3730a3",
    },
    {
      title: "Overtime Hours",
      value: "9.50",
      borderColor: "#3730a3",
    },
  ];

  const handleEditEntry = () => {
    setShowModal(true);
  };

  const actionButtons = [
    { tooltip: "Edit", icon: faClock, handleClick: handleEditEntry },
  ];

  return (
    <>
      <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={"Mark Attendance"}
        body={<MyAttendanceForm />}
      />
      <Grid container spacing={2} mb={5}>
        {topCardsData?.map((d: any, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <TopCardAttendance data={d} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} mb={5}>
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
      <SearchTable
        tableData={tableData}
        tableHeaders={tableHeads}
        id={""}
        paginate={true}
        actionButtons={actionButtons}
      />
    </>
  );
};
