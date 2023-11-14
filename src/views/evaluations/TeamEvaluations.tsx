import { Avatar, Box, Grid, Typography } from "@mui/material";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import React, { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import SearchTable from "../../components/tables/SearchTable";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { CustomChip } from "../../components/chips/Chip";
import { useLocation, useNavigate } from "react-router-dom";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { CustomButton } from "../../components/buttons/CustomButton";
import { employees } from "../../util";
import { Search } from "@mui/icons-material";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";

export const TeamEvaluations = () => {
  const navigate = useNavigate();

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const dropdownOptions = [
    { label: "2023", value: 2023 },
    { label: "2022", value: 2022 },
    { label: "2021", value: 2021 },
    { label: "2020", value: 2020 },
    { label: "2019", value: 2019 },
  ];

  useEffect(() => {
    setValue("filterYear", 2023);
  }, []);

  const tableHeads = [
    "Eval ID",
    "Type",
    "Name",
    "Team Member",
    "Activity Name",
    "Date",
    "Status",
  ];

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const handleViewEvaluation = (id: any) => {
    const data = tabelData?.find((d: any) => d?.id === id);
    const evaluation = { type: data?.type, id: id };
    searchParams.set("eval", JSON.stringify(evaluation));
    navigate(
      `/control/evaluation-management/view-team-evaluation?${searchParams}`
    );
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleViewEvaluation },
  ];

  const tabelData = [
    {
      id: 1,
      evalId: 1001,
      type: "Self",
      name: "Non-Management",
      teamMember: <EmployeeColumn id={1} />,
      activityName: "Non-Management Evaluation",
      date: "2023-05-05",
      status: <CustomChip label={"Completed"} type={"success"} />,
    },
    {
      id: 2,
      evalId: 1001,
      type: "Non-Self",
      name: "Management",
      teamMember: <EmployeeColumn id={2} />,
      activityName: "Management Evaluation",
      date: "2023-02-05",
      status: <CustomChip label={"Draft"} type={"warning"} />,
    },
    {
      id: 3,
      evalId: 1001,
      type: "Non-Self",
      name: "Management",
      teamMember: <EmployeeColumn id={3} />,
      activityName: "Management Evaluation",
      date: "2023-02-05",
      status: <CustomChip label={"Completed"} type={"success"} />,
    },
    {
      id: 4,
      evalId: 1001,
      type: "Non-Self",
      name: "Management",
      teamMember: <EmployeeColumn id={4} />,
      activityName: "Management Evaluation",
      date: "2023-02-05",
      status: <CustomChip label={"Draft"} type={"warning"} />,
    },
    {
      id: 5,
      evalId: 1001,
      type: "Non-Self",
      name: "Management",
      teamMember: <EmployeeColumn id={5} />,
      activityName: "Management Evaluation",
      date: "2023-02-05",
      status: <CustomChip label={"Completed"} type={"success"} />,
    },
  ];

  const handleSearch = () => {};

  const resetForm = () => {};

  return (
    <>
      <Grid container spacing={2} my={2} mb={5}>
        <Grid item xs={12} sm={6} md={1}>
          <FormDropdown
            name={"filterYear"}
            options={dropdownOptions}
            label={"Year"}
            labelId={"filterYr-notice-label"}
            id={"filterYear"}
            helperText={""}
            control={control}
            fullWidth={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Evaluation Name"}
            options={[]}
            id={"evaluationName"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Team Member"}
            options={[]}
            id={"evaluationName"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Date To"}
            name={"dateTo"}
            control={control}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <FormDropdown
            name={"status"}
            options={[]}
            helperText={""}
            control={control}
            label={"Status"}
            labelId={"label-status"}
            error={false}
            fullWidth={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          display={"flex"}
          gap={2}
          alignItems={"center"}
        >
          <CustomButton
            text={"Search"}
            variant={"contained"}
            onClick={handleSubmit(handleSearch)}
          />
          <CustomButton
            text={"Clear"}
            variant={"outlined"}
            onClick={resetForm}
          />
        </Grid>
      </Grid>
      <Box mt={3}>
        <SearchTable
          tableData={tabelData}
          id={"id"}
          paginate={true}
          tableHeaders={tableHeads}
          actionButtons={actionButtons}
        />
      </Box>
    </>
  );
};
