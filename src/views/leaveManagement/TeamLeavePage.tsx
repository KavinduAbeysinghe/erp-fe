import { faEye, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";
import SearchTable from "../../components/tables/SearchTable";
import { useNotification } from "../../contexts/NotificationContext";
import { employees, leave } from "../../util";
import { teamLeaves } from "./SearchTeamLeaves";

export const TeamLeavePage = () => {
  const notify = useNotification();

  const navigate = useNavigate();

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    dateFrom: Yup.string().test("required-err", commonError, (value) => {
      return !(value === undefined || value === null || value === "");
    }),
    dateTo: Yup.string().test("required-err", commonError, (value) => {
      return !(value === undefined || value === null || value === "");
    }),
    leaveType: Yup.number().typeError(commonError),
    comments: Yup.string(),
    coveringEmp: Yup.number(),
    approver: Yup.number(),
  });

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () => {
    setShowBackdrop(true);
    setTimeout(() => {
      notify.success("Leave rejected");
      navigate(-1);
      setShowBackdrop(false);
    }, 1000);
  };

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      notify.success("Leave accept success");
      navigate(-1);
      setShowBackdrop(false);
    }, 1000);
  };

  const docTableHeads = ["#", "Doc Name", "Doc Type", "Doc Size"];

  const docTableData = [
    {
      no: 1,
      docName: "Sample_Doc_001",
      docType: "PDF",
      docSize: "327 KB",
    },
    {
      no: 2,
      docName: "Sample_Doc_002",
      docType: "PDF",
      docSize: "327 KB",
    },
  ];

  const handleDownloadDoc = () => {
    const link = document.createElement("a");
    link.href = require("../../assets/files/sample.pdf");
    link.download = "sample.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewDoc = () => {
    setDocModalOpen(true);
  };

  const actionButtons = [
    {
      tooltip: "Preview",
      icon: faEye,
      handleClick: handlePreviewDoc,
    },
    {
      tooltip: "Download",
      icon: faFileArrowDown,
      handleClick: handleDownloadDoc,
    },
  ];

  const [id, setId] = useState<any>("");

  const [isView, setIsView] = useState<boolean>(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [teamMemDetails, setTeamMemberDetails] = useState<any>(null);

  useLayoutEffect(() => {
    const obj = searchParams.get("teamLeave");
    if (obj) {
      const teamLeave = JSON.parse(obj);
      setId(teamLeave?.id);
      setIsView(teamLeave?.page === "view");
    }
  }, [location]);

  useEffect(() => {
    if (id) {
      const leave = teamLeaves?.find((d: any) => d?.id === id);
      if (leave) {
        setValue("leaveType", leave?.leaveTypeId);
        setValue(
          "dateFrom",
          dayjs(new Date(leave?.dateFrom)).format("DD/MM/YYYY")
        );
        setValue("dateTo", dayjs(new Date(leave?.dateTo)).format("DD/MM/YYYY"));
        setValue("comments", leave?.comments);
        setValue("coveringEmp", leave?.coveringEmpId);
        setValue("approver", leave?.approver);
        const emp = employees?.find((d: any) => d?.empId === leave?.empId);
        setTeamMemberDetails({
          name: emp?.name,
          designation: emp?.designation,
          empNo: emp?.empNo,
          profileImg: emp?.profileImg,
        });
      }
    }
  }, [isView]);

  const coveringEmpList = employees?.map((d: any) => ({
    label: d?.name,
    value: d?.empId,
  }));

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <DocPreviewModal
        open={docModalOpen}
        setOpen={setDocModalOpen}
        maxWidth={"lg"}
        doc={require("../../assets/files/sample.pdf")}
        docType={"application/pdf"}
        title={"Sample.pdf"}
      />
      <Box display={"flex"} mb={5} gap={2} alignItems={"center"}>
        <Avatar
          alt="Remy Sharp"
          src={teamMemDetails && teamMemDetails?.profileImg}
          sx={{ width: 100, height: 100 }}
        />
        <Box>
          <Typography fontWeight={700} fontSize={"xx-large"}>
            {teamMemDetails && teamMemDetails?.name}
          </Typography>
          <Typography color={"text.secondary"} fontSize={"medium"}>
            {teamMemDetails && teamMemDetails?.designation}
          </Typography>
          <Typography color={"text.secondary"} fontSize={"small"}>
            Emp No: {teamMemDetails && teamMemDetails?.empNo}
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <FormDropdown
                name={"leaveType"}
                options={leave}
                label={"Leave Type"}
                helperText={errors?.leaveType?.message?.toString()}
                error={!!errors?.leaveType?.message}
                control={control}
                fullWidth={true}
                disabled={isView}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormDatePicker
                error={!!errors?.dateFrom?.message}
                helperText={errors?.dateFrom?.message?.toString()}
                label={"Date From"}
                name={"dateFrom"}
                control={control}
                disabled={isView}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormDatePicker
                error={!!errors?.dateTo?.message}
                helperText={errors?.dateTo?.message?.toString()}
                label={"Date To"}
                name={"dateTo"}
                control={control}
                disabled={isView}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <FormTextField
                register={register("comments")}
                label={"Comments"}
                disabled={isView}
                required={true}
                error={!!errors?.comments?.message}
                helperText={errors?.comments?.message?.toString()}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormAutocomplete
                error={!!errors?.coveringEmp?.message}
                helperText={errors?.coveringEmp?.message?.toString()}
                setValue={setValue}
                label={"Covering Employee"}
                options={coveringEmpList}
                id={"coveringEmp"}
                required={true}
                disabled={isView}
                control={control}
                watch={watch}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormAutocomplete
                error={!!errors?.approver?.message}
                helperText={errors?.approver?.message?.toString()}
                setValue={setValue}
                label={"Approver"}
                options={coveringEmpList}
                id={"approver"}
                required={true}
                disabled={isView}
                control={control}
                watch={watch}
              />
            </Grid>
          </Grid>
          <Box my={3}>
            <Chip
              label="2 Attatchments"
              color={"primary"}
              icon={<AttachmentIcon />}
            />
          </Box>
          <SearchTable
            tableData={docTableData}
            id={""}
            paginate={true}
            tableHeaders={docTableHeads}
            actionButtons={actionButtons}
          />
          <Stack
            mt={3}
            gap={2}
            direction={"row"}
            justifyContent={"end"}
            alignItems={"center"}
          >
            <CustomButton
              text={"Reject"}
              variant={"outlined"}
              onClick={resetForm}
            />
            <CustomButton
              text={"Accept"}
              variant={"contained"}
              onClick={handleSubmit(onSubmit)}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
