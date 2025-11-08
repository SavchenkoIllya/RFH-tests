import { Box, Button, Stack } from "@mui/material";
import { useRef, useState } from "react";
import { FormOne } from "../ui/FormOne";
import { FormHandlers } from "../ui/types";

export const FormOnePage = () => {
  const formOneRef = useRef<FormHandlers>(null);
  const [isValid, setValid] = useState(false);

  return (
    <Stack spacing={1}>
      <FormOne
        ref={formOneRef}
        onSubmit={(values) => console.log(values)}
        onValidChange={setValid}
      />
      <Box>
        <Button
          variant={"contained"}
          disabled={!isValid}
          onClick={() => formOneRef.current?.submit()}
        >
          Submit form one
        </Button>
      </Box>
    </Stack>
  );
};
