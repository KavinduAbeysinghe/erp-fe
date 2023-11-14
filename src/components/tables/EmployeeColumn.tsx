import { Avatar, Box, Typography } from "@mui/material";
import { employees } from "../../util";

export const EmployeeColumn = (props: any) => {
  const id = props.id;

  const empObj = employees?.find((e: any) => e?.empId === id);

  return (
    <Box
      display={"flex"}
      gap={1}
      flexWrap={"wrap"}
      justifyContent={"flex-start"}
    >
      <Avatar alt="Remy Sharp" src={empObj?.profileImg} />
      <Box display={"flex"} alignItems={"flex-start"} flexDirection={"column"}>
        <Typography fontSize={"small"}>{empObj?.name}</Typography>
        <Typography fontSize={"small"} color={"text.secondary"}>
          {empObj?.designation}
        </Typography>
      </Box>
    </Box>
  );
};
