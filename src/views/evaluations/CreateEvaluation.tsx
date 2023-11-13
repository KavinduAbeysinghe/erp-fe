import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { FormTextField } from "../../components/inputs/FormTextField";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import SearchTable from "../../components/tables/SearchTable";
import { CustomButton } from "../../components/buttons/CustomButton";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CustomizedAccordions from "../../components/accordions/CustomAccordion";
import DenseTable from "../../components/tables/DenseTable";
import { KpiLayout } from "./kpi/KpiLayout";
import { departments, employees } from "../../util";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import dayjs from "dayjs";

export const CreateEvaluation = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    evalName: Yup.string().required(commonError),
    evalDesc: Yup.string().required(commonError),
    status: Yup.string().required(commonError),
    createdDate: Yup.string().test("required-err", commonError, (value) => {
      return !(value === undefined || value === null || value === "");
    }),
    openedDate: Yup.string().test("required-err", commonError, (value) => {
      return !(value === undefined || value === null || value === "");
    }),
    dueDate: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    teamMember: Yup.string(),
    kpiName: Yup.string(),
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

  const tableHeads = ["Emp No", "Name", "Designation", "Department"];

  //   const kpiTableHeads = ["KPI Name", "KPI"];

  const tableHeadsKpi = ["#", "Name"];

  const tableData = [
    {
      no: 1,
      name: "Sample Name 001",
    },
    {
      no: 1,
      name: "Sample Name 002",
    },
    {
      no: 1,
      name: "Sample Name 003",
    },
    {
      no: 1,
      name: "Sample Name 004",
    },
    {
      no: 1,
      name: "Sample Name 005",
    },
  ];

  const accordionOptions = [
    {
      title: "Development KPI",
      body: (
        <KpiLayout register={register} errors={errors} tableData={tableData} />
      ),
    },
    {
      title: "Non-Development",
      body: <DenseTable tableData={tableData} tableHeaders={tableHeadsKpi} />,
    },
    {
      title: "Other",
      body: <DenseTable tableData={tableData} tableHeaders={tableHeadsKpi} />,
    },
  ];

  const teamMemberList = employees?.map((e: any) => ({
    label: e?.name,
    value: e?.empId,
  }));

  const teamMember = watch("teamMember");

  const [teamMemberTblData, setTeamMemberTblData] = useState<Array<any>>([]);

  const notify = useNotification();

  const handleAddTeamMembers = () => {
    if (teamMember) {
      const emp = employees?.find((e: any) => e?.empId === teamMember);
      const dupEmp = teamMemberTblData?.find(
        (d: any) => d?.empNo === emp?.empNo
      );
      if (!dupEmp) {
        setTeamMemberTblData((prev) => {
          const newA = [...prev];
          newA.push({
            empId: emp?.empId,
            empNo: emp?.empNo,
            name: emp?.name,
            designation: emp?.designation,
            department: departments?.find(
              (d: any) => d?.departmentId === emp?.departmentId
            )?.departmentName,
          });
          return newA;
        });
      } else {
        notify.warn("Team member already exits");
      }
    }
  };

  const handleRemove = (id: any) => {
    setTeamMemberTblData(
      (prev) => [...prev]?.filter((d: any) => d?.empId !== id)
    );
  };

  const actionButtons = [
    { tooltip: "View", icon: faTrash, handleClick: handleRemove },
  ];

  const kpiName = watch("kpiName");

  const [kpiList, setKpiList] = useState<Array<any>>([]);

  const handleAddKpi = () => {
    if (kpiName) {
      setKpiList((prev) => {
        const newA = [...prev];
        newA.push({
          title: kpiName,
          data: [],
        });
        return newA;
      });
    }
  };

  const [accordionOptions2, setAccordionOptions2] = useState<Array<any>>([]);

  useEffect(() => {
    setAccordionOptions2(
      kpiList?.map((i: any) => ({
        title: i?.title,
        body: (
          <KpiLayout register={register} errors={errors} tableData={i?.data} />
        ),
      }))
    );
  }, [kpiList]);

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      console.log(data);
      setShowBackdrop(false);
    }, 1000);
  };

  const statusList = [
    {
      label: "Opened",
      value: "opened",
    },
    {
      label: "Closed",
      value: "closed",
    },
    {
      label: "Unopened",
      value: "unopened",
    },
  ];

  useEffect(() => {
    setValue("createdDate", dayjs(new Date()).format("DD/MM/YYYY"));
  }, []);

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Typography
        color={"primary"}
        fontWeight={700}
        fontSize={"large"}
        mb={2}
        mt={3}
      >
        General
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormTextField
            register={register("evalName")}
            label={"Evaluation Name"}
            disabled={false}
            required={true}
            error={!!errors?.evalName?.message}
            helperText={errors?.evalName?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <FormTextField
            register={register("evalDesc")}
            label={"Evaluation Description"}
            disabled={false}
            required={true}
            error={!!errors?.evalDesc?.message}
            helperText={errors?.evalDesc?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormDropdown
            name={"status"}
            options={statusList}
            control={control}
            label={"Status"}
            labelId={"label-status"}
            error={!!errors?.status?.message}
            helperText={errors?.status?.message?.toString()}
            fullWidth={true}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Created Date"}
            name={"createdDate"}
            control={control}
            disabled={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormDatePicker
            helperText={errors?.dueDate?.message?.toString()}
            error={!!errors?.dueDate?.message}
            label={"Due Date"}
            name={"dueDate"}
            control={control}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Opened Date"}
            name={"openedDate"}
            control={control}
            disabled={true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <FormAutocomplete
            helperText={""}
            error={false}
            setValue={setValue}
            label={"Team Member"}
            options={teamMemberList}
            id={"teamMember"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        <Grid item md={2}>
          <CustomButton
            onClick={handleAddTeamMembers}
            text={"+ Add"}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Box mt={2}>
        <SearchTable
          tableData={teamMemberTblData}
          id={"empId"}
          tableHeaders={tableHeads}
          paginate={true}
          actionButtons={actionButtons}
        />
      </Box>
      <Box>
        <Typography
          color={"primary"}
          fontWeight={700}
          fontSize={"large"}
          mb={2}
          mt={3}
        >
          KPIs
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormTextField
              register={register("kpiName")}
              label={"KPI Name"}
              disabled={false}
              required={true}
              error={!!errors?.kpiName?.message}
              helperText={errors?.kpiName?.message?.toString()}
            />
          </Grid>
          <Grid item md={2}>
            <CustomButton
              onClick={handleAddKpi}
              text={"+ Add"}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <CustomizedAccordions options={accordionOptions2} />
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={2}
        mt={3}
      >
        <CustomButton text={"Clear"} variant="outlined" />
        <CustomButton
          text={"Save"}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        />
      </Stack>
    </>
  );
};
