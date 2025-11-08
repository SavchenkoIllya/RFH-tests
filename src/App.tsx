import { Container, Stack, Typography } from "@mui/material";
import { FormOnePage } from "./pages/FormOne.page";
import { FormTwoPage } from "./pages/FormTwo.page";

function App() {
  return (
    <Container>
      <Stack spacing={2}>
        <Typography variant={"h5"}>Form tests</Typography>
        <FormOnePage />
        <FormTwoPage />
      </Stack>
    </Container>
  );
}

export default App;
