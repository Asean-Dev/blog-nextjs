import { Controller, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@mui/material/TextField";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({
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
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              backgroundColor: "#fff",
              borderRadius: "4px",
              alignItems: "center",
              "& input": {
                paddingLeft: 0.5,
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "#A0AFBA",
              paddingX: 0.5,
              zIndex: 10,
              "&.Mui-focused": {
                color: "#fff",
              },
            },
          }}
          error={!!error}
          {...other}
        />
      )}
    />
  );
}
