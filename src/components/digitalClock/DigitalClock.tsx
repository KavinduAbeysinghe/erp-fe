import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const DigitalClock = () => {
  const [date, setDate] = useState<any>(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatAndGetDate = (date: Date) => {
    const dat = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${dat} ${months[month - 1]} ${year}`;
  };

  const formatAndGetTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box display={"flex"} gap={1}>
      <Typography fontWeight={700} color={"text.secondary"}>
        {formatAndGetDate(date)}
      </Typography>
      <Typography fontWeight={700} color={"text.secondary"}>
        {formatAndGetTime(date)}
      </Typography>
    </Box>
  );
};
