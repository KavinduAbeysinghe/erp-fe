import { Avatar, Box, Typography } from "@mui/material";

interface AvatarDetailsProps {
  profileImg: any;
  name: string;
  designation: string;
  empNo: string;
}

export const AvatarDetail = ({
  profileImg,
  name,
  designation,
  empNo,
}: AvatarDetailsProps) => {
  return (
    <Box display={"flex"} mb={5} gap={2} alignItems={"center"}>
      <Avatar
        alt="Remy Sharp"
        src={profileImg}
        sx={{ width: 100, height: 100 }}
      />
      <Box>
        <Typography fontWeight={700} fontSize={"xx-large"}>
          {name}
        </Typography>
        <Typography color={"text.secondary"} fontSize={"medium"}>
          {designation}
        </Typography>
        <Typography color={"text.secondary"} fontSize={"small"}>
          Emp No: {empNo}
        </Typography>
      </Box>
    </Box>
  );
};
