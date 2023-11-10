import { Box, Grid } from "@mui/material";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchTable from "../../components/tables/SearchTable";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { CustomChip } from "../../components/chips/Chip";
import { useNavigate } from "react-router-dom";

export const MyEvaluations = () => {
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

  const tableHeads = ["Eval ID", "Name", "Activity Name", "Date", "Status"];

  const handleViewEvaluation = () => {
    navigate("/control/evaluation-management/view-evaluation");
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleViewEvaluation },
  ];

  const tabelData = [
    {
      evalId: 1001,
      name: "Non-Management",
      activityName: "Non-Management Evaluation",
      date: "2023-05-05",
      status: <CustomChip label={"Open"} type={"success"} />,
    },
    {
      evalId: 1001,
      name: "Management",
      activityName: "Management Evaluation",
      date: "2023-02-05",
      status: <CustomChip label={"Closed"} type={"warning"} />,
    },
  ];

  return (
    <>
      <FormDropdown
        name={"filterYear"}
        options={dropdownOptions}
        label={"Year"}
        labelId={"filterYr-notice-label"}
        id={"filterYear"}
        helperText={""}
        control={control}
      />
      <Box mt={3}>
        <SearchTable
          tableData={tabelData}
          id={""}
          paginate={true}
          tableHeaders={tableHeads}
          actionButtons={actionButtons}
        />
      </Box>
    </>
  );
};
