import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

interface FormInputAutoCompleteFieldProps {
  error: boolean;
  helperText: string | undefined;
  setValue: (id: any, value: any) => void;
  label: string;
  options: any[];
  id: string;
  required: boolean;
  disabled: boolean;
  control: any;
  watch: any;
}

export const FormAutocomplete = ({
  error,
  helperText,
  label,
  control,
  setValue,
  options,
  id,
  required,
  disabled,
  watch,
}: FormInputAutoCompleteFieldProps) => {
  const [inputValue, setInputValue] = useState<any>("");
  const [temp, setTemp] = useState<any>("");

  // Sorting the option alphabetically according to the label
  useEffect(() => {
    options.sort((a, b) => {
      const labelA = a?.label?.toLowerCase();
      const labelB = b?.label?.toLowerCase();
      if (labelA > labelB) return 1;
      if (labelA < labelB) return -1;
      return 0;
    });
  }, [options]);

  const val = watch(id);

  useEffect(() => {
    if (val) {
      if (typeof val === "object") {
        setTemp(val);
      } else {
        setTemp(options.find((e) => e.value == val) ?? "");
      }
    } else {
      setTemp(val);
    }
  }, [val, options]);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      error={error}
      required={required}
      disabled={disabled}
    >
      {/*<InputLabel id={`label-for-${id}`}>{label}</InputLabel>*/}
      <Controller
        control={control}
        name={id}
        render={({ field: { value, onChange } }) => {
          return (
            <Autocomplete
              size={"small"}
              disabled={disabled}
              fullWidth
              value={temp ?? ""}
              onChange={(event: any, newValue: any) => {
                setValue(id, newValue?.value ?? "");
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id={id}
              freeSolo
              autoHighlight
              clearOnBlur
              loadingText={"Loading..."}
              options={options}
              sx={{
                padding: 0,
                margin: 0,
                paddingTop: 0,
              }}
              renderInput={(params) => (
                <TextField
                  error={error}
                  label={label}
                  {...params}
                  sx={{
                    margin: 0,
                  }}
                />
              )}
            />
          );
        }}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
