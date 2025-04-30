import type { AutocompleteProps } from "@mui/material/Autocomplete";

import { Controller, useFormContext } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

// ----------------------------------------------------------------------

export type AutocompleteBaseProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  "renderInput"
>;

export type RHFAutocompleteProps = AutocompleteBaseProps & {
  name: string;
  label?: any;
  placeholder?: string;
  hiddenLabel?: boolean;
  helperText?: React.ReactNode;
};

export function RHFAutocomplete({
  name,
  label,
  helperText,
  hiddenLabel,
  placeholder,
  ...other
}: RHFAutocompleteProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          value={field.value ?? null}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#49A569",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#49A569",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#49A569", // สี label เมื่อ focus
                },
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
                form: { autocomplete: "off" },
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
