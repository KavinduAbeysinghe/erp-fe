import { Box, Grid, styled, Typography, Stack } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import { OptionIn, employees, genders, leave } from "../../util";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import DenseTable from "../../components/tables/DenseTable";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomButton } from "../../components/buttons/CustomButton";
import SearchTable from "../../components/tables/SearchTable";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNotification } from "../../contexts/NotificationContext";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { DocPreviewModal } from "../../components/modals/DocPreviewModal";

export const ApplyLeave = () => {
  const initialDoc = { result: "", title: "", type: "" };
  const [doc, setDoc] = useState<{
    result: string;
    type: string;
    title: string;
  }>(initialDoc);

  const [showDocModal, setShowDocModal] = useState<boolean>(false);

  const notify = useNotification();

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const docTableHeads = ["Doc Name", "Doc Type", "Doc Size"];

  const [fileSummaryData, setFileSummaryData] = useState<Array<any>>([]);

  const [files, setFiles] = useState<Array<any>>([]);

  const employeeOptions: Array<OptionIn> = employees?.map((e: any) => ({
    label: e?.name,
    value: e?.empId,
  }));

  useLayoutEffect(() => {
    setValue("approver", "Jane Allen - Senior Software Engineer");
  }, []);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    dateFrom: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    dateTo: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    leave: Yup.string().required(commonError),
    comments: Yup.string().required(commonError),
    coveringEmp: Yup.string().required(commonError),
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

  const fileInputRef = useRef<any>(null);

  const handleBoxClick = () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    const selectedFiles = e.target.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.push(selectedFiles);
      return newFiles;
    });
    notify.success("File upload success");
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.push(files);
      return newFiles;
    });
    notify.success("File upload success");
  };

  useEffect(() => {
    console.log(files);
    setFileSummaryData(
      files?.map((f: any, index) => ({
        no: index + 1,
        name: f?.name,
        type: f?.type?.split("/")[1]?.toUpperCase(),
        docSize: `${(f?.size / (1024 * 1024))?.toFixed(2)} MB`,
      }))
    );
  }, [files]);

  const resetForm = () => {
    reset({});
    setValue("leave", "");
    setValue("dateFrom", "");
    setValue("dateTo", "");
    setValue("comments", "");
    setValue("coveringEmp", "");
    setFiles([]);
    setFileSummaryData([]);
    setDoc(initialDoc);
  };

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      console.log(data);
      notify.success("Leave application success");
      setShowBackdrop(false);
    }, 1000);
  };

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

  const handleViewDoc = (id: any) => {
    const name = fileSummaryData?.find((f: any) => f?.no === id)?.name;
    const file = files?.find((f: any) => f?.name === name);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setDoc({
          result: e.target.result,
          title: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
      setShowBackdrop(true);
      setTimeout(() => {
        setShowDocModal(true);
        setShowBackdrop(false);
      }, 1000);
    }
  };

  const handleDeleteDoc = (id: any) => {
    const name = fileSummaryData?.find((f: any) => f?.no === id)?.name;
    setFiles((prev) => [...prev].filter((f: any) => f?.name !== name));
    setFileSummaryData((prev) => [...prev].filter((f: any) => f?.no !== id));
  };

  const actionButtons = [
    { tooltip: "Edit", icon: faEye, handleClick: handleViewDoc },
    { tooltip: "Edit", icon: faTrash, handleClick: handleDeleteDoc },
  ];

  return (
    <>
      <DocPreviewModal
        open={showDocModal}
        setOpen={setShowDocModal}
        maxWidth={"lg"}
        doc={doc.result}
        docType={doc.type}
        title={doc.title}
      />
      <CustomBackdrop showBackdrop={showBackdrop} />
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
                name={"leave"}
                options={leave}
                label={"Leave Type"}
                helperText={errors?.leave?.message?.toString()}
                error={!!errors?.leave?.message}
                control={control}
                fullWidth={true}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormDatePicker
                helperText={errors?.dateFrom?.message?.toString()}
                error={!!errors?.dateFrom?.message}
                label={"Date From"}
                name={"dateFrom"}
                control={control}
                required={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormDatePicker
                helperText={errors?.dateTo?.message?.toString()}
                error={!!errors?.dateTo?.message}
                label={"Date To"}
                name={"dateTo"}
                control={control}
                required={true}
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
                error={!!errors?.coveringEmp?.message}
                helperText={errors?.coveringEmp?.message?.toString()}
                setValue={setValue}
                label={"Covering Employee"}
                options={employeeOptions}
                id={"coveringEmp"}
                required={true}
                disabled={false}
                control={control}
                watch={watch}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <FormTextField
                register={register("approver")}
                label={"Approver"}
                disabled={true}
                required={false}
                error={!!errors?.approver?.message}
                helperText={errors?.approver?.message?.toString()}
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
            sx={{
              transition: "all .5s ease-in-out",
              cursor: "pointer",
              ":hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
            }}
            onClick={handleBoxClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <DriveFolderUploadIcon
              fontSize={"large"}
              sx={{ fontSize: "70px", color: "gray" }}
            />
            <Typography color={"gray"}>
              Click or Drag & Drop Files to Upload
            </Typography>
            <Typography color={"gray"}>Max Size 2 MB</Typography>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
          <Box mt={4}>
            <SearchTable
              tableData={fileSummaryData}
              tableHeaders={docTableHeads}
              id={"no"}
              paginate={false}
              actionButtons={actionButtons}
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
    </>
  );
};
