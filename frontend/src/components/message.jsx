import { Box, Flex, Text } from "@chakra-ui/react";

export const Message = ({ sender, content }) => {
  const isUser = sender === "user";
  return (
    <Flex 
      justifyContent={isUser ? "flex-end" : "flex-start"} 
      mb={4} 
      width="100%"
      flexShrink={0}
    >
      <Box
        bg={isUser ? "blue.500" : "gray.200"}
        color={isUser ? "white" : "black"}
        px={4}
        py={2}
        borderRadius="lg"
        maxWidth="80%"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
        overflowWrap="break-word"
      >
        <Text overflowWrap="break-word">{content}</Text>
      </Box>
    </Flex>
  );
};
