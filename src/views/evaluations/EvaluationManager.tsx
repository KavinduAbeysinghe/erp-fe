import { Grid } from "@mui/material";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { useLayoutEffect, useState } from "react";
import { TopCardAttendance } from "../attendance/TopCardAttendance";
import SearchTable from "../../components/tables/SearchTable";
import { CustomChip } from "../../components/chips/Chip";
import {
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FormDropdown } from "../../components/inputs/FormDropdown";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { useForm } from "react-hook-form";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";
import { useNavigate } from "react-router-dom";
import AlertDialogSlide from "../../components/modals/AlertDialog";
import { useNotification } from "../../contexts/NotificationContext";

export const EvaluationManager = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const [evalTableData, setEvalTableData] = useState<Array<any>>([]);

  const tableHeads = [
    "Eval ID",
    "Name",
    "Created Date",
    "openedDate",
    "Due Date",
    "Status",
  ];

  const tableData = [
    {
      evalId: "1001",
      name: "Sample Evaluation 001",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "opened",
    },
    {
      evalId: "1002",
      name: "Sample Evaluation 002",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "closed",
    },
    {
      evalId: "1002",
      name: "Sample Evaluation 003",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "unopened",
    },
    {
      evalId: "1002",
      name: "Sample Evaluation 004",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "closed",
    },
    {
      evalId: "1003",
      name: "Sample Evaluation 005",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "opened",
    },
  ];

  const formatData = (data: Array<any>) => {
    return data?.map((d: any) => ({
      evalId: d?.evalId,
      name: d?.name,
      createdDate: d?.createdDate,
      openedDate: d?.openedDate,
      dueDate: d?.dueDate,
      status:
        d?.status === "opened" ? (
          <CustomChip label={"Opened"} type="success" />
        ) : d?.status === "unopened" ? (
          <CustomChip label={"Unopened"} type="warning" />
        ) : (
          <CustomChip label={"Closed"} />
        ),
    }));
  };

  const handleViewEvaluation = (id: any) => {
    navigate("/control/evaluation-management/view-evaluation");
  };

  const handleEditEvaluation = (id: any) => {
    navigate("/control/evaluation-management/edit-evaluation");
  };

  const handleDeleteEvaluation = (id: any) => {
    setOpenAlert(true);
  };

  const actionButtons = [
    { tooltip: "View", icon: faEye, handleClick: handleViewEvaluation },
    { tooltip: "Edit", icon: faPenToSquare, handleClick: handleEditEvaluation },
    { tooltip: "Delete", icon: faTrash, handleClick: handleDeleteEvaluation },
  ];

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const handleSearch = (data: any) => {
    console.log(data);
    setShowBackdrop(true);
    setTimeout(() => {
      const evalName = data?.evaluationName;
      const status = data?.status;
      const filteredArray = tableData?.filter((item) => {
        const evalNameMatches = evalName ? item?.name === evalName : true;
        const statusMatches = status ? item?.status === status : true;
        return evalNameMatches && statusMatches;
      });
      setEvalTableData(formatData(filteredArray));
      setShowBackdrop(false);
    }, 1000);
  };

  const resetForm = () => {
    setValue("evaluationName", "");
    setValue("status", "");
    setEvalTableData(formatData(tableData));
  };

  const navigate = useNavigate();

  const handleNavigateCreateEval = () => {
    navigate("/control/evaluation-management/create-evaluation");
  };

  const notify = useNotification();

  const handleYesClick = () => {
    setOpenAlert(false);
    setShowBackdrop(true);
    setTimeout(() => {
      notify.success("Delete Success");
      setShowBackdrop(false);
    }, 1000);
  };

  const evalNameList = tableData?.map((d: any) => ({
    label: d?.name,
    value: d?.name,
  }));

  const statusList = [
    {
      label: "Opened",
      value: "opened",
    },
    {
      label: "Unopened",
      value: "unopened",
    },
  ];

  useLayoutEffect(() => {
    setEvalTableData(formatData(tableData));
  }, []);

  return (
    <>
      <AlertDialogSlide
        message={"Do you want to delete selected Evaluation?"}
        handleYesClick={handleYesClick}
        handleNoClick={() => setOpenAlert(false)}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <CustomBackdrop showBackdrop={showBackdrop} />
      <CustomButton
        text={"+ Create Evaluation"}
        variant={"contained"}
        onClick={handleNavigateCreateEval}
      />
      <Grid container spacing={2} my={2} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Total Evaluations"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Total Opened"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Total Unopened"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Total Closed"} />
        </Grid>
      </Grid>
      <Grid container spacing={2} my={2} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <FormAutocomplete
            error={false}
            helperText={""}
            setValue={setValue}
            label={"Evaluation Name"}
            options={evalNameList}
            id={"evaluationName"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <FormDatePicker
            helperText={""}
            error={false}
            label={"Date To"}
            name={"dateTo"}
            control={control}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <FormDropdown
            name={"status"}
            options={statusList}
            helperText={""}
            control={control}
            label={"Status"}
            labelId={"label-status"}
            error={false}
            fullWidth={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          display={"flex"}
          gap={2}
          alignItems={"center"}
        >
          <CustomButton
            text={"Search"}
            variant={"contained"}
            onClick={handleSubmit(handleSearch)}
          />
          <CustomButton
            text={"Clear"}
            variant={"outlined"}
            onClick={resetForm}
          />
        </Grid>
      </Grid>
      <SearchTable
        tableData={evalTableData}
        tableHeaders={tableHeads}
        id={""}
        paginate={false}
        actionButtons={actionButtons}
      />
    </>
  );
};
