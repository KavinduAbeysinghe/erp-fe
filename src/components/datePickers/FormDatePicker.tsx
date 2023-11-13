import React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Controller } from "react-hook-form";

interface FormDatePickerProps {
  label: string;
  error: boolean;
  helperText: any;
  name: string;
  control: any;
  required?: boolean;
  disabled?: boolean;
}

export const FormDatePicker = ({
  label,
  error,
  helperText,
  name,
  control,
  required,
  disabled,
}: FormDatePickerProps) => {
  const format = "DD/MM/YYYY";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        render={({ field }) => (
          <DatePicker
            disabled={disabled}
            format={format}
            label={label}
            value={dayjs(field.value, format)}
            onChange={(newValue) => field.onChange(newValue)}
            slotProps={{
              textField: {
                size: "small",
                error: error,
                helperText: helperText,
                required: required,
                fullWidth: true,
                disabled: disabled,
              },
              actionBar: {
                actions: ["clear"],
              },
            }}
          />
        )}
        name={name}
        control={control}
      />
    </LocalizationProvider>
  );
};
