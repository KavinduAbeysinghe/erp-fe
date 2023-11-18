import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { FormAutocomplete } from "../../components/inputs/FormAutocomplete";

interface RemoveEventFormProps {
  handleModalClose: () => void;
  setEventList: any;
  eventList: Array<any>;
}

export const RemoveEventForm = ({
  handleModalClose,
  setEventList,
  eventList,
}: RemoveEventFormProps) => {
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

  const { setValue, watch, control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    handleModalClose();
    setShowBackdrop(true);
    setTimeout(() => {
      setEventList((prev: any) =>
        [...prev].filter((d: any) => d?.title !== data?.event)
      );
      setShowBackdrop(false);
    }, 1000);
  };

  const eL = eventList?.map((d: any) => ({ label: d?.title, value: d?.title }));

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <Grid container rowSpacing={3} columnSpacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={12}>
          <FormAutocomplete
            helperText={""}
            error={false}
            setValue={setValue}
            label={"Event"}
            options={eL}
            id={"event"}
            required={true}
            disabled={false}
            control={control}
            watch={watch}
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
