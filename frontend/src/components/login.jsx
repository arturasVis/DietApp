import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Box,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./ui/password-input";
import { LoginStore } from "../../stores/logins.store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // No generic type parameter
  const LoginAction = LoginStore((state) => state.LoginStore);
  const SubmitToken = LoginStore((state) => state.SubmitToken);
  const onSubmit = handleSubmit((data) => {
    const token = LoginAction(data.username, data.password);
    if (!token) throw new Error("Wrong");
    SubmitToken(token);
    navigate("/chat");
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      padding={20}
      justifyContent={"Center"}
      alignItems={"center"}
    >
      <form onSubmit={onSubmit} flex={1}>
        <Stack spacing={4} maxW="sm">
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          {/* Password Field */}
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <PasswordInput
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
          <Button colorScheme="teal">Register</Button>
        </Stack>
      </form>
    </Box>
  );
};
