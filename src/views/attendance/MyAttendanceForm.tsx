import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormTextField } from "../../components/inputs/FormTextField";
import { CustomButton } from "../../components/buttons/CustomButton";

export const MyAttendanceForm = () => {
  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  return (
    <>
      <Typography
        fontWeight={700}
        color={"text.secondary"}
        fontSize={"large"}
        mb={1}
      >
        S.No: <span>1001</span>
      </Typography>
      <Typography
        fontWeight={700}
        color={"text.secondary"}
        fontSize={"large"}
        mb={3}
      >
        Date: <span>1 November 2023</span>
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <FormTextField
            register={"punchIn"}
            label={"Punch In"}
            type={"time"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormTextField
            register={"punchOut"}
            label={"Punch Out"}
            type={"time"}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormTextField register={"break"} label={"Break"} type={"number"} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormTextField
            register={"overtime"}
            label={"Overtime"}
            type={"number"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display={"flex"}
          justifyContent={"end"}
          alignItems={"center"}
          gap={2}
        >
          <CustomButton
            text={"Clear"}
            variant={"outlined"}
            onClick={() => {}}
          />
          <CustomButton
            text={"Save"}
            variant={"contained"}
            onClick={() => {}}
          />
        </Grid>
      </Grid>
    </>
  );
};
