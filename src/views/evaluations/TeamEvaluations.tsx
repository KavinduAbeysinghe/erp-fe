import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Box, Grid } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { CustomChip } from "../../components/chips/Chip";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import SearchTable from "../../components/tables/SearchTable";
import { employees, teamEvaluationData } from "../../util";

export const TeamEvaluations = () => {
  const navigate = useNavigate();

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [teamEvalData, setTeamEvalData] = useState<Array<any>>([]);

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
    "Description",
    "Date",
    "Status",
  ];

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const handleViewEvaluation = (id: any) => {
    const data = teamEvaluationData?.find((d: any) => d?.id === id);
    const evaluation = { type: data?.type, id: id };
    searchParams.set("eval", JSON.stringify(evaluation));
    navigate(
      `/control/evaluation-management/view-team-evaluation?${searchParams}`
    );
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleViewEvaluation },
  ];

  const formatData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      evalId: d?.evalId,
      type: d?.type,
      name: d?.name,
      teamMember: <EmployeeColumn id={d?.teamMember} />,
      description: d?.description,
      date: d?.date,
      status:
        d?.status === "completed" ? (
          <CustomChip label={"Completed"} type="success" />
        ) : (
          <CustomChip label={"Draft"} type="warning" />
        ),
    }));
  };

  useLayoutEffect(() => {
    setTeamEvalData(formatData(teamEvaluationData));
  }, []);

  const handleSearch = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      const payload = {
        year: data?.filterYear,
        evaluationName: data?.evaluationName,
        teamMember: data?.teamMember,
        status: data?.status,
      };
      const filteredArray = teamEvaluationData?.filter((item) => {
        const yearMatches = payload?.year ? payload?.year === item?.year : true;
        const evalNameMatches = payload?.evaluationName
          ? payload?.evaluationName === item?.name
          : true;
        const teamMemberMatches = payload?.teamMember
          ? payload?.teamMember === item?.teamMember
          : true;
        const statusMatches = payload?.status
          ? payload?.status === item?.status
          : true;
        return (
          yearMatches && evalNameMatches && teamMemberMatches && statusMatches
        );
      });
      setTeamEvalData(formatData(filteredArray));
      setShowBackdrop(false);
    }, 1000);
    // const filteredData =
  };

  const resetForm = () => {
    reset();
    setValue("filterYear", 2023);
    setTeamEvalData(formatData(teamEvaluationData));
  };

  const evalNameList = () => {
    const names = teamEvaluationData?.map((d: any) => d?.name);
    const removedDupNames = Array.from(new Set(names));
    return removedDupNames?.map((n: any) => ({ label: n, value: n }));
  };

  const teamMemberList = employees?.map((e: any) => ({
    label: e?.name,
    value: e?.empId,
  }));

  const statusList = [
    { label: "Completed", value: "completed" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
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
            options={evalNameList()}
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
            options={teamMemberList}
            id={"teamMember"}
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
            options={statusList}
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
          tableData={teamEvalData}
          id={"id"}
          paginate={true}
          tableHeaders={tableHeads}
          actionButtons={actionButtons}
        />
      </Box>
    </>
  );
};
