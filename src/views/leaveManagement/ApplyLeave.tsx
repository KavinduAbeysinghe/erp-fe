import { Box, Grid, styled, Typography, Stack } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import { genders } from "../../util";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useRef } from "react";
import DenseTable from "../../components/tables/DenseTable";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomButton } from "../../components/buttons/CustomButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const ApplyLeave = () => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const fileInputRef = useRef<any>(null);

  const handleBoxClick = () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    const selectedFiles = e.target.files;
    console.log(selectedFiles);
  };

  const resetForm = () => {};

  const onSubmit = () => {};

  const denseTableHeads = [
    "Leave Type",
    "Entitlement",
    "Balance",
    "Utilized",
    "Pending Approval",
  ];

  const denseTableData = [
    {
      leaveType: "Casual",
      entitlement: 8,
      balance: 6,
      utilized: 2,
      pendingApproval: 1,
    },
    {
      leaveType: "Family & Medical",
      entitlement: 8,
      balance: 6,
      utilized: 2,
      pendingApproval: 1,
    },
    {
      leaveType: "Study",
      entitlement: 8,
      balance: 6,
      utilized: 2,
      pendingApproval: 1,
    },
    {
      leaveType: "Bereavement",
      entitlement: 8,
      balance: 6,
      utilized: 2,
      pendingApproval: 1,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12}>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Click here to check your Leave Balance</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DenseTable
                tableData={denseTableData}
                tableHeaders={denseTableHeads}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
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
        <Typography mt={3} fontWeight={700} color={"text.secondary"}>
          Attachments
        </Typography>
        <Box
          p={3}
          className={"dotted-container"}
          mt={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
          sx={{ cursor: "pointer" }}
          onClick={handleBoxClick}
        >
          <DriveFolderUploadIcon
            fontSize={"large"}
            sx={{ fontSize: "70px", color: "gray" }}
          />
          <Typography color={"gray"}>Drag & Drop Files to Upload</Typography>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </Box>
        <Stack
          mt={3}
          gap={2}
          direction={"row"}
          justifyContent={"end"}
          alignItems={"center"}
        >
          <CustomButton
            text={"Clear"}
            variant={"outlined"}
            onClick={resetForm}
          />
          <CustomButton
            text={"Save"}
            variant={"contained"}
            onClick={handleSubmit(onSubmit)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
