import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { DigitalClock } from "../../components/digitalClock/DigitalClock";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ border: "1px solid black" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant={"h4"} fontWeight={700}>
          Hello John!
        </Typography>
        <DigitalClock />
      </Box>
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className={"dash-card"} p={3}></Grid>
        <Grid item sm={12} md={4} className={"dash-card"} p={3}></Grid>
        <Grid item sm={12} md={4} className={"dash-card"} p={3}></Grid>
      </Grid>
    </div>
  );
};
