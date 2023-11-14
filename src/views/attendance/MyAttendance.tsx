import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { useForm } from "react-hook-form";
import { CustomButton } from "../../components/buttons/CustomButton";
import SearchTable from "../../components/tables/SearchTable";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { TopCardAttendance } from "./TopCardAttendance";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { CustomModal } from "../../components/modals/CustomModal";
import { useEffect, useLayoutEffect, useState } from "react";
import { MyAttendanceForm } from "./MyAttendanceForm";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { getFormattedDate } from "../../util";
import InfoIcon from "@mui/icons-material/Info";
import { InnerModal } from "../../components/modals/InnerModal";

export const MyAttendance = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [myAttendanceData, setMyAttendanceData] = useState<Array<any>>([]);

  const [topCardsData, setTopCardsData] = useState<any>(null);

  const [id, setId] = useState<any>("");

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
      id: 1,
      sNo: 1001,
      date: "2023-11-01",
      production: 8.5,
      punchIn: "",
      punchOut: "",
      break: "",
      overtime: "",
      isIncompleted: true,
    },
    {
      id: 2,
      sNo: 1002,
      date: "2023-11-02",
      production: 8.5,
      punchIn: "08:00",
      punchOut: "17:00",
      break: "1.5 hrs",
      overtime: 2.5,
      isIncompleted: false,
    },
    {
      id: 3,
      sNo: 1003,
      date: "2023-11-03",
      production: 8.5,
      punchIn: "08:00",
      punchOut: "17:00",
      break: "1.5 hrs",
      overtime: 2.5,
      isIncompleted: false,
    },
    {
      id: 4,
      sNo: 1004,
      date: "2023-11-04",
      production: 8.5,
      punchIn: "08:00",
      punchOut: "17:00",
      break: "1.5 hrs",
      overtime: 2.5,
      isIncompleted: false,
    },
    {
      id: 5,
      sNo: 1005,
      date: "2023-11-05",
      production: 8.5,
      punchIn: "08:00",
      punchOut: "17:00",
      break: "1.5 hrs",
      overtime: 2.5,
      isIncompleted: false,
    },
  ];

  const getInitialData = () => {
    setMyAttendanceData(tableData);
    setTopCardsData(getTopCardData(tableData));
  };

  useLayoutEffect(() => {
    getInitialData();
  }, []);

  const { setValue, control, handleSubmit, reset } = useForm({});

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
      totalHours: totalHours?.toFixed(2),
      averageHours: averageHours?.toFixed(2),
      overtimeHours: overtimeHours?.toFixed(2),
    };
  };

  const onSearch = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      const dateFrom = getFormattedDate(data?.dateFrom);
      const dateTo = getFormattedDate(data?.dateTo);
      let filteredData = [];
      if (dateTo && dateFrom) {
        filteredData = myAttendanceData?.filter((d: any) => {
          const dateFromSD = new Date(dateFrom);
          const dateToSD = new Date(dateTo);
          const date = new Date(d?.date);
          return dateFromSD <= date && date <= dateToSD;
        });
      } else if (dateFrom && !dateTo) {
        filteredData = myAttendanceData?.filter((d: any) => {
          const dateFromSD = new Date(dateFrom);
          const date = new Date(d?.date);
          return dateFromSD <= date;
        });
      } else if (!dateFrom && dateTo) {
        filteredData = myAttendanceData?.filter((d: any) => {
          const dateToSD = new Date(dateTo);
          const date = new Date(d?.date);
          return dateToSD >= date;
        });
      } else {
        filteredData = myAttendanceData;
      }
      setMyAttendanceData(filteredData);
      setTopCardsData(getTopCardData(filteredData));
      setShowBackdrop(false);
    }, 1000);
  };

  const resetForm = () => {
    setShowBackdrop(true);
    setTimeout(() => {
      reset({});
      setValue("dateFrom", "");
      setValue("dateTo", "");
      getInitialData();
      setShowBackdrop(false);
    }, 1000);
  };

  const handleEditEntry = (sNo: any) => {
    setId(sNo);
    setShowModal(true);
  };

  const actionButtons = [
    { tooltip: "Edit", icon: faClock, handleClick: handleEditEntry },
  ];

  useEffect(() => {
    setTopCardsData(getTopCardData(myAttendanceData));
  }, [myAttendanceData]);

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"md"}
        title={"Mark Attendance"}
        body={
          <MyAttendanceForm
            setMyAttendanceData={setMyAttendanceData}
            handleModalClose={() => setShowModal(false)}
            id={id}
          />
        }
      />
      <Grid container spacing={2} mt={1}>
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
      <Grid container spacing={2} mt={3} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance
            title="Your Total Days"
            value={topCardsData?.totalDays}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance
            title="Your Total Hours"
            value={topCardsData?.totalHours}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance
            title="Average Hours"
            value={topCardsData?.averageHours}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance
            title="Overtime Hours"
            value={topCardsData?.overtimeHours}
          />
        </Grid>
      </Grid>
      {/* <Tooltip
        title={"Incomplete attendance entries are highlited in red!"}
        placement="right"
      >
        <InfoIcon
          fontSize="small"
          sx={{ color: "gray", textAlign: "end", mb: 1 }}
        />
      </Tooltip> */}
      <SearchTable
        tableData={myAttendanceData}
        tableHeaders={tableHeads}
        id={"id"}
        paginate={true}
        actionButtons={actionButtons}
        isAttendance={true}
      />
    </>
  );
};
