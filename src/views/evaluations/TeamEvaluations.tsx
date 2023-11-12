import { Grid } from "@mui/material";
import { CustomBackdrop } from "../../components/backdrop/CustomBackdrop";
import { CustomButton } from "../../components/buttons/CustomButton";
import { useState } from "react";
import { TopCardAttendance } from "../attendance/TopCardAttendance";

export const TeamEvaluations = () => {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);

  return (
    <>
      <CustomBackdrop showBackdrop={showBackdrop} />
      <CustomButton
        text={"+ Create Evaluation"}
        variant={"contained"}
        onClick={() => {}}
      />
      <Grid container spacing={2} my={2} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Total Evaluations"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Evaluations Completed"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Evaluations Remaining"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TopCardAttendance value={"5"} title={"Total Evaluations"} />
        </Grid>
      </Grid>
    </>
  );
};
