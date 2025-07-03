import { TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

type NameFieldProps = {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
  size?: "small" | "medium";
};

export const NameField = ({
  name,
  control,
  errors,
  disabled,
  size = "small",
}: NameFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type={"text"}
          variant={"outlined"}
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
          disabled={disabled}
          size={size}
        />
      )}
      rules={{
        required: {
          value: true,
          message: "Name is required",
        },
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters",
        },
      }}
    />
  );
};
