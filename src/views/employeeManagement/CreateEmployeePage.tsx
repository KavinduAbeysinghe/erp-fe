import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import SearchTable from "../../components/tables/SearchTable";
import { useNotification } from "../../contexts/NotificationContext";
import {
  civilStatuses,
  departments,
  employees,
  genders,
  getFormattedDate,
  hiringSources,
  nationalities,
} from "../../util";

export const CreateEmployeePage = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [nationalityList, setNationalityList] = useState<Array<any>>([]);

  const [deptList, setDeptList] = useState<Array<any>>([]);

  const [reportingEmpList, setReportingEmpList] = useState<Array<any>>([]);

  const [repEmpTableData, setRepEmpTableData] = useState<Array<any>>([]);

  const notify = useNotification();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [isView, setIsView] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [uploadedImg, setUploadedImg] = useState<any>("");

  useEffect(() => {
    const params = searchParams.get("emp");
    if (params) {
      const emp = JSON.parse(params);
      if (emp?.page === "view") {
        setIsView(true);
      } else if (emp?.page === "edit") {
        setIsEdit(true);
      }
      const employee = employees?.find((d: any) => d?.empId === emp?.id);
      if (employee) {
        const name = employee?.name;
        const defVals = {
          firstName: name?.split(" ")[0],
          lastName: name?.split(" ")[1],
          callingName: name,
          dob: dayjs(new Date(employee?.dob)).format("DD/MM/YYYY"),
          telephone: employee?.telephone,
          mobile: employee?.telephone,
          personalEmail: employee?.personalEmail,
          nic: employee?.nic,
          bloodGroup: employee?.bloodGroup,
          gender: employee?.gender,
          civilStatus: employee?.civilStatus,
          nationality: employee?.nationalityId,
          staffId: employee?.empNo,
          hiringSource: employee?.hiringSource,
          depatment: employee?.departmentId,
          dateOfJoining: dayjs(new Date(employee?.hiredDate)).format(
            "DD/MM/YYYY"
          ),
          employmentFrom: dayjs(new Date(employee?.employmentFrom)).format(
            "DD/MM/YYYY"
          ),
          employmentTo: dayjs(new Date(employee?.employmentTo)).format(
            "DD/MM/YYYY"
          ),
          cooperateEmail: employee?.personalEmail,
          religion: employee?.religion,
          casualLeaves: employee?.leaveInfo?.casual,
          familyMedicalLeaves: employee?.leaveInfo?.familyMedical,
          bereavementLeaves: employee?.leaveInfo?.bereavement,
          studyLeaves: employee?.leaveInfo?.study,
        };
        console.log(defVals);
        reset(defVals);
        setUploadedImg(employee?.profileImg);
        setRepEmpTableData(
          employee?.reportingEmployees?.map((e: any) => ({
            empId: e?.empId,
            empNo: e?.empNo,
            name: <EmployeeColumn id={e?.empId} />,
            dateFrom: dayjs(new Date(e?.dateFrom)).format("DD/MM/YYYY"),
            dateTo: dayjs(new Date(e?.dateTo)).format("DD/MM/YYYY"),
          }))
        );
      }
    }
  }, [location]);

  useLayoutEffect(() => {
    setNationalityList(
      nationalities?.map((n: any) => ({
        label: `${n?.nationality} - ${n?.nationalityCode}`,
        value: n?.nationalityId,
      }))
    );
    setDeptList(
      departments?.map((d: any) => ({
        label: d?.departmentName,
        value: d?.departmentId,
      }))
    );
    setReportingEmpList(
      employees?.map((e: any) => ({ label: e?.name, value: e?.empId }))
    );
  }, []);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(commonError),
    lastName: Yup.string().required(commonError),
    callingName: Yup.string().required(commonError),
    dob: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    telephone: Yup.string().required(commonError),
    mobile: Yup.string().required(commonError),
    personalEmail: Yup.string().email().required(commonError),
    bloodGroup: Yup.string().required(commonError),
    religion: Yup.string().required(commonError),
    nic: Yup.string().required(commonError),
    gender: Yup.number().required(commonError).typeError(commonError),
    civilStatus: Yup.number().required(commonError).typeError(commonError),
    nationality: Yup.number().required(commonError).typeError(commonError),
    staffId: Yup.string().required(commonError),
    hiringSource: Yup.number().required(commonError).typeError(commonError),
    department: Yup.number().required(commonError).typeError(commonError),
    dateOfJoining: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    employmentFrom: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    employmentTo: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    cooperateEmail: Yup.string().email().required(commonError),
    reportingEmployee: Yup.string(),
    dateFrom: Yup.string(),
    dateTo: Yup.string(),
    casualLeaves: Yup.number().typeError(commonError).required(commonError),
    familyMedicalLeaves: Yup.number()
      .typeError(commonError)
      .required(commonError),
    studyLeaves: Yup.number().typeError(commonError).required(commonError),
    bereavementLeaves: Yup.number()
      .typeError(commonError)
      .required(commonError),
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

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      console.log(data);
      notify.success("Employee creation successful");
      setShowBackdrop(false);
    }, 1000);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const resetForm = () => {
    reset({});
    setUploadedImg("");
    setRepEmpTableData([]);
  };

  const reportingTableHeads = ["Emp No", "Name", "Date From", "Date To"];

  const [delId, setDelId] = useState<any>("");

  const removeEmp = (id: any) => {
    setDelId(id);
    setOpenAlert(true);
  };

  const actionButtons = [
    { tooltip: "Delete", icon: faTrash, handleClick: removeEmp },
  ];

  const reportingEmp = watch("reportingEmployee");

  const dateFrom = watch("dateFrom");

  const dateTo = watch("dateTo");

  const addEmployeeToTable = () => {
    if (reportingEmp && dateFrom && dateTo) {
      if (!repEmpTableData?.find((d: any) => d?.empId === reportingEmp)) {
        setRepEmpTableData((prevArr) => {
          const newArr = [...prevArr];
          const emp = employees?.find((e: any) => e?.empId === reportingEmp);
          newArr.push({
            empId: emp?.empId,
            empNo: emp?.empNo,
            name: <EmployeeColumn id={emp?.empId} />,
            dateFrom: getFormattedDate(dateFrom),
            dateTo: getFormattedDate(dateTo),
          });
          return newArr;
        });
      } else {
        notify.warn("Already exsits");
      }
      setValue("reportingEmployee", "");
      setValue("dateFrom", "");
      setValue("dateTo", "");
    }
  };

  const fileInputRef = useRef<any>(null);

  const handleAvatarClick = () => {
    // Trigger file input click on Box click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const maxFileSize = 2 * 1024 * 1024;

  const handleFileChange = (e: any) => {
    // Handle the selected files here
    console.log("File handler");

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImg(e!.target!.result);
    };
    if (file && file.size < maxFileSize) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        reader.readAsDataURL(file);
      } else {
        notify.warn("Please upload a PNG or a JPEG");
      }
    } else {
      notify.warn("File too large");
    }
  };

  const handleYesClick = () => {
    setOpenAlert(false);
    if (delId) {
      setRepEmpTableData((prev) =>
        [...prev].filter((d: any) => d?.empId !== delId)
      );
    }
  };

  return (
    <>
      <AlertDialogSlide
        message={"Do you want to remove selected employee?"}
        handleYesClick={handleYesClick}
        handleNoClick={() => setOpenAlert(false)}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Box
        mt={3}
        component={Paper}
        p={3}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        position={"relative"}
      >
        <Typography
          fontWeight={700}
          color={"#fff"}
          className="card-heading"
          sx={{
            // backgroundColor: "primary.dark",
            position: "absolute",
            mt: -5.5,
            px: 3,
            borderRadius: "7px",
            py: 1,
          }}
        >
          General
        </Typography>

        <Box mt={2}>
          <Box sx={{ display: "inline-block" }}>
            <Avatar
              alt="Uploaded Img"
              src={uploadedImg}
              sx={{
                width: 100,
                height: 100,
                ":hover": { filter: "brightness(50%)" },
                transition: "0.2s all ease-in-out",
                cursor: !isView ? "pointer" : "not-allowed",
              }}
              onClick={!isView ? handleAvatarClick : () => {}}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e)}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              register={register("firstName")}
              label={"First Name"}
              disabled={isView}
              required={true}
              error={!!errors?.firstName?.message}
              helperText={errors?.firstName?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("lastName")}
              label={"Last Name"}
              disabled={isView}
              required={true}
              error={!!errors?.lastName?.message}
              helperText={errors?.lastName?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("callingName")}
              label={"Calling Name"}
              disabled={isView}
              required={true}
              error={!!errors?.callingName?.message}
              helperText={errors?.callingName?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={errors?.dob?.message?.toString()}
              error={!!errors?.dob?.message}
              label={"Date of Birth"}
              name={"dob"}
              control={control}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("telephone")}
              label={"Telephone"}
              disabled={isView}
              required={true}
              error={!!errors?.telephone?.message}
              helperText={errors?.telephone?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("mobile")}
              label={"Mobile"}
              disabled={isView}
              required={true}
              error={!!errors?.mobile?.message}
              helperText={errors?.mobile?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("personalEmail")}
              label={"Personal Email"}
              disabled={isView}
              required={true}
              error={!!errors?.personalEmail?.message}
              helperText={errors?.personalEmail?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("nic")}
              label={"NIC/Passport"}
              disabled={isView}
              required={true}
              error={!!errors?.nic?.message}
              helperText={errors?.nic?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("bloodGroup")}
              label={"Blood Group"}
              disabled={isView}
              required={true}
              error={!!errors?.bloodGroup?.message}
              helperText={errors?.bloodGroup?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDropdown
              name={"gender"}
              options={genders}
              label={"Gender"}
              helperText={errors?.gender?.message?.toString()}
              error={!!errors?.gender?.message}
              control={control}
              fullWidth={true}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDropdown
              name={"civilStatus"}
              options={civilStatuses}
              label={"Civil Status"}
              helperText={errors?.civilStatus?.message?.toString()}
              error={!!errors?.civilStatus?.message}
              control={control}
              fullWidth={true}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormAutocomplete
              error={!!errors?.nationality?.message}
              helperText={errors?.nationality?.message?.toString()}
              setValue={setValue}
              label={"Nationality"}
              options={nationalityList}
              id={"nationality"}
              required={true}
              disabled={isView}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("religion")}
              label={"Religion"}
              disabled={isView}
              required={true}
              error={!!errors?.religion?.message}
              helperText={errors?.religion?.message?.toString()}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        mt={5}
        component={Paper}
        p={3}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        position={"relative"}
      >
        <Typography
          fontWeight={700}
          color={"#fff"}
          className="card-heading"
          sx={{
            // backgroundColor: "primary.dark",
            position: "absolute",
            mt: -5.5,
            px: 3,
            borderRadius: "7px",
            py: 1,
          }}
        >
          Employment Information
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              register={register("staffId")}
              label={"Staff ID"}
              disabled={isView}
              required={true}
              error={!!errors?.staffId?.message}
              helperText={errors?.staffId?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormAutocomplete
              error={!!errors?.hiringSource?.message}
              helperText={errors?.hiringSource?.message?.toString()}
              setValue={setValue}
              label={"Hiring Source"}
              options={hiringSources}
              id={"hiringSource"}
              required={true}
              disabled={isView}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormAutocomplete
              error={!!errors?.department?.message}
              helperText={errors?.department?.message?.toString()}
              setValue={setValue}
              label={"Department"}
              options={deptList}
              id={"department"}
              required={true}
              disabled={isView}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={errors?.dateOfJoining?.message?.toString()}
              error={!!errors?.dateOfJoining?.message}
              label={"Date of Joining"}
              name={"dateOfJoining"}
              control={control}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={errors?.employmentFrom?.message?.toString()}
              error={!!errors?.employmentFrom?.message}
              label={"Employment From"}
              name={"employmentFrom"}
              control={control}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={errors?.employmentTo?.message?.toString()}
              error={!!errors?.employmentTo?.message}
              label={"Employment To"}
              name={"employmentTo"}
              control={control}
              disabled={isView}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("cooperateEmail")}
              label={"Cooperate Email"}
              disabled={isView}
              required={true}
              error={!!errors?.cooperateEmail?.message}
              helperText={errors?.cooperateEmail?.message?.toString()}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        mt={5}
        component={Paper}
        p={3}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        position={"relative"}
      >
        <Typography
          fontWeight={700}
          color={"#fff"}
          className="card-heading"
          sx={{
            // backgroundColor: "primary.dark",
            position: "absolute",
            mt: -5.5,
            px: 3,
            borderRadius: "7px",
            py: 1,
          }}
        >
          Reporting Employees
        </Typography>
        {!isView && (
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={3}>
              <FormAutocomplete
                helperText={""}
                error={false}
                setValue={setValue}
                label={"Reporting Employee"}
                options={reportingEmpList}
                id={"reportingEmployee"}
                required={true}
                disabled={isView}
                control={control}
                watch={watch}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormDatePicker
                helperText={""}
                error={false}
                label={"Date From"}
                name={"dateFrom"}
                control={control}
                disabled={isView}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <FormDatePicker
                helperText={""}
                error={false}
                label={"Date To"}
                name={"dateTo"}
                control={control}
                disabled={isView}
              />
            </Grid>
            <Grid item md={2}>
              <CustomButton
                text={"+Add"}
                variant={"outlined"}
                onClick={addEmployeeToTable}
              />
            </Grid>
          </Grid>
        )}
        <Box mt={1}>
          <SearchTable
            tableData={repEmpTableData}
            id={"empId"}
            actionButtons={actionButtons}
            tableHeaders={reportingTableHeads}
            paginate={true}
          />
        </Box>
      </Box>
      <Box
        mt={5}
        component={Paper}
        p={3}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        position={"relative"}
      >
        <Typography
          fontWeight={700}
          color={"#fff"}
          className="card-heading"
          sx={{
            // backgroundColor: "primary.dark",
            position: "absolute",
            mt: -5.5,
            px: 3,
            borderRadius: "7px",
            py: 1,
          }}
        >
          Leave Information
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              type={"number"}
              register={register("casualLeaves")}
              label={"Casual Leaves"}
              disabled={isView}
              required={true}
              error={!!errors?.casualLeaves?.message}
              helperText={errors?.casualLeaves?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              type={"number"}
              register={register("bereavementLeaves")}
              label={"Bereavement Leaves"}
              disabled={isView}
              required={true}
              error={!!errors?.bereavementLeaves?.message}
              helperText={errors?.bereavementLeaves?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              type={"number"}
              register={register("familyMedicalLeaves")}
              label={"Family & Medical Leaves"}
              disabled={isView}
              required={true}
              error={!!errors?.familyMedicalLeaves?.message}
              helperText={errors?.familyMedicalLeaves?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              type={"number"}
              register={register("studyLeaves")}
              label={"Study"}
              disabled={isView}
              required={true}
              error={!!errors?.studyLeaves?.message}
              helperText={errors?.studyLeaves?.message?.toString()}
            />
          </Grid>
        </Grid>
      </Box>
      {!isView && (
        <Stack direction={"row"} gap={2} justifyContent={"end"} mt={3}>
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
      )}
    </>
  );
};
