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
  ...rest
}: FormTextFieldProps & TextFieldProps) => {
  return (
    <TextField
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
    />
  );
};
