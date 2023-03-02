import { Stack, Container } from "@chakra-ui/react";

import Dashboard from "./components/Dashboard";
import TodoContainer from "./components/TodoContainer";

const App = () => {
  return (
    <Stack direction="column" minH="100vh" padding={"14px"}>
      <Container maxW="900px">
        <Dashboard />
        <TodoContainer />
      </Container>
    </Stack>
  );
};

export default App;
