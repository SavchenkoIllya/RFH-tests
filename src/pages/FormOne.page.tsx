import { Box, Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { FormOne, FormOneProps } from "../ui/FormOne";
import { FormHandlers } from "../ui/types";
import { FormOneValues } from "../utils";

export const FormOnePage = ({
  label,
  defaultFormValues,
}: {
  label: string;
  defaultFormValues?: FormOneProps["defaultFormValues"];
}) => {
  const formOneRef = useRef<FormHandlers>(null);
  const [isValid, setValid] = useState(false);
  const [isEqualDefaults, setEqualDefault] = useState(true);

  const handleSubmit = (values: FormOneValues) => {
    isEqualDefaults
      ? window.alert("Equal to default" + JSON.stringify(values))
      : window.alert("Not equal to default" + JSON.stringify(values));
  };

  return (
    <Stack spacing={1}>
      <FormOne
        ref={formOneRef}
        onSubmit={handleSubmit}
        onDirtyChange={(value) => setEqualDefault(!value)}
        onValidChange={setValid}
        defaultFormValues={defaultFormValues}
      />
      <Box>
        <Button
          variant={"contained"}
          disabled={!isValid}
          onClick={() => formOneRef.current?.submit()}
        >
          {label}
        </Button>
      </Box>
    </Stack>
  );
};
