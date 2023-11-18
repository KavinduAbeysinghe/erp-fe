import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Stack, Typography } from "@mui/material";

export const EmployeeCard = () => {
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "white",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      <MoreHorizIcon
        sx={{
          position: "absolute",
          float: "right",
          top: 0,
          right: 0,
          m: 1,
          cursor: "pointer",
        }}
      />
      <Box display={"flex"} gap={3} alignItems={"center"} flexWrap={"wrap"}>
        <img
          src={require("../../assets/images/person1.jpg")}
          alt="emp-img"
          height={70}
          width={70}
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <Box>
          <Typography fontWeight={700}>John Smith</Typography>
          <Typography fontSize={"small"}>Senior Software Engineer</Typography>
        </Box>
      </Box>
      <Box
        p={2}
        mt={2}
        sx={{ backgroundColor: "#efefef", borderRadius: "10px" }}
      >
        <Stack direction={"row"} flexWrap={"wrap"}>
          <Box flexGrow={1}>
            <Typography
              fontSize={"small"}
              fontWeight={700}
              color={"text.secondary"}
            >
              Department
            </Typography>
            <Typography fontSize={"small"}>R&D</Typography>
          </Box>
          <Box
            flexGrow={1}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"end"}
          >
            <Box>
              <Typography
                fontSize={"small"}
                fontWeight={700}
                color={"text.secondary"}
              >
                Hired Date
              </Typography>
              <Typography fontSize={"small"}>08-11-2023</Typography>
            </Box>
          </Box>
        </Stack>
        <Stack direction={"column"} gap={1} mt={1}>
          <Typography fontSize={"small"}>john.s@bixnexa.com</Typography>
          <Typography fontSize={"small"}>+112-112-112-112</Typography>
          <Typography fontSize={"small"}>+112-112-112-112</Typography>
        </Stack>
      </Box>
    </Box>
  );
};
