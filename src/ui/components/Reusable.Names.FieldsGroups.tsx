import { Stack } from "@mui/material";
import { SharedValues } from "../../utils";
import { FormTextInput } from "./FormTextInput";
import { joinPath, PathLike } from "./utils";

export type NamesFieldsNames = "firstName" | "lastName";

type NameMap = Partial<Record<NamesFieldsNames, string>>;

export const SHARED_DEFAULTS: SharedValues = {
  firstName: "",
  lastName: "",
};

export const ReusableNamesFieldsGroups = ({
  prefix,
  map,
}: {
  prefix?: PathLike;
  map?: NameMap;
}) => {
  const target: Record<NamesFieldsNames, PathLike> = {
    firstName: map?.firstName ?? "firstName",
    lastName: map?.lastName ?? "lastName",
  };

  const path = (key: NamesFieldsNames) => joinPath(prefix, target[key]);

  return (
    <Stack direction={"row"} spacing={1} width={"100%"}>
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
