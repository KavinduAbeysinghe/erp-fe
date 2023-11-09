import { Grid } from "@mui/material";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { useLayoutEffect, useState } from "react";
import { CustomButton } from "../../components/buttons/CustomButton";
import SearchTable from "../../components/tables/SearchTable";
import { empLeaves, employees, leave } from "../../util";
import dayjs from "dayjs";
import { CustomChip } from "../../components/chips/Chip";
import { useNavigate } from "react-router-dom";

// Function to calculate the difference in days between two dates
export function calculateDateDifference(
  dateStrA: string,
  dateStrB: string,
): number {
  // Convert date strings to Date objects
  const dateA: Date = new Date(dateStrA);
  const dateB: Date = new Date(dateStrB);

  // Calculate the difference in milliseconds
  const timeDifference: number = dateB.getTime() - dateA.getTime();

  // Convert milliseconds to days
  return Math.floor(timeDifference / (1000 * 3600 * 24));
}

export const SearchMyLeaves = () => {
  const navigate = useNavigate();

  const [myLeaveData, setMyLeaveData] = useState<Array<any>>([]);

  const formatData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      id: d?.id,
      dateFrom: d?.dateFrom,
      dateTo: d?.dateTo,
      appliedDate: d?.appliedDate,
      leaveType: leave?.find((l: any) => l?.value === d?.leaveTypeId)?.label,
      days: calculateDateDifference(d?.dateFrom, d?.dateTo),
      status:
        d?.status === "approved" ? (
          <CustomChip label={"Approved"} type={"success"} />
        ) : d?.status === "pending" ? (
          <CustomChip label={"Pending"} type={"warning"} />
        ) : (
          <CustomChip label={"Rejected"} type={"error"} />
        ),
      reason: d?.reason,
      coveringEmployee: employees?.find(
        (e: any) => e?.empId === d?.coveringEmployeeId,
      )?.name,
    }));
  };

  useLayoutEffect(() => {
    setMyLeaveData(formatData(empLeaves[0]?.leaves));
  }, []);

  const tableHeads = [
    "Date From",
    "Date To",
    "Applied Date",
    "Leave Type",
    "Days",
    "Status",
    "Reason",
    "Covering Employee",
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

  const status = [
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
  ];

  const handleSearch = (data: any) => {
    console.log(data);
  };

  const handleNavigateApplyLeave = () => {
    navigate("/control/leave-management/apply-leave");
  };

  return (
    <>
      <CustomButton
        text={"+ Apply Leave"}
        variant={"contained"}
        onClick={handleNavigateApplyLeave}
      />
      <Grid container spacing={2} my={2} mb={5}>
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
        <Grid item xs={12} sm={12} md={3}>
          <FormDropdown
            name={"status"}
            options={status}
            helperText={""}
            control={control}
            label={"Status"}
            labelId={"label-status"}
            error={false}
            fullWidth={true}
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
        tableData={myLeaveData}
        tableHeaders={tableHeads}
        id={"id"}
        paginate={true}
      />
    </>
  );
};
