import { TextField, TextFieldProps } from "@mui/material";

interface FormTextFieldProps {
  register: any;
}

export const FormTextField = ({
  id,
  register,
  label,
  disabled,
  helperText,
  required,
  error,
  type,
  ...rest
}: FormTextFieldProps & TextFieldProps) => {
  return (
    <TextField
      type={type}
      {...rest}
      id={id}
      label={label}
      variant="outlined"
      fullWidth
      error={error}
      {...register}
      helperText={helperText}
      required={required}
      disabled={disabled}
      size={"small"}
      sx={
        {
          // "& .MuiInputBase-input.Mui-disabled": {
          //   color: "rgba(0, 0, 0, 0.6)",
          // },
        }
      }
      InputLabelProps={
        {
          // style: { color: disabled ? "gray" : "black" },
        }
      }
    />
  );
};
