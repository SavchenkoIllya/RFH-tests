import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

export const FormTextInput = ({
  name,
  fieldProps,
}: {
  name: string;
  fieldProps?: TextFieldProps;
}) => {
  const { setValue, getFieldState } = useFormContext();
  const { error, invalid } = getFieldState(name);
  const value = useWatch({ name });

  return (
    <TextField
      onChange={(event) =>
        setValue(name, event.target.value, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        })
      }
      value={value}
      error={invalid}
      helperText={error?.message}
      fullWidth
      {...fieldProps}
    />
  );
};
