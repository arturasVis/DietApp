import { Box, Button, HStack, Textarea, VStack } from "@chakra-ui/react";
import { Message } from "./message";
import useTextAreaStore from "../../stores/useTextAreaStore";
import { useChatGPTStore } from "../../stores/chat.store";
/*export const Chat = () => { 
 * example of calling an api with fetch
  const [data, setData] = useState(null);
  useEffect((messsage) => {
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: messsage }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!data) return <div>Loading...</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};*/

export const Chat = ({ messages = [], onNewMessage }) => {
  const inputValue = useTextAreaStore((state) => state.inputText);
  const setInputValue = useTextAreaStore((state) => state.setInputValue);
  const submitInput = useTextAreaStore((state) => state.submitInput);
  const sendMessage = useChatGPTStore((state) => state.sendMessage);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return; // Don't send empty messages

    const messageText = inputValue.trim();

    // Add user message
    onNewMessage?.({ sender: "user", content: messageText });

    // Clear input
    submitInput();

    try {
      // Send message and wait for response
      const response = await sendMessage(messageText);
      // Add bot response using the direct response rather than the store state
      onNewMessage?.({ sender: "chat", content: response });
    } catch (error) {
      console.error("Error sending message:", error);
      onNewMessage?.({
        sender: "chat",
        content: "Sorry, there was an error processing your message.",
      });
    }
  };

  return (
    <Box 
      h="100vh" 
      maxH="100vh" 
      padding={"20px"} 
      display="flex" 
      flexDirection="column"
    >
      <VStack 
        flex={1} 
        spacing={4} 
        maxH="calc(100vh - 40px)" 
        overflow="hidden"
      >
        <Box
          width={"50%"}
          maxWidth={"50%"}
          flex={1}
          bg={"red.200"}
          rounded={"md"}
          padding={"4"}
          overflowY="auto"
          display="flex"
          flexDirection="column"
          maxH="calc(100vh - 180px)"
        >
          {messages &&
            messages.map((msg, index) => (
              <Message key={index} sender={msg.sender} content={msg.content} />
            ))}
        </Box>
        <Box width="50%" minH="100px" maxH="100px">
          <form onSubmit={handleSubmit} style={{ height: "100%" }}>
            <HStack height="100%" alignItems="flex-start" spacing={4}>
              <Textarea
                value={inputValue}
                onChange={handleChange}
                width={"full"}
                resize="none"
                height="100%"
                maxHeight="100%"
                overflowY="auto"
                placeholder="Type your message..."
              />
              <Button type="submit" height="100%" px={8}>
                Send
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};
