import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { DigitalClock } from "../../components/digitalClock/DigitalClock";
import React, { useEffect, useLayoutEffect } from "react";
import { Notice, NoticeIn } from "../../components/notices/Notice";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { useForm } from "react-hook-form";
import { OptionIn } from "../../util";
import { axisClasses, BarChart, PieChart } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/models/helpers";
import { BarSeriesType } from "@mui/x-charts/models/seriesType/bar";
import BasicTabs from "../../components/tabs/BasicTabs";
import { MyAttendance } from "./MyAttendance";
import { TeamAttendance } from "./TeamAttendance";

export const Dashboard = () => {
  const navigate = useNavigate();

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

  const { setValue, control } = useForm({});

  const noticeOptions: Array<OptionIn> = [
    { label: "All", value: 1 },
    { label: "High Priority", value: 2 },
    { label: "Medium Priority", value: 3 },
    { label: "Low Priority", value: 4 },
  ];

  useEffect(() => {
    setValue("filterNotice", 1);
  }, []);

  const tabOptions = [
    {
      title: "My Attendance",
      body: <MyAttendance />,
    },
    {
      title: "Team Attendance",
      body: <TeamAttendance />,
    },
  ];

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h4"} fontWeight={700}>
          Hello John!
        </Typography>
        <DigitalClock />
      </Box>
      <Grid container spacing={2} mt={5}>
        <Grid item sm={12} md={8}>
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
            <FormDropdown
              name={"filterNotice"}
              options={noticeOptions}
              label={"Filter"}
              labelId={"filter-notice-label"}
              id={"filterNotice"}
              helperText={""}
              control={control}
            />
            <Box sx={{}}>
              <Notice options={noticeList} />
            </Box>
          </Box>
        </Grid>
        {/*<Grid item sm={12} md={4}>*/}
        {/*  <Box*/}
        {/*    className={"dash-card"}*/}
        {/*    p={3}*/}
        {/*    display={"flex"}*/}
        {/*    flexDirection={"column"}*/}
        {/*    gap={3}*/}
        {/*  ></Box>*/}
        {/*</Grid>*/}
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
            <FormDropdown
              name={"employee"}
              options={[]}
              helperText={""}
              control={control}
              label={"Employee Name"}
            />
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <img
                src={require("../../assets/images/person1.jpg")}
                alt="emp-profile-img"
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
            <Box>
              <Typography fontWeight={500}>
                Employee Number: <span style={{ fontWeight: 400 }}>002765</span>
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
                <span style={{ fontWeight: 400 }}>johnsmith@biznexa.com</span>
              </Typography>
              <Typography fontWeight={500}>
                Address:{" "}
                <span style={{ fontWeight: 400 }}>No. 450, Peters Lane</span>
              </Typography>
            </Box>
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
              Leave Overview
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
