import { Box, Typography } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface TopCardAttendanceProps {
  data: any;
}

export const TopCardAttendance = ({ data }: TopCardAttendanceProps) => {
  const d = data;

  return (
    <Box
      className={"shadow2"}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        p: 3,
        borderLeft: `10px solid ${d?.borderColor}`,
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
        <Typography color={"text.secondary"}>{d?.title}</Typography>
        <FilterAltIcon className={"custom-icon"} fontSize={"small"} />
      </Box>
      <Typography textAlign={"center"} fontSize={"xx-large"} fontWeight={700}>
        {d?.value}
      </Typography>
    </Box>
  );
};
