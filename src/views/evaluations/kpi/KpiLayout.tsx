import { Grid } from "@mui/material";
import React, { useState } from "react";
import { FormTextField } from "../../../components/inputs/FormTextField";
import DenseTable from "../../../components/tables/DenseTable";
import { CustomButton } from "../../../components/buttons/CustomButton";

interface KpiLayoutProps {
  register: any;
  errors: any;
  tableData: Array<any>;
  index: number;
  watch: any;
}

export const KpiLayout = ({
  register,
  errors,
  tableData,
  index,
  watch,
}: KpiLayoutProps) => {
  const [listVal, setListVal] = useState<Array<any>>([]);

  const kpiName = watch(`kpiname-${index}`);

  const handleAdd = () => {
    // console.log("s");
    if (kpiName) {
      console.log(kpiName);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <FormTextField
          register={register(`kpiname-${index}`)}
          label={"KPI Name"}
          disabled={false}
          required={true}
          error={false}
          helperText={""}
        />
      </Grid>
      <Grid item md={2}>
        <CustomButton text={"+"} variant="outlined" onClick={handleAdd} />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <DenseTable tableData={tableData} tableHeaders={["#", "Name"]} />
      </Grid>
    </Grid>
  );
};
