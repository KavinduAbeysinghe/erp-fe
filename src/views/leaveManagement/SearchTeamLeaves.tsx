import { Grid } from "@mui/material";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import SearchTable from "../../components/tables/SearchTable";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import {
  faCircleCheck,
  faCircleXmark,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";
import { employees, leave } from "../../util";
import { CustomChip } from "../../components/chips/Chip";
import { calculateDateDifference } from "./SearchMyLeaves";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchTeamLeaves = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<Array<any>>([]);

  const teamLeaves = [
    {
      id: 1,
      empNo: "EMP001",
      name: "Alex Lee",
      leaveTypeId: 1,
      designation: "Senior Software Engineer",
      dateFrom: "2023-10-10",
      dateTo: "2023-10-12",
      days: 2,
      appliedDate: "2023-10-08",
      comments: "For a personal matter",
      coveringEmpId: 1,
      files: [require("../../assets/files/sample.pdf")],
    },
    {
      id: 1,
      empNo: "EMP001",
      name: "Alex Lee",
      leaveTypeId: 1,
      designation: "Senior Software Engineer",
      dateFrom: "2023-10-10",
      dateTo: "2023-10-12",
      days: 2,
      appliedDate: "2023-10-08",
      comments: "For a personal matter",
      coveringEmpId: 1,
      files: [require("../../assets/files/sample.pdf")],
    },
    {
      id: 1,
      empNo: "EMP001",
      name: "Alex Lee",
      leaveTypeId: 1,
      designation: "Senior Software Engineer",
      dateFrom: "2023-10-10",
      dateTo: "2023-10-12",
      days: 2,
      appliedDate: "2023-10-08",
      comments: "For a personal matter",
      coveringEmpId: 1,
      files: [require("../../assets/files/sample.pdf")],
    },
    {
      id: 1,
      empNo: "EMP001",
      name: "Alex Lee",
      leaveTypeId: 1,
      designation: "Senior Software Engineer",
      dateFrom: "2023-10-10",
      dateTo: "2023-10-12",
      days: 2,
      appliedDate: "2023-10-08",
      comments: "For a personal matter",
      coveringEmpId: 1,
      files: [require("../../assets/files/sample.pdf")],
    },
    {
      id: 1,
      empNo: "EMP001",
      name: "Alex Lee",
      leaveTypeId: 1,
      designation: "Senior Software Engineer",
      dateFrom: "2023-10-10",
      dateTo: "2023-10-12",
      days: 2,
      appliedDate: "2023-10-08",
      comments: "For a personal matter",
      coveringEmpId: 1,
      files: [require("../../assets/files/sample.pdf")],
    },
  ];

  const formatTableData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      empNo: d?.empNo,
      name: d?.name,
      dateFrom: d?.dateFrom,
      dateTo: d?.dateTo,
      days: d?.days,
      appliedDate: d?.appliedDate,
    }));
  };

  useLayoutEffect(() => {
    setTableData(formatTableData(teamLeaves));
  }, []);

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const handleSearch = () => {};

  const tableHeads = [
    "Emp No",
    "Name",
    "Date From",
    "Date To",
    "Days",
    "Applied Date",
  ];

  const handleViewLeave = (id: any) => {
    const teamLeave = { page: "TL-View", id: id };
    navigate(`/control/leave-management/team-leave?${searchParams}`);
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleViewLeave },
  ];

  return (
    <>
      <Grid container spacing={2} my={2} mb={5}>
        <Grid item xs={12} sm={12} md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Team member name"}
            options={[]}
            id={"Covering Employee"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Date From"}
            name={"dateFrom"}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Date To"}
            name={"dateTo"}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <CustomButton
            text={"Search"}
            variant={"contained"}
            onClick={handleSubmit(handleSearch)}
          />
        </Grid>
      </Grid>
      <SearchTable
        tableData={tableData}
        tableHeaders={tableHeads}
        id={"id"}
        paginate={true}
        actionButtons={actionButtons}
      />
    </>
  );
};
