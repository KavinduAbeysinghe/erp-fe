import { Box, Grid, Stack, Typography } from "@mui/material";
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
      })),
    );
    setDeptList(
      departments?.map((d: any) => ({
        label: d?.departmentName,
        value: d?.departmentId,
      })),
    );
    setReportingEmpList(
      employees?.map((e: any) => ({ label: e?.name, value: e?.empId })),
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

  const reportingTableHeads = [
    "Emp ID",
    "Name",
    "Designation",
    "Date From",
    "Date To",
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
            name: emp?.name,
            designation: emp?.designation,
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
      <Typography color={"primary"} fontWeight={700} fontSize={"large"} mb={2}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
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
      <Box mt={2}>
        <hr className={"divider"} />
      </Box>
      <Typography color={"primary"} fontWeight={700} fontSize={"large"} mb={2}>
        Employment Information
      </Typography>
      <Grid container spacing={2}>
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
      <Box mt={2}>
        <hr className={"divider"} />
      </Box>
      <Typography color={"primary"} fontWeight={700} fontSize={"large"} mb={2}>
        Reporting Information
      </Typography>
      <Grid container spacing={2}>
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
      <Box mt={2}>
        <SearchTable
          tableData={repEmpTableData}
          id={""}
          tableHeaders={reportingTableHeads}
          paginate={true}
        />
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
