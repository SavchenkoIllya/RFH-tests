import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

export const FormTextInput = ({
  name,
  fieldProps,
}: {
  name: string;
  fieldProps?: TextFieldProps;
}) => {
  const { getFieldState, register } = useFormContext();
  const { error, invalid } = getFieldState(name);
  const value = useWatch({ name });

  return (
    <TextField
      {...register(name)}
      value={value}
      error={invalid}
      helperText={error?.message}
      fullWidth
      {...fieldProps}
    />
  );
};
