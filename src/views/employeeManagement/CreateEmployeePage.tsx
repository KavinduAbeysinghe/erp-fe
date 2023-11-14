import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import {
  civilStatuses,
  departments,
  employees,
  genders,
  getFormattedDate,
  hiringSources,
  nationalities,
} from "../../util";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { useEffect, useLayoutEffect, useState } from "react";
import { CustomButton } from "../../components/buttons/CustomButton";
import SearchTable from "../../components/tables/SearchTable";
import dayjs from "dayjs";
import { useNotification } from "../../contexts/NotificationContext";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { useLocation } from "react-router-dom";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const CreateEmployeePage = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [nationalityList, setNationalityList] = useState<Array<any>>([]);

  const [deptList, setDeptList] = useState<Array<any>>([]);

  const [reportingEmpList, setReportingEmpList] = useState<Array<any>>([]);

  const [repEmpTableData, setRepEmpTableData] = useState<Array<any>>([]);

  const notify = useNotification();

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [id, setId] = useState<any>("");

  const [isView, setIsView] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  useLayoutEffect(() => {
    const params = searchParams.get("emp");
    if (params) {
      const emp = JSON.parse(params);
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
    gender: Yup.string().required(commonError),
    civilStatus: Yup.string().required(commonError),
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
    setRepEmpTableData([]);
  };

  const reportingTableHeads = ["Emp No", "Name", "Date From", "Date To"];

  const removeEmp = (id: any) => {
    setRepEmpTableData((prev) => [...prev].filter((d: any) => d?.empId !== id));
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

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Box
        mt={3}
        component={Paper}
        className={"dash-card"}
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
          Notices
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              register={register("firstName")}
              label={"First Name"}
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("telephone")}
              label={"Telephone"}
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
              control={control}
              watch={watch}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("religion")}
              label={"Religion"}
              disabled={false}
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
        className={"dash-card"}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={errors?.employmentFrom?.message?.toString()}
              error={!!errors?.employmentFrom?.message}
              label={"Employment From"}
              name={"employmentFrom"}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={errors?.employmentTo?.message?.toString()}
              error={!!errors?.employmentTo?.message}
              label={"Employment To"}
              name={"employmentTo"}
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormTextField
              type={"text"}
              register={register("cooperateEmail")}
              label={"Cooperate Email"}
              disabled={false}
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
        className={"dash-card"}
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
              disabled={false}
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormDatePicker
              helperText={""}
              error={false}
              label={"Date To"}
              name={"dateTo"}
              control={control}
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
      </Box>
      <Box mt={2}>
        <SearchTable
          tableData={repEmpTableData}
          id={"empId"}
          actionButtons={actionButtons}
          tableHeaders={reportingTableHeads}
          paginate={true}
        />
      </Box>
      <Box
        mt={5}
        component={Paper}
        className={"dash-card"}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
              required={true}
              error={!!errors?.studyLeaves?.message}
              helperText={errors?.studyLeaves?.message?.toString()}
            />
          </Grid>
        </Grid>
      </Box>
      <Stack direction={"row"} gap={2} justifyContent={"end"} mt={3}>
        <CustomButton text={"Clear"} variant={"outlined"} onClick={resetForm} />
        <CustomButton
          text={"Save"}
          variant={"contained"}
          onClick={handleSubmit(onSubmit)}
        />
      </Stack>
    </>
  );
};
