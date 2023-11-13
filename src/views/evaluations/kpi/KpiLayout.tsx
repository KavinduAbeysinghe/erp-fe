import { Grid } from "@mui/material";
import React from "react";
import { FormTextField } from "../../../components/inputs/FormTextField";
import DenseTable from "../../../components/tables/DenseTable";
import { CustomButton } from "../../../components/buttons/CustomButton";

interface KpiLayoutProps {
  register: any;
  errors: any;
  tableData: Array<any>;
}

export const KpiLayout = ({ register, errors, tableData }: KpiLayoutProps) => {
  return (
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
      <Grid item md={2}>
        <CustomButton text={"+"} variant="outlined" />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <DenseTable tableData={tableData} tableHeaders={["#", "Name"]} />
      </Grid>
    </Grid>
  );
};
