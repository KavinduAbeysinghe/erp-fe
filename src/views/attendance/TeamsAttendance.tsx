import { Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import SearchTable from "../../components/tables/SearchTable";
import { employees } from "../../util";
import { TopCardAttendance } from "./TopCardAttendance";

export const TeamsAttendance = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [teamAttendanceData, setTeamAttendance] = useState<Array<any>>([]);

  const [teamMemberData, setTeamMemberData] = useState<Array<any>>([]);

  const [topCardsData, setTopCardsData] = useState<any>(null);

  const tableHeads = [
    "S.No",
    "Emp No",
    "Team Member",
    "Date",
    "Production",
    "Punch In",
    "Punch Out",
    "Break",
    "Overtime",
  ];

  const formatData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      sNo: d?.sNo,
      empNo: employees?.find((e: any) => e?.empId === d?.empId)?.empNo,
      name: <EmployeeColumn id={d?.empId} />,
      date: d?.date,
      production: d?.production,
      punchIn: d?.punchIn,
      punchOut: d?.punchOut,
      break: d?.break,
      overtime: d?.overtime,
    }));
  };

  const tableData = [
    {
      sNo: 1005,
      date: "2023-11-05",
      production: 8.5,
      empId: 5,
      punchIn: "08:30",
      punchOut: "17:30",
      break: "1.5 hrs",
      overtime: 2.5,
    },
    {
      sNo: 1004,
      date: "2023-11-04",
      production: 8.5,
      empId: 4,
      punchIn: "08:30",
      punchOut: "17:30",
      break: "1.5 hrs",
      overtime: 2.5,
    },
    {
      sNo: 1003,
      date: "2023-11-03",
      production: 8.5,
      empId: 3,
      punchIn: "08:30",
      punchOut: "17:30",
      break: "1.5 hrs",
      overtime: 2.5,
    },
    {
      sNo: 1002,
      date: "2023-11-02",
      production: 8.5,
      empId: 2,
      punchIn: "08:30",
      punchOut: "17:30",
      break: "1.5 hrs",
      overtime: 2.5,
    },
    {
      sNo: 1001,
      date: "2023-11-01",
      production: 8.5,
      empId: 1,
      punchIn: "08:30",
      punchOut: "17:30",
      break: "1.5 hrs",
      overtime: 2.5,
    },
  ];

  useLayoutEffect(() => {
    setTeamAttendance(formatData(tableData));
    setTeamMemberData(
      employees?.map((e: any) => ({ label: e?.name, value: e?.empId }))
    );
  }, []);

  const { setValue, watch, control, handleSubmit, reset } = useForm({});

  const getTopCardData = (data: Array<any>) => {
    const actives = data?.filter((d: any) => d?.punchIn && d?.punchOut);
    const totalDays = actives?.length;
    let totalHours = 0;
    actives?.forEach((d: any) => {
      if (d?.production) totalHours += d?.production;
    });
    const averageHours = totalHours / totalDays;
    let overtimeHours = 0;
    actives?.forEach((d: any) => {
      if (d?.overtime) overtimeHours += d?.overtime;
    });
    return {
      totalDays: totalDays,
      totalHours: totalHours,
      averageHours: averageHours,
      overtimeHours: overtimeHours,
    };
  };

  const onSearch = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      // console.log(data);
      // const empId = data?.teamMemberName;
      // const dateFrom = data?.dateFrom;
      // const dateTo = data?.dateTo;
      const payload = {
        empId: data?.teamMemberName,
        dateFrom: data?.dateFrom,
        dateTo: data?.dateTo,
      };
      const filteredArray = tableData.filter((item) => {
        const isEmpIdMatch = payload.empId
          ? item.empId === payload.empId
          : true;

        const isDateFromMatch = payload.dateFrom
          ? new Date(item.date) >= new Date(payload.dateFrom)
          : true;

        const isDateToMatch = payload.dateTo
          ? new Date(item.date) <= new Date(payload.dateTo)
          : true;

        // Add other conditions as needed

        // Combine all conditions using logical AND
        return isEmpIdMatch && isDateFromMatch && isDateToMatch /* && ... */;
      });

      // Do something with the filteredArray, e.g., update state in your component
      console.log(filteredArray);

      setTeamAttendance(formatData(filteredArray));
      setTopCardsData(getTopCardData(filteredArray));

      // console.log(nonNullData);

      // let filteredData: any[] = [];
      // if (empId && dateFrom && dateTo) {
      //   filteredData = tableData?.filter((d: any) => {
      //     const date = new Date(d?.date);
      //     return empId === d?.empId && date >= dateFrom && date <= dateTo;
      //   });
      // }
      // setTeamAttendance(formatData(filteredData));
      // setTopCardsData(getTopCardData(filteredData));
      setShowBackdrop(false);
    }, 1000);
  };

  const resetForm = () => {
    setShowBackdrop(true);
    setTimeout(() => {
      reset({});
      setTopCardsData(null);
      setValue("teamMemberName", "");
      setValue("dateFrom", "");
      setValue("dateTo", "");
      setTeamAttendance(formatData(tableData));
      setShowBackdrop(false);
    }, 1000);
  };

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Grid container spacing={2} mt={1} mb={5}>
        <Grid item xs={12} sm={12} md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Team Member Name"}
            options={teamMemberData}
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
            label={"Date To"}
            name={"dateTo"}
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
            onClick={resetForm}
          />
        </Grid>
      </Grid>
      {topCardsData && (
        <Grid container spacing={2} mb={5}>
          <Grid item xs={12} sm={6} md={3}>
            <TopCardAttendance
              value={topCardsData?.totalDays}
              title={"Total Days"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TopCardAttendance
              value={topCardsData?.totalHours}
              title={"Total Hours"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TopCardAttendance
              value={topCardsData?.averageHours}
              title={"Average Hours"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TopCardAttendance
              value={topCardsData?.overtimeHours}
              title={"Overtime"}
            />
          </Grid>
        </Grid>
      )}
      <SearchTable
        tableData={teamAttendanceData}
        tableHeaders={tableHeads}
        id={""}
        paginate={true}
      />
    </>
  );
};
