import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormTextField } from "../../components/inputs/FormTextField";
import { FormTimePicker } from "../../components/timePickers/FormTimePicker";

interface MyAttendanceFormProps {
  handleModalClose: () => void;
  id: any;
  setMyAttendanceData: any;
}

export const MyAttendanceForm = ({
  handleModalClose,
  id,
  setMyAttendanceData,
}: MyAttendanceFormProps) => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    punchIn: Yup.string(),
    punchOut: Yup.string(),
    break: Yup.number().required(commonError).typeError(commonError),
    overtime: Yup.number().required(commonError).typeError(commonError),
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
      console.log(new Date(data.punchIn).toLocaleTimeString());

      setMyAttendanceData((prev: Array<any>) => {
        let newArr = [...prev];
        const entry = newArr?.find((e: any) => e?.id === id);
        const indx = newArr.indexOf(entry);
        newArr[indx] = {
          id: entry?.id,
          sNo: entry?.sNo,
          date: "2023-11-05",
          production: 8.5,
          punchIn: new Date(data?.punchIn).toLocaleTimeString(),
          punchOut: new Date(data?.punchOut).toLocaleTimeString(),
          break: data?.break,
          overtime: data?.overtime,
          isIncompleted: false,
        };
        console.log(newArr);

        return newArr;
      });
      handleModalClose();
    }, 1000);
  };

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Typography
        // fontWeight={700}
        color={"text.secondary"}
        // fontSize={"large"}
        mb={1}
      >
        S.No: <span>1001</span>
      </Typography>
      <Typography
        // fontWeight={700}
        color={"text.secondary"}
        // fontSize={"large"}
        mb={3}
      >
        Date: <span>1 November 2023</span>
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <FormTimePicker
            label={"Punch In"}
            error={!!errors?.punchIn?.message}
            helperText={errors?.punchIn?.message?.toString()}
            name={"punchIn"}
            control={control}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormTimePicker
            label={"Punch Out"}
            error={!!errors?.punchOut?.message}
            helperText={errors?.punchOut?.message?.toString()}
            name={"punchOut"}
            control={control}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormTextField
            register={register("break")}
            label={"Break"}
            type={"number"}
            error={!!errors?.break?.message}
            helperText={errors?.break?.message?.toString()}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormTextField
            register={register("overtime")}
            label={"Overtime"}
            type={"number"}
            error={!!errors?.overtime?.message}
            helperText={errors?.overtime?.message?.toString()}
            required={true}
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
            onClick={handleSubmit(onSubmit)}
          />
        </Grid>
      </Grid>
    </>
  );
};
