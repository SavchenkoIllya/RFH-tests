import { Container, Stack, Typography } from "@mui/material";
import { FormOnePage } from "./pages/FormOne.page";
import { FormTwoPage } from "./pages/FormTwo.page";

function App() {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant={"h5"}>Form tests</Typography>
        <FormOnePage label={"Submit form one"} />
        <FormOnePage
          label={"Submit form one with defaults"}
          defaultFormValues={{
            firstName: "Joh",
            lastName: "Doe",
            email: "email@email.lo",
          }}
        />
        <FormTwoPage />
      </Stack>
    </Container>
  );
}

export default App;
