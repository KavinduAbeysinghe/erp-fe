import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import DenseTable from "../../components/tables/DenseTable";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { genders } from "../../util";
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

export const TeamLeavePage = () => {
  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

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
                name={"gender"}
                options={genders}
                label={"Leave Type"}
                helperText={errors?.gender?.message?.toString()}
                error={!!errors?.gender?.message}
                control={control}
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormDatePicker
                helperText={""}
                error={false}
                label={"Date From"}
                name={"dateFrom"}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormDatePicker
                helperText={""}
                error={false}
                label={"Date To"}
                name={"dateTo"}
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <FormTextField
                register={register("comments")}
                label={"Comments"}
                disabled={false}
                required={true}
                error={!!errors?.comments?.message}
                helperText={errors?.comments?.message?.toString()}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormAutocomplete
                error={!!errors?.nationality?.message}
                helperText={errors?.nationality?.message?.toString()}
                setValue={setValue}
                label={"Covering Employee"}
                options={[]}
                id={"Covering Employee"}
                required={true}
                disabled={false}
                control={control}
                watch={watch}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormAutocomplete
                error={!!errors?.nationality?.message}
                helperText={errors?.nationality?.message?.toString()}
                setValue={setValue}
                label={"Approver"}
                options={[]}
                id={"Covering Employee"}
                required={true}
                disabled={false}
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
