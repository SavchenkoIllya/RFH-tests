import { Box, Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { FormTwo } from "../ui/FormTwo";
import { FormHandlers } from "../ui/types";

export const FormTwoPage = () => {
  const formTwoRef = useRef<FormHandlers>(null);
  const [isValid, setValid] = useState(false);

  return (
    <Stack spacing={1}>
      <FormTwo
        ref={formTwoRef}
        onSubmit={(values) => console.log(values)}
        onValidChange={setValid}
      />
      <Box>
        <Button
          variant={"contained"}
          disabled={!isValid}
          onClick={() => formTwoRef.current?.submit()}
        >
          Submit form two
        </Button>
      </Box>
    </Stack>
  );
};
