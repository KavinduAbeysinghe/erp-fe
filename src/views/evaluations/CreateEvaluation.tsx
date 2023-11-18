import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormTextField } from "../../components/inputs/FormTextField";
import { EmployeeColumn } from "../../components/tables/EmployeeColumn";
import SearchTable from "../../components/tables/SearchTable";
import { useNotification } from "../../contexts/NotificationContext";
import {
  departments,
  employees,
  evaluationManagerData,
  evaluationType,
} from "../../util";
import { KpiType } from "./kpi/KpiType";

export const CreateEvaluation = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState<string>("");

  const [id, setId] = useState<any>("");

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    evalName: Yup.string().required(commonError),
    evalDesc: Yup.string().required(commonError),
    status: Yup.string().required(commonError),
    createdDate: Yup.string().test("required-err", commonError, (value) => {
      return !(value === undefined || value === null || value === "");
    }),
    openedDate: Yup.string(),
    dueDate: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    teamMember: Yup.string(),
    kpiName: Yup.string(),
    kpiTypeList: Yup.array(),
    evaluationType: Yup.number().typeError(commonError).required(commonError),
  });

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const tableHeads = ["Emp No", "Name", "Department"];

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
            name: <EmployeeColumn id={emp?.empId} />,
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

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "kpiTypeList",
  });

  const kpiName = watch("kpiName");

  const handleAddKpi = () => {
    if (!!kpiName) {
      const dup = fields?.find((d: any) => d?.name === kpiName);
      if (!dup) {
        prepend({
          name: kpiName,
          subList: [],
        });
        setValue("kpiName", "");
      } else {
        setValue("kpiName", "");
        notify.warn("Already exists");
      }
    } else {
      return;
    }
  };

  const onSubmit = (data: any) => {
    setShowBackdrop(true);
    setTimeout(() => {
      console.log(data);
      notify.success("Evaluation Creation Success");
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

  useEffect(() => {
    const evalObj = searchParams.get("evalManager");
    if (evalObj) {
      const evalManager = JSON.parse(evalObj);
      setPage(evalManager?.page);
      setId(evalManager?.id);
      const evaluation = evaluationManagerData?.find(
        (i: any) => i?.evalId === evalManager?.id
      );
      if (evaluation) {
        const defVals = {
          evalName: evaluation?.name,
          evalDesc: evaluation?.description,
          status: evaluation?.status,
          createdDate: dayjs(new Date(evaluation?.createdDate)).format(
            "DD/MM/YYYY"
          ),
          dueDate: dayjs(new Date(evaluation?.dueDate)).format("DD/MM/YYYY"),
          openedDate: dayjs(new Date(evaluation?.openedDate)).format(
            "DD/MM/YYYY"
          ),
          evaluationType: evaluation?.evaluationType,
        };
        setTeamMemberTblData(
          evaluation?.teamMemberData?.map((i: any) => {
            const emp = employees?.find((e: any) => e?.empId === i?.empId);
            if (emp) {
              return {
                empId: emp?.empId,
                empNo: emp?.empNo,
                name: <EmployeeColumn id={emp?.empId} />,
                department: departments?.find(
                  (d: any) => d?.departmentId === emp?.departmentId
                )?.departmentName,
              };
            }
          })
        );
        reset(defVals);
        const kpis = evaluation?.kpiData?.map((d: any) => ({
          name: d?.name,
          subList: d?.kpiTypes?.map((t: any) => ({
            kpiType: t?.name,
          })),
        }));
        console.log(kpis);

        setValue("kpiTypeList", kpis);
        console.log(fields);
        console.log(getValues());
      }
    }
  }, [location.search]);

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Box component={Paper} p={3} elevation={2} position={"relative"} mt={5}>
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
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormTextField
              register={register("evalName")}
              label={"Evaluation Name"}
              disabled={page === "view"}
              required={true}
              error={!!errors?.evalName?.message}
              helperText={errors?.evalName?.message?.toString()}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <FormTextField
              register={register("evalDesc")}
              label={"Evaluation Description"}
              disabled={page === "view"}
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
              disabled={page === "view"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormDatePicker
              helperText={""}
              error={false}
              label={"Created Date"}
              name={"createdDate"}
              control={control}
              disabled={page === "view"}
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
              disabled={page === "view"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormDatePicker
              helperText={""}
              error={false}
              label={"Opened Date"}
              name={"openedDate"}
              control={control}
              disabled={page === "view"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormDropdown
              label={"Evaluation Type"}
              name={"evaluationType"}
              options={evaluationType}
              helperText={errors?.evaluationType?.message?.toString()}
              error={!!errors?.evaluationType?.message}
              control={control}
              required={true}
              fullWidth={true}
              disabled={page === "view"}
            />
          </Grid>
        </Grid>
        {page !== "view" && (
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
                disabled={page === "view"}
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
        )}
        <Box mt={2}>
          <SearchTable
            tableData={teamMemberTblData}
            id={"empId"}
            tableHeaders={tableHeads}
            paginate={true}
            actionButtons={page !== "view" ? actionButtons : []}
          />
        </Box>
      </Box>
      <Box component={Paper} p={3} elevation={2} position={"relative"} mt={5}>
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
          KPIs
        </Typography>
        {page !== "view" && (
          <Grid container spacing={2} mb={3} mt={3}>
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
        )}
        {/* <CustomizedAccordions options={accordionOptions2} /> */}
        <div>
          {fields?.map((field: any, index) => (
            <KpiType
              control={control}
              watch={watch}
              key={field.id}
              title={field?.name}
              index={index}
              register={register}
              setValue={setValue}
            />
          ))}
        </div>
      </Box>
      {page !== "view" && (
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
      )}
    </>
  );
};
