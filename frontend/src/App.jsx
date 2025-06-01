// src/App.js
import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Chat } from "./components/Chat";

function App() {
  return (
    <Box minH={"100vh"}>
      <Chat></Chat>
    </Box>
  );
}

export default App;
