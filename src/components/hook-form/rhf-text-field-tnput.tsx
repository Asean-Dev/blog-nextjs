import { Controller, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@mui/material/TextField";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextFieldInput({
  name,
  helperText,
  type,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === "number" && field.value === 0 ? "" : field.value}
          onChange={(event) => {
            if (type === "number") {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
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
          error={!!error}
          {...other}
        />
      )}
    />
  );
}
