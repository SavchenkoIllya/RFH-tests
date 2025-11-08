import { Stack } from "@mui/material";
import { FormTextInput, ReusableNamesFieldsGroups } from "../components";

export const FormOneContent = () => {
  return (
    <Stack spacing={2}>
      <ReusableNamesFieldsGroups />
      <FormTextInput name={"email"} fieldProps={{ label: "email" }} />
    </Stack>
  );
};
