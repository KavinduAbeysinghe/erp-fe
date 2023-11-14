import { Grid } from "@mui/material";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { useState } from "react";
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
      name: "Sample Evaluation 001",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "closed",
    },
    {
      evalId: "1002",
      name: "Sample Evaluation 001",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "unopened",
    },
    {
      evalId: "1002",
      name: "Sample Evaluation 001",
      createdDate: "2023-11-01",
      openedDate: "2023-11-02",
      dueDate: "2023-11-10",
      status: "closed",
    },
    {
      evalId: "1003",
      name: "Sample Evaluation 001",
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

  const teamEvalData = formatData(tableData);

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
  };

  const resetForm = () => {};

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
            options={[]}
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
            options={[]}
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
        tableData={teamEvalData}
        tableHeaders={tableHeads}
        id={""}
        paginate={false}
        actionButtons={actionButtons}
      />
    </>
  );
};
