import { Box, Paper, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface TopCardAttendanceProps {
  value: string;
  title: string;
}

export const TopCardAttendance = ({ value, title }: TopCardAttendanceProps) => {
  return (
    <Box
      component={Paper}
      sx={{
        p: 3,
        borderLeft: `10px solid #3730a3`,
      }}
    >
      <Typography color={"text.secondary"}>{title}</Typography>
      <Typography textAlign={"center"} fontSize={"xx-large"} fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
};
