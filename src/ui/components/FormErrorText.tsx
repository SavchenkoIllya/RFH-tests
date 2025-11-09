import { Typography, TypographyProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const FormErrorText = ({
  name,
  textProps,
}: {
  name: string;
  textProps?: TypographyProps;
}) => {
  const { getFieldState } = useFormContext();
  const { error, invalid } = getFieldState(name);

  if (!invalid) return null;

  return (
    <Typography variant={"caption"} color={"error"} {...textProps}>
      {error?.message}
    </Typography>
  );
};
