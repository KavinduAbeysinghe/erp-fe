import { Button, ButtonProps, styled } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  text: string;
}

export const CustomButton = ({
  text,
  variant,
  fullWidth,
  ...rest
}: CustomButtonProps) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    boxShadow: "none",
    [variant === "contained" ? "border" : ""]: "none",
    "&:hover": {
      boxShadow: "inherit",
    },
  }));

  return (
    <StyledButton variant={variant} {...rest} fullWidth={!!fullWidth}>
      {text}
    </StyledButton>
  );
};
