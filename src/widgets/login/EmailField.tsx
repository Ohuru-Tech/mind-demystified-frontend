import { TextField } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

type EmailFieldProps = {
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  disabled?: boolean;
  size?: "small" | "medium";
};

export const EmailField = ({
  name,
  control,
  errors,
  disabled,
  size = "small",
}: EmailFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          type={"email"}
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
          message: "Email is required",
        },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      }}
    />
  );
};
