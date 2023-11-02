import { Button, ButtonProps, styled } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  text: string;
}

export const CustomButton = ({ text, variant, ...rest }: CustomButtonProps) => {
  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    boxShadow: "none",
    border: "none",
    "&:hover": {
      boxShadow: "inherit",
    },
  }));

  return (
    <StyledButton variant={variant} {...rest} fullWidth>
      {text}
    </StyledButton>
  );
};
