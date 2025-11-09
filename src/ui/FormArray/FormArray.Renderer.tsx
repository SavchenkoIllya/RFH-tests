import { Button, Stack, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormErrorText,
  ReusableNamesFieldsGroups,
  SHARED_DEFAULTS,
} from "../components";

export const FormArrayRenderer = () => {
  const { control, getValues, reset } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "userData",
  });

  return (
    <Stack spacing={2}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {!fields.length && <Typography>Add first</Typography>}
        <Button
          variant={"outlined"}
          endIcon={"+"}
          onClick={() =>
            append({ ...SHARED_DEFAULTS, id: new Date().getTime() })
          }
        >
          Add
        </Button>
        <Button
          variant={"outlined"}
          color={"success"}
          onClick={() =>
            reset({
              ...getValues(),
              userData: [
                {
                  id: new Date().getTime(),
                  firstName: "Na1",
                  lastName: "Las1",
                },
                {
                  id: new Date().getTime(),
                  firstName: "Na2",
                  lastName: "Las2",
                },
              ],
            })
          }
        >
          Upload
        </Button>
      </Stack>

      {fields.map((field, i) => (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <ReusableNamesFieldsGroups
            key={field.id + i}
            prefix={`userData[${i}]`}
          />

          <Button
            variant={"outlined"}
            color={"error"}
            onClick={() => remove(i)}
          >
            X
          </Button>
        </Stack>
      ))}

      <FormErrorText name={"userData"} />
    </Stack>
  );
};
