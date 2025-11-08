import { Stack } from "@mui/material";
import { FormTextInput } from "./FormTextInput";

export type NamesFieldsNames = "firstName" | "lastName";

type NameMap = Partial<Record<NamesFieldsNames, string>>;

export const ReusableNamesFieldsGroups = ({
  prefix,
  map,
}: {
  prefix?: string;
  map?: NameMap;
}) => {
  const target = {
    firstName: map?.firstName ?? "firstName",
    lastName: map?.lastName ?? "lastName",
  };

  const path = (key: NamesFieldsNames) =>
    prefix ? `${prefix}.${target[key]}` : target[key];

  return (
    <Stack direction={"row"} spacing={1}>
      <FormTextInput
        name={path("firstName")}
        fieldProps={{ label: "firstName" }}
      />
      <FormTextInput
        name={path("lastName")}
        fieldProps={{ label: "lastName" }}
      />
    </Stack>
  );
};
