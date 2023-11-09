import {
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import { useEffect, useLayoutEffect, useState } from "react";
import SearchTable from "../../components/tables/SearchTable";
import { CustomButton } from "../../components/buttons/CustomButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { currentUser } from "../../util";
import { useNotification } from "../../contexts/NotificationContext";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import LockResetIcon from "@mui/icons-material/LockReset";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import ArticleIcon from "@mui/icons-material/Article";
import { CustomModal } from "../../components/modals/CustomModal";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const Profile = () => {
  const notify = useNotification();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [currentUserDetails, setCurrentUserDetails] = useState<any>(null);

  useLayoutEffect(() => {
    setCurrentUserDetails(currentUser);
  }, []);

  const { register, setValue, handleSubmit } = useForm({});

  const {
    register: registerPF,
    setValue: setValuePF,
    handleSubmit: handlePFSubmit,
  } = useForm({});

  const getUserdetails = () => {
    setValue("fullName", currentUserDetails?.name);
    setValue("address", currentUserDetails?.address);
    setValue("email", currentUserDetails?.email);
    setValue("telephone", currentUserDetails?.telephone);
    setValue("mobile", currentUserDetails?.mobile);
  };

  const getPersonalDetails = () => {
    setValuePF("dob", currentUserDetails?.dob);
    setValuePF("nic", currentUserDetails?.nic);
    setValuePF("nationality", currentUserDetails?.nationality);
    setValuePF("religion", currentUserDetails?.religion);
    setValuePF("bloodGroup", currentUserDetails?.bloodGroup);
    setValuePF("civilStatus", currentUserDetails?.civilStatus);
    setValuePF("gender", currentUserDetails?.gender);
    setValuePF("personalEmail", currentUserDetails?.personalEmail);
  };

  useEffect(() => {
    if (currentUserDetails) {
      getUserdetails();
      getPersonalDetails();
    }
  }, [currentUserDetails]);

  const reportingDetailTableHeads = [
    "Type",
    "Name",
    "Position",
    "Telephone",
    "Mobile",
    "Email",
  ];

  const reportingDetailsTableData = [
    {
      type: "Direct",
      name: "Steven Lee",
      position: "Software Architect",
      telephone: "+112-112-112-112",
      mobile: "+112-112-122-112",
      email: "steven.l@biznexa.com",
    },
    {
      type: "Direct",
      name: "Mary Jane",
      position: "Technical Lead",
      telephone: "+112-112-112-112",
      mobile: "+112-112-122-112",
      email: "steven.l@biznexa.com",
    },
  ];

  const [isPFVisible, setIsPFVisible] = useState<boolean>(false);

  const handlePFEdit = () => {
    setIsPFVisible((prevState) => !prevState);
  };

  const [isGFVisible, setIsGFVisible] = useState<boolean>(false);

  const handleGFEdit = () => {
    setIsGFVisible((prevState) => !prevState);
  };

  const onPFSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      notify.success("Personal info successfully updated");
      setIsPFVisible(false);
      setShowBackdrop(false);
    }, 1000);
  };

  const onGFSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      notify.success("General info successfully updated");
      setIsGFVisible(false);
      setShowBackdrop(false);
    }, 1000);
  };

  return (
    <>
      <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={"Change Password"}
        body={<ChangePasswordForm setShowModal={setShowModal} />}
      />
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Grid container rowSpacing={5} columnSpacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            borderRadius={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            sx={{ backgroundColor: "white" }}
            className={"dash-card"}
            p={3}
            gap={3}
          >
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              gap={3}
              alignItems={"center"}
            >
              <img
                src={require("../../assets/images/person1.jpg")}
                alt="profile-img"
                style={{
                  height: "100px",
                  width: "100px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <Box>
                <Typography color={""} fontWeight={900} fontSize={"x-large"}>
                  John Smith
                </Typography>
                <Typography>Senior Software Engineer</Typography>
                <Typography>Research & Development</Typography>
              </Box>
            </Box>
            <Stack gap={2} direction={"row"} flexWrap={"wrap"}>
              <CustomButton
                fullWidth={false}
                text={"Resume"}
                variant={"outlined"}
                onClick={() => {}}
                startIcon={<ArticleIcon fontSize="small" />}
              />
              <CustomButton
                fullWidth={false}
                text={"Business Card"}
                variant={"outlined"}
                onClick={() => {}}
                startIcon={<ArticleIcon fontSize="small" />}
              />
              <CustomButton
                fullWidth={false}
                text={"Change Password"}
                variant={"outlined"}
                onClick={() => setShowModal(true)}
                startIcon={<LockResetIcon fontSize="small" />}
              />
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            position={"relative"}
            borderRadius={"10px"}
            display={"flex"}
            flexWrap={"wrap"}
            sx={{ backgroundColor: "white" }}
            className={"dash-card"}
            p={3}
            gap={3}
          >
            <Typography className={"card-title"}>General</Typography>
            <IconButton sx={{ mt: 2 }} onClick={handleGFEdit}>
              <EditNoteIcon />
            </IconButton>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <FormTextField
                  register={register("fullName")}
                  label={"Full Name"}
                  disabled={!isGFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormTextField
                  register={register("address")}
                  label={"Address"}
                  disabled={!isGFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={register("email")}
                  label={"Email"}
                  disabled={!isGFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={register("telephone")}
                  label={"Telephone"}
                  disabled={!isGFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={register("mobile")}
                  label={"Mobile"}
                  disabled={!isGFVisible}
                />
              </Grid>
              {isGFVisible && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  display={"flex"}
                  gap={2}
                  justifyContent={"end"}
                >
                  <CustomButton
                    fullWidth={false}
                    text={"Reset"}
                    variant={"outlined"}
                    onClick={() => getUserdetails()}
                  />
                  <CustomButton
                    fullWidth={false}
                    text={"Save"}
                    variant={"contained"}
                    onClick={handleSubmit(onGFSubmit)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            position={"relative"}
            borderRadius={"10px"}
            display={"flex"}
            flexWrap={"wrap"}
            sx={{ backgroundColor: "white" }}
            className={"dash-card"}
            p={3}
            gap={3}
          >
            <Typography className={"card-title"}>Personal Info</Typography>
            <IconButton sx={{ mt: 2 }} onClick={handlePFEdit}>
              <EditNoteIcon />
            </IconButton>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  type={"date"}
                  register={registerPF("dob")}
                  label={"Date of Birth"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("nic")}
                  label={"NIC/Passport No"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("nationality")}
                  label={"Nationality"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("religion")}
                  label={"Religion"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("bloodGroup")}
                  label={"Blood Group"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("civilStatus")}
                  label={"civilStatus"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("gender")}
                  label={"Gender"}
                  disabled={!isPFVisible}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <FormTextField
                  register={registerPF("personalEmail")}
                  label={"Personal Email"}
                  disabled={!isPFVisible}
                />
              </Grid>
              {isPFVisible && (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  display={"flex"}
                  gap={2}
                  justifyContent={"end"}
                >
                  <CustomButton
                    fullWidth={false}
                    text={"Reset"}
                    variant={"outlined"}
                    onClick={() => getPersonalDetails()}
                  />
                  <CustomButton
                    fullWidth={false}
                    text={"Save"}
                    variant={"contained"}
                    onClick={handlePFSubmit(onPFSubmit)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            position={"relative"}
            borderRadius={"10px"}
            display={"flex"}
            flexWrap={"wrap"}
            sx={{ backgroundColor: "white" }}
            className={"dash-card"}
            p={3}
            gap={3}
          >
            <Typography className={"card-title"}>
              Reporting Hierarchy
            </Typography>
            <Box mt={3} width={"100%"}>
              <SearchTable
                tableData={reportingDetailsTableData}
                tableHeaders={reportingDetailTableHeads}
                id={""}
                paginate={true}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
