// src/App.js
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Chat } from "./components/Chat";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <Box minH={"100vh"}>
      <Routes>
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat messages={messages} onNewMessage={handleNewMessage} />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
