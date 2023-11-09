import { Chip } from "@mui/material";

interface ChipProps {
  label: string;
  type?: "success" | "warning" | "error";
}

export const CustomChip = ({ label, type }: ChipProps) => {
  return <Chip label={label} color={type} size={"small"} />;
};
