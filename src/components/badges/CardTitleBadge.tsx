import { Typography } from "@mui/material";
import React from "react";

interface CardTitleBadgeProps {
  title: string;
}

export const CardTitleBadge = ({ title }: CardTitleBadgeProps) => {
  return (
    <Typography
      fontWeight={700}
      color={"#fff"}
      className="card-heading"
      sx={{
        // backgroundColor: "primary.dark",
        position: "absolute",
        mt: -5.5,
        px: 3,
        borderRadius: "7px",
        py: 1,
      }}
    >
      {title}
    </Typography>
  );
};
