// src/App.js
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Chat } from "./components/Chat";

function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <Box minH={"100vh"}>
      <Chat messages={messages} onNewMessage={handleNewMessage} />
    </Box>
  );
}

export default App;
