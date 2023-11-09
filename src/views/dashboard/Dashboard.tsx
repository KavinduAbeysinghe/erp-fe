import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { DigitalClock } from "../../components/digitalClock/DigitalClock";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Notice, NoticeIn } from "../../components/notices/Notice";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { useForm } from "react-hook-form";
import { employees, OptionIn } from "../../util";
import { axisClasses, BarChart, PieChart } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";
import BasicTabs from "../../components/tabs/BasicTabs";
import { MyAttendance } from "./MyAttendance";
import { TeamAttendance } from "./TeamAttendance";
import { MyLeaves } from "./MyLeaves";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [filteredNoticeList, setFilteredNoticeList] = useState<Array<any>>([]);

  const [employeeDetails, setEmployeeDetails] = useState<any>(null);

  const noticeList: Array<NoticeIn> = [
    {
      priority: "high",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "medium",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "low",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "low",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
    {
      priority: "high",
      dateTime: "1 November 2023 @ 8 AM",
      title: "Complete all the remaining evaluations",
      description:
        "ALl the remaining evaluations need to be completed by 1 PM today",
    },
  ];

  const { setValue, control, watch } = useForm({});

  const noticeOptions: Array<OptionIn> = [
    { label: "All", value: "all" },
    { label: "High Priority", value: "high" },
    { label: "Medium Priority", value: "medium" },
    { label: "Low Priority", value: "low" },
  ];

  useEffect(() => {
    setValue("filterNotice", "all");
  }, []);

  const tabOptions = [
    {
      title: "My Attendance",
      body: (
        <MyAttendance watch={watch} control={control} setValue={setValue} />
      ),
    },
    {
      title: "Team Attendance",
      body: <TeamAttendance />,
    },
  ];

  const tabOptionsLeaves = [
    {
      title: "My Leaves",
      body: <MyLeaves />,
    },
    {
      title: "Team Leaves",
      body: <MyLeaves />,
    },
  ];

  const employeeOptions: Array<OptionIn> = employees?.map((e: any) => ({
    label: e?.name,
    value: e?.empId,
  }));

  const filterNotice = watch("filterNotice");

  useEffect(() => {
    if (filterNotice) {
      setFilteredNoticeList(
        filterNotice === "all"
          ? noticeList
          : noticeList?.filter(
              (notice: any) => notice?.priority === filterNotice,
            ),
      );
    }
  }, [filterNotice]);

  const employeeName = watch("employeeName");

  useEffect(() => {
    if (employeeName) {
      setEmployeeDetails(
        employees?.filter((emp: any) => emp?.empId === employeeName)[0],
      );
    } else {
      setEmployeeDetails(null);
    }
  }, [employeeName]);

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexWrap={"wrap"}
      >
        <Typography variant={"h4"} fontWeight={700}>
          Hello John!
        </Typography>
        <DigitalClock />
      </Box>
      <Grid container spacing={2} mt={1}>
        <Grid item sm={12} md={4}>
          <Box
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Typography fontWeight={700} color={"primary"}>
              Notices
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={12} md={4} lg={3}>
                <FormDropdown
                  name={"filterNotice"}
                  options={noticeOptions}
                  label={"Filter"}
                  labelId={"filter-notice-label"}
                  id={"filterNotice"}
                  helperText={""}
                  control={control}
                />
              </Grid>
            </Grid>
            <Box sx={{ height: "350px", overflow: "auto" }}>
              <Notice options={filteredNoticeList} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            // justifyContent={"space-between"}
            gap={3}
          >
            <Typography fontWeight={700} color={"primary"}>
              Time Log
            </Typography>
            <Box p={2} className={"time-log-container"}>
              <Typography fontWeight={700}>Punch in at</Typography>
              <Typography color={"text.secondary"}>
                30<sup>th</sup> November 2023 8 AM
              </Typography>
            </Box>
            <Typography
              fontWeight={900}
              fontSize={"xxx-large"}
              textAlign={"center"}
            >
              4.5 hrs
            </Typography>
            <CustomButton text={"Punch Out"} variant={"contained"} />
            <Box>
              <hr />
              <Grid container>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography color={"text.secondary"}>Break</Typography>
                  <Typography color={"text.secondary"}>1.5 hrs</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography color={"text.secondary"}>Overtime</Typography>
                  <Typography color={"text.secondary"}>3.5 hrs</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={4}>
          <Grid container spacing={2} height={"100%"}>
            <Grid item sm={12} md={12}>
              <Box
                className={"dash-card"}
                p={3}
                display={"flex"}
                flexDirection={"column"}
                gap={3}
              >
                <Box
                  display={"flex"}
                  gap={2}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                >
                  <img
                    src={require("../../assets/images/person1.jpg")}
                    alt="profile-img"
                    height={100}
                    width={100}
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                  <Box>
                    <Typography fontWeight={700} fontSize={"large"}>
                      John Smith
                    </Typography>
                    <Typography>Senior Software Engineer</Typography>
                  </Box>
                </Box>
                <Box
                  flexGrow={1}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <Typography fontWeight={500}>
                    Employee Number:{" "}
                    <span style={{ fontWeight: 400 }}>002765</span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Designation:{" "}
                    <span style={{ fontWeight: 400 }}>
                      Senior Software Engineer
                    </span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Mobile:{" "}
                    <span style={{ fontWeight: 400 }}>+114-112-112-112</span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Email:{" "}
                    <span style={{ fontWeight: 400 }}>
                      johnsmith@biznexa.com
                    </span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Address:{" "}
                    <span style={{ fontWeight: 400 }}>
                      No. 450, Peters Lane
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} md={12}>
              <Box
                className={"dash-card"}
                // p={3}
                display={"flex"}
                flexDirection={"column"}
                // gap={3}
                sx={{ position: "relative" }}
              >
                <img
                  className={"daily-quote-img"}
                  src={require("../../assets/images/profileCover.jpeg")}
                  alt="daily-quote-bg-img"
                />
                <Box
                  p={3}
                  color={"white"}
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ height: "100%" }}
                >
                  <Typography fontWeight={700}>Daily Quote</Typography>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={3}
                    justifyContent={"center"}
                    flexGrow={1}
                    mt={3}
                  >
                    <Typography fontStyle={"italic"}>
                      The best and most beautiful things in the world cannot be
                      seen or even touched - they must be felt with the heart.
                    </Typography>
                    <Typography fontWeight={700}>- Helen Keller</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={12} md={8}>
          <Box
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Typography fontWeight={700} color={"primary"}>
              Attendance
            </Typography>
            <BasicTabs options={tabOptions} />
          </Box>
        </Grid>
        <Grid item sm={12} md={4}>
          <Box
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Typography fontWeight={700} color={"primary"}>
              Employee Directory
            </Typography>
            <FormAutocomplete
              error={false}
              helperText={""}
              setValue={setValue}
              label={"Employee Name"}
              options={employeeOptions}
              id={"employeeName"}
              required={false}
              disabled={false}
              control={control}
              watch={watch}
            />
            {employeeDetails ? (
              <>
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  gap={2}
                  alignItems={"center"}
                >
                  <img
                    src={require("../../assets/images/person1.jpg")}
                    alt="emp-profile-img"
                    height={100}
                    width={100}
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                  <Box>
                    <Typography fontWeight={700} fontSize={"large"}>
                      {employeeDetails?.name}
                    </Typography>
                    <Typography>{employeeDetails?.designation}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography fontWeight={500}>
                    Employee Number:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {employeeDetails?.empNo}
                    </span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Designation:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {employeeDetails?.designation}
                    </span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Mobile:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {employeeDetails?.mobile}
                    </span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Email:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {employeeDetails?.email}
                    </span>
                  </Typography>
                  <Typography fontWeight={500}>
                    Address:{" "}
                    <span style={{ fontWeight: 400 }}>
                      {employeeDetails?.address}
                    </span>
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography>Please select an employee to get details</Typography>
            )}
          </Box>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <Typography fontWeight={700} color={"primary"}>
              Leave Overview
            </Typography>
            <BasicTabs options={tabOptionsLeaves} />
          </Box>
        </Grid>
        {/*<Grid item sm={12} md={4}>*/}
        {/*  <Box*/}
        {/*    className={"dash-card"}*/}
        {/*    p={3}*/}
        {/*    display={"flex"}*/}
        {/*    flexDirection={"column"}*/}
        {/*    gap={3}*/}
        {/*  >*/}
        {/*    <Typography fontWeight={700} color={"primary"}>*/}
        {/*      Voice of Yours*/}
        {/*    </Typography>*/}
        {/*  </Box>*/}
        {/*</Grid>*/}
      </Grid>
    </Box>
  );
};
