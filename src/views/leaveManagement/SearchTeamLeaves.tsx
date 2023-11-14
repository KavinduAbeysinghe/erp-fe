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
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";

export const SearchTeamLeaves = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const navigate = useNavigate();

  const [tableData, setTableData] = useState<Array<any>>([]);

  const formatTableData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      empNo: d?.empNo,
      name: <EmployeeColumn id={d?.empId} />,
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
    "Team Member",
    "Date From",
    "Date To",
    "Days",
    "Applied Date",
  ];

  const handleViewLeave = (id: any) => {
    const teamLeave = { page: "view", id: id };
    searchParams.set("teamLeave", JSON.stringify(teamLeave));
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

export const teamLeaves = [
  {
    id: 1,
    empId: 1,
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
    approver: 2,
    files: [require("../../assets/files/sample.pdf")],
  },
  {
    id: 1,
    empId: 2,
    empNo: "EMP002",
    name: "Alex Lee",
    leaveTypeId: 1,
    designation: "Senior Software Engineer",
    dateFrom: "2023-10-10",
    dateTo: "2023-10-12",
    days: 2,
    appliedDate: "2023-10-08",
    comments: "For a personal matter",
    coveringEmpId: 1,
    approver: 2,
    files: [require("../../assets/files/sample.pdf")],
  },
  {
    id: 1,
    empId: 3,
    empNo: "EMP003",
    name: "Alex Lee",
    leaveTypeId: 1,
    designation: "Senior Software Engineer",
    dateFrom: "2023-10-10",
    dateTo: "2023-10-12",
    days: 2,
    appliedDate: "2023-10-08",
    comments: "For a personal matter",
    coveringEmpId: 1,
    approver: 1,
    files: [require("../../assets/files/sample.pdf")],
  },
  {
    id: 1,
    empId: 4,
    empNo: "EMP004",
    name: "Alex Lee",
    leaveTypeId: 1,
    designation: "Senior Software Engineer",
    dateFrom: "2023-10-10",
    dateTo: "2023-10-12",
    days: 2,
    appliedDate: "2023-10-08",
    comments: "For a personal matter",
    coveringEmpId: 1,
    approver: 2,
    files: [require("../../assets/files/sample.pdf")],
  },
  {
    id: 1,
    empId: 5,
    empNo: "EMP005",
    name: "Alex Lee",
    leaveTypeId: 1,
    designation: "Senior Software Engineer",
    dateFrom: "2023-10-10",
    dateTo: "2023-10-12",
    days: 2,
    appliedDate: "2023-10-08",
    comments: "For a personal matter",
    coveringEmpId: 1,
    approver: 2,
    files: [require("../../assets/files/sample.pdf")],
  },
];
