import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormDatePicker } from "../../components/datePickers/FormDatePicker";
import { FormTextField } from "../../components/inputs/FormTextField";

interface AddEventFormProps {
  handleModalClose: () => void;
  setEventList: any;
}

export const AddEventForm = ({
  handleModalClose,
  setEventList,
}: AddEventFormProps) => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  const commonError = "Field is required";

  const validationSchema = Yup.object().shape({
    eventTitle: Yup.string().required(commonError),
    startDate: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
    endDate: Yup.string()
      .required(commonError)
      .test("required-err", commonError, (value) => {
        return !(value === undefined || value === null || value === "");
      }),
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

  const formatDate = (date: any) => {
    if (!date) {
      return "";
    } else {
      return dayjs(date, "YYYY-MM-DD").format().split("T")[0];
    }
  };

  const onSubmit = (data: any) => {
    handleModalClose();
    setShowBackdrop(true);
    setTimeout(() => {
      setEventList((prev: any) => {
        const newArr = [...prev];
        newArr.push({
          title: data?.eventTitle,
          start: new Date(formatDate(data?.startDate)),
          end: new Date(formatDate(data?.endDate)),
        });
        console.log(newArr);
        return newArr;
      });
      setShowBackdrop(false);
    }, 1000);
  };

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Grid container rowSpacing={3} columnSpacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={12}>
          <FormTextField
            register={register("eventTitle")}
            label={"Event Title"}
            disabled={false}
            required={true}
            error={!!errors?.eventTitle?.message}
            helperText={errors?.eventTitle?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormDatePicker
            helperText={errors?.startDate?.message?.toString()}
            error={!!errors?.startDate?.message}
            label={"Starting Date"}
            name={"startDate"}
            control={control}
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <FormDatePicker
            helperText={errors?.endDate?.message?.toString()}
            error={!!errors?.endDate?.message}
            label={"Ending Date"}
            name={"endDate"}
            control={control}
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
