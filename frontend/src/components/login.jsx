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
import { LoginStore } from "../stores/logins.store";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = LoginStore((state) => state.login);
  const isLoading = LoginStore((state) => state.isLoading);
  const error = LoginStore((state) => state.error);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = await login(data.username, data.password);
      if (token) {
        navigate("/chat");
      }
    } catch (error) {
      // Error is handled in the store
      console.error("Login failed:", error);
    }
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={20}
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={4} maxW="sm">
          {/* Username Field */}
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

          {/* Error Message */}
          {error && (
            <FormControl isInvalid>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isLoading}
            loadingText="Logging in..."
          >
            Login
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
