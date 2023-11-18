import ArticleIcon from "@mui/icons-material/Article";
import EditNoteIcon from "@mui/icons-material/EditNote";
import LockResetIcon from "@mui/icons-material/LockReset";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormTextField } from "../../components/inputs/FormTextField";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";
import { InnerModal } from "../../components/modals/InnerModal";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import SearchTable from "../../components/tables/SearchTable";
import { useNotification } from "../../contexts/NotificationContext";
import { civilStatuses, currentUser, employees, genders } from "../../util";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const Profile = () => {
  const [showDocModal, setShowDocModal] = useState<boolean>(false);

  const [docDetails, setDocDetails] = useState<any>(null);

  const notify = useNotification();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [currentUserDetails, setCurrentUserDetails] = useState<any>(null);

  const [reportingEmpList, setReportingEmpList] = useState<Array<any>>([]);

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
    setValuePF(
      "civilStatus",
      civilStatuses?.find(
        (g: any) => g?.value === currentUserDetails?.civilStatus
      )?.label
    );
    setValuePF(
      "gender",
      genders?.find((g: any) => g?.value === currentUserDetails?.gender)?.label
    );
    setValuePF("personalEmail", currentUserDetails?.personalEmail);
  };

  const getReportingDetails = () => {
    setReportingEmpList(
      currentUserDetails?.reportingEmployees?.map((e: any) => {
        const emp = employees?.find((d: any) => d?.empId === e?.empId);
        if (emp) {
          return {
            empNo: emp?.empNo,
            name: <EmployeeColumn id={emp?.empId} />,
            email: emp?.personalEmail,
            telephone: emp?.telephone,
            mobile: emp?.mobile,
          };
        }
      })
    );
  };

  useEffect(() => {
    if (currentUserDetails) {
      getUserdetails();
      getPersonalDetails();
      getReportingDetails();
    }
  }, [currentUserDetails]);

  const reportingDetailTableHeads = [
    "Emp No",
    "Name",
    "Email",
    "Telephone",
    "Mobile",
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

  const handleDocPreview = (isResume: boolean) => {
    if (isResume) {
      setDocDetails({
        title: "Resume",
        docType: "application/pdf",
        doc: require("../../assets/files/sample.pdf"),
      });
    } else {
      setDocDetails({
        title: "Business Card",
        docType: "application/pdf",
        doc: require("../../assets/files/sample.pdf"),
      });
    }
    setShowDocModal(true);
  };

  return (
    <>
      <DocPreviewModal
        open={showDocModal}
        setOpen={setShowDocModal}
        maxWidth={"lg"}
        doc={docDetails?.doc}
        docType={docDetails?.docType}
        title={"Resume"}
      />
      <InnerModal
        open={showModal}
        setOpen={setShowModal}
        maxWidth={"sm"}
        title={"Change Password"}
        body={<ChangePasswordForm setShowModal={setShowModal} />}
      />
      {/* <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={"Change Password"}
        body={<ChangePasswordForm setShowModal={setShowModal} />}
      /> */}
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Grid container rowSpacing={5} columnSpacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Box
            component={Paper}
            borderRadius={"10px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            // sx={{ backgroundColor: "white" }}
            // className={"dash-card"}
            p={3}
            gap={3}
          >
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              gap={3}
              alignItems={"center"}
            >
              <Avatar
                alt="Remy Sharp"
                src={currentUserDetails?.profileImg}
                sx={{ width: 100, height: 100 }}
              />

              <Box>
                <Typography
                  color={"text.primary"}
                  fontWeight={900}
                  fontSize={"x-large"}
                >
                  {currentUserDetails?.name}
                </Typography>
                <Typography color={"text.secondary"}>
                  {currentUserDetails?.designation}
                </Typography>
                <Typography color={"text.secondary"}>
                  {currentUserDetails?.department}
                </Typography>
              </Box>
            </Box>
            <Stack gap={2} direction={"row"} flexWrap={"wrap"}>
              <CustomButton
                fullWidth={false}
                text={"Resume"}
                variant={"outlined"}
                onClick={() => handleDocPreview(true)}
                startIcon={<ArticleIcon fontSize="small" />}
              />
              <CustomButton
                fullWidth={false}
                text={"Business Card"}
                variant={"outlined"}
                onClick={() => handleDocPreview(false)}
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
            component={Paper}
            position={"relative"}
            borderRadius={"10px"}
            display={"flex"}
            flexWrap={"wrap"}
            // sx={{ backgroundColor: "white" }}
            // className={"dash-card"}
            p={3}
            gap={3}
          >
            <Typography
              className="card-heading"
              fontWeight={700}
              color={"#fff"}
              sx={{
                backgroundColor: "primary.dark",
                position: "absolute",
                mt: -5.5,
                px: 3,
                borderRadius: "7px",
                py: 1,
              }}
            >
              General
            </Typography>
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
            component={Paper}
            position={"relative"}
            borderRadius={"10px"}
            display={"flex"}
            flexWrap={"wrap"}
            // sx={{ backgroundColor: "white" }}
            // className={"dash-card"}
            p={3}
            gap={3}
          >
            <Typography
              className="card-heading"
              fontWeight={700}
              color={"#fff"}
              sx={{
                backgroundColor: "primary.dark",
                position: "absolute",
                mt: -5.5,
                px: 3,
                borderRadius: "7px",
                py: 1,
              }}
            >
              Personal Info
            </Typography>
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
                  label={"Civil Status"}
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
            component={Paper}
            position={"relative"}
            borderRadius={"10px"}
            display={"flex"}
            flexWrap={"wrap"}
            // sx={{ backgroundColor: "white" }}
            // className={"dash-card"}
            p={3}
            gap={3}
          >
            <Typography
              className="card-heading"
              fontWeight={700}
              color={"#fff"}
              sx={{
                backgroundColor: "primary.dark",
                position: "absolute",
                mt: -5.5,
                px: 3,
                borderRadius: "7px",
                py: 1,
              }}
            >
              Reporting Heirarchy
            </Typography>
            <Box mt={3} width={"100%"}>
              <SearchTable
                tableData={reportingEmpList}
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
