import { Box, Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { FormThree } from "../ui/FormArray";
import { FormHandlers } from "../ui/types";

export const FormArrayPage = () => {
  const formThreeRef = useRef<FormHandlers>(null);
  const [isValid, setValid] = useState(false);

  return (
    <Stack spacing={1}>
      <FormThree
        ref={formThreeRef}
        onSubmit={(values) => console.log(values)}
        onValidChange={setValid}
      />
      <Box>
        <Button
          variant={"contained"}
          disabled={!isValid}
          onClick={() => formThreeRef.current?.submit()}
        >
          Submit form array
        </Button>
      </Box>
    </Stack>
  );
};
