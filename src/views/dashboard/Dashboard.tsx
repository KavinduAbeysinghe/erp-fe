import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, Fab, Grid, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/buttons/CustomButton";
import { DigitalClock } from "../../components/digitalClock/DigitalClock";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { Notice, NoticeIn } from "../../components/notices/Notice";
import BasicTabs from "../../components/tabs/BasicTabs";
import { RichTextEditor } from "../../components/textEditors/RichTextEditor";
import { OptionIn, employees } from "../../util";
import { MyAttendance } from "./MyAttendance";
import { MyLeaves } from "./MyLeaves";
import { TeamAttendance } from "./TeamAttendance";
import { TeamLeaves } from "./TeamLeaves";
import { CardTitleBadge } from "../../components/badges/CardTitleBadge";

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
      body: (
        <TeamAttendance control={control} setValue={setValue} watch={watch} />
      ),
    },
  ];

  const tabOptionsLeaves = [
    {
      title: "My Leaves",
      body: <MyLeaves />,
    },
    {
      title: "Team Leaves",
      body: <TeamLeaves control={control} setValue={setValue} watch={watch} />,
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
              (notice: any) => notice?.priority === filterNotice
            )
      );
    }
  }, [filterNotice]);

  const employeeName = watch("employeeName");

  useEffect(() => {
    if (employeeName) {
      setEmployeeDetails(
        employees?.filter((emp: any) => emp?.empId === employeeName)[0]
      );
    } else {
      setEmployeeDetails(null);
    }
  }, [employeeName]);

  const handleScrollTop = () => {};
  return (
    <Box>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={handleScrollTop}
      >
        {/* <a href="#hidden-anchor"> */}
        <ArrowUpwardIcon />
        {/* </a> */}
      </Fab>
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
      <Grid container rowSpacing={5} columnSpacing={2} mt={1}>
        <Grid item sm={12} md={4}>
          <Box
            component={Paper}
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            position={"relative"}
          >
            <CardTitleBadge title={"Notices"} />
            <Grid container mt={3}>
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
            position={"relative"}
            component={Paper}
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            gap={3}
          >
            <CardTitleBadge title={"Time Log"} />
            <Box p={2} mt={3} className={"time-log-container"}>
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
        <Grid item xs={12} sm={12} md={4}>
          <Grid container spacing={2} height={"100%"}>
            <Grid item xs={12} sm={12} md={12}>
              <Box
                component={Paper}
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
                    <Typography color={"text.secondary"} fontSize={"small"}>
                      Senior Software Engineer
                    </Typography>
                  </Box>
                </Box>
                <Box
                  flexGrow={1}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                    <Typography
                      fontSize={"small"}
                      fontWeight={500}
                      color={"text.secondary"}
                    >
                      Employee No:
                    </Typography>
                    <Typography
                      fontSize={"small"}
                      fontWeight={400}
                      color={"text.primary"}
                    >
                      002765
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                    <Typography
                      fontSize={"small"}
                      fontWeight={500}
                      color={"text.secondary"}
                    >
                      Designation:
                    </Typography>
                    <Typography
                      fontSize={"small"}
                      fontWeight={400}
                      color={"text.primary"}
                    >
                      Senior Software Engineer
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                    <Typography
                      fontSize={"small"}
                      fontWeight={500}
                      color={"text.secondary"}
                    >
                      Mobile:
                    </Typography>
                    <Typography
                      fontSize={"small"}
                      fontWeight={400}
                      color={"text.primary"}
                    >
                      +114-112-112-112
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                    <Typography
                      fontSize={"small"}
                      fontWeight={500}
                      color={"text.secondary"}
                    >
                      Email:
                    </Typography>
                    <Typography
                      fontSize={"small"}
                      fontWeight={400}
                      color={"text.primary"}
                    >
                      johnsmith@biznexa.com
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                    <Typography
                      fontSize={"small"}
                      fontWeight={500}
                      color={"text.secondary"}
                    >
                      Address:
                    </Typography>
                    <Typography
                      fontSize={"small"}
                      fontWeight={400}
                      color={"text.primary"}
                    >
                      No. 450, Peters Lane
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                }}
                className={"dash-card"}
                // p={3}
                display={"flex"}
                flexDirection={"column"}
                // gap={3}
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
                  zIndex={2}
                >
                  <Typography fontWeight={700} color={"text.dark"}>
                    Daily Quote
                  </Typography>
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
                    <Typography fontWeight={700} color={"text.dark"}>
                      - Helen Keller
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Box
            position={"relative"}
            component={Paper}
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <CardTitleBadge title={"Attendance"} />
            <Box mt={3} sx={{ height: "100%" }}>
              <BasicTabs options={tabOptions} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Box
            position={"relative"}
            component={Paper}
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
            height={"100%"}
          >
            <CardTitleBadge title={"Employee Directory"} />
            <Box
              mt={3}
              sx={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
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
                    mt={3}
                    alignItems={"center"}
                  >
                    <img
                      src={employeeDetails?.profileImg}
                      alt="emp-profile-img"
                      height={100}
                      width={100}
                      style={{ objectFit: "cover", borderRadius: "50%" }}
                    />
                    <Box>
                      <Typography
                        color={"text.primary"}
                        fontWeight={700}
                        fontSize={"large"}
                      >
                        {employeeDetails?.name}
                      </Typography>
                      <Typography fontSize={"small"} color={"text.secondary"}>
                        {employeeDetails?.designation}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={3}>
                      <Typography
                        fontSize={"small"}
                        fontWeight={500}
                        color={"text.secondary"}
                      >
                        Employee No:
                      </Typography>
                      <Typography
                        fontSize={"small"}
                        fontWeight={400}
                        color={"text.primary"}
                      >
                        {employeeDetails?.empNo}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                      <Typography
                        fontSize={"small"}
                        fontWeight={500}
                        color={"text.secondary"}
                      >
                        Designation:
                      </Typography>
                      <Typography
                        fontSize={"small"}
                        fontWeight={400}
                        color={"text.primary"}
                      >
                        {employeeDetails?.designation}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                      <Typography
                        fontSize={"small"}
                        fontWeight={500}
                        color={"text.secondary"}
                      >
                        Mobile:
                      </Typography>
                      <Typography
                        fontSize={"small"}
                        fontWeight={400}
                        color={"text.primary"}
                      >
                        {employeeDetails?.mobile}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                      <Typography
                        fontSize={"small"}
                        fontWeight={500}
                        color={"text.secondary"}
                      >
                        Email:
                      </Typography>
                      <Typography
                        fontSize={"small"}
                        fontWeight={400}
                        color={"text.primary"}
                      >
                        {employeeDetails?.email}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                      <Typography
                        fontSize={"small"}
                        fontWeight={500}
                        color={"text.secondary"}
                      >
                        Address:
                      </Typography>
                      <Typography
                        fontSize={"small"}
                        fontWeight={400}
                        color={"text.primary"}
                      >
                        {employeeDetails?.address}
                      </Typography>
                    </Stack>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography color={"text.secondary"} mt={3}>
                    Please select an employee to get details...
                  </Typography>
                  <Box
                    flexGrow={1}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <img
                      src={require("../../assets/images/empty-box.png")}
                      alt="empty-box"
                      height={200}
                      width={200}
                      style={{ objectFit: "contain" }}
                    />
                    <Typography textAlign={"center"} color={"text.secondary"}>
                      Noting to Show : )
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            position={"relative"}
            component={Paper}
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <CardTitleBadge title={"Leave Overview"} />
            <Box mt={3}>
              <BasicTabs options={tabOptionsLeaves} />
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={12}>
          <Box
            position={"relative"}
            component={Paper}
            className={"dash-card"}
            p={3}
            display={"flex"}
            flexDirection={"column"}
            gap={3}
          >
            <CardTitleBadge title={"Voice of Yours"} />
            <Box mt={3}>
              <Typography color={"text.secondary"} mb={3}>
                Hey it's your time to send us something on your mind ___ .
                <span>
                  <FontAwesomeIcon icon={faFeather} fontSize={"xx-large"} />
                </span>
              </Typography>
              <RichTextEditor />
              <Box
                mt={3}
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <CustomButton
                  text={"Send"}
                  variant="contained"
                  onClick={() => {}}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
