import { useForm } from "react-hook-form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import DenseTable from "../../components/tables/DenseTable";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { employees, genders, leave } from "../../util";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { CustomButton } from "../../components/buttons/CustomButton";
import { CustomChip } from "../../components/chips/Chip";
import SearchTable from "../../components/tables/SearchTable";
import { faEye, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { useLocation } from "react-router-dom";
import { teamLeaves } from "./SearchTeamLeaves";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const TeamLeavePage = () => {
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
    approver: Yup.string(),
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

  const resetForm = () => {};

  const onSubmit = () => {};

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

  const handleDownloadDoc = () => {};

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
        // setValue("approver", leave?.coveringEmpId);
      }
    }
  }, [isView]);

  const coveringEmpList = employees?.map((d: any) => ({
    label: d?.name,
    value: d?.empId,
  }));

  return (
    <>
      <DocPreviewModal
        open={docModalOpen}
        setOpen={setDocModalOpen}
        maxWidth={"lg"}
        doc={require("../../assets/files/sample.pdf")}
        docType={"application/pdf"}
      />
      <Box display={"flex"} mb={3} gap={2} alignItems={"center"}>
        <img
          src={require("../../assets/images/person3.jpg")}
          alt="emp-img"
          height={100}
          width={100}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <Box>
          <Typography fontWeight={700} fontSize={"xx-large"}>
            Jane Allen
          </Typography>
          <Typography color={"text.secondary"} fontSize={"medium"}>
            Associate Software Engineer
          </Typography>
          <Typography color={"text.secondary"} fontSize={"small"}>
            Emp No: EMP001
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
                options={[]}
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
