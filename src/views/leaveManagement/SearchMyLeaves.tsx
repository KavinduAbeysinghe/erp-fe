import { Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { CustomChip } from "../../components/chips/Chip";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import SearchTable from "../../components/tables/SearchTable";
import { empLeaves, leave } from "../../util";

// Function to calculate the difference in days between two dates
export function calculateDateDifference(
  dateStrA: string,
  dateStrB: string
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

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

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
      coveringEmployee: <EmployeeColumn id={d?.coveringEmployeeId} />,
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

  const { setValue, control, handleSubmit } = useForm({});

  const status = [
    { label: "Approved", value: "approved" },
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "rejected" },
  ];

  const handleSearch = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      const dateFrom = data?.dateFrom;
      const dateTo = data?.dateTo;
      const status = data?.status;

      const mainArray = empLeaves[0]?.leaves;

      const filteredArray = mainArray.filter((item) => {
        const dateFromMatch = dateFrom
          ? new Date(item?.dateFrom) >= new Date(dateFrom)
          : true;
        const dateToMatch = dateTo
          ? new Date(item?.dateTo) <= new Date(dateTo)
          : true;
        const statusMatch = status ? item?.status === status : true;
        return dateFromMatch && dateToMatch && statusMatch;
      });

      setMyLeaveData(formatData(filteredArray));

      // console.log(dateFrom, dateTo, status);

      // let filteredData: Array<any> = [];
      // if (dateFrom && dateTo && status) {
      //   filteredData = empLeaves[0]?.leaves?.filter((l: any) => {
      //     const dateF = new Date(l?.dateFrom);
      //     const dateT = new Date(l?.dateTo);
      //     return dateF >= dateFrom && dateT <= dateTo && l?.status === status;
      //   });
      // }
      // setMyLeaveData(formatData(filteredData));
      setShowBackdrop(false);
    }, 1000);
  };

  const resetForm = () => {
    setShowBackdrop(true);
    setTimeout(() => {
      setValue("dateFrom", "");
      setValue("dateTo", "");
      setValue("status", "");
      setMyLeaveData(formatData(empLeaves[0]?.leaves));
      setShowBackdrop(false);
    }, 1000);
  };

  const handleNavigateApplyLeave = () => {
    navigate("/control/leave-management/apply-leave");
  };

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <CustomButton
        text={"+ Apply Leave"}
        variant={"contained"}
        onClick={handleNavigateApplyLeave}
      />
      <Grid container spacing={2} my={2} mb={5}>
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
            label={"Date To"}
            name={"dateTo"}
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
      <SearchTable
        tableData={myLeaveData}
        tableHeaders={tableHeads}
        id={"id"}
        paginate={true}
      />
    </>
  );
};
