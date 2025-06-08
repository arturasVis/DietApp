import {
  Box,
  Divider,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./ui/password-input";

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed: ", error);
    }
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      padding={20}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={4} maxW="sm">
          {/*Username field*/}
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
          {/*Email field*/}
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <PasswordInput
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Password must contain at least one uppercase letter",
                  hasNumber: (value) =>
                    /[0-9]/.test(value) ||
                    "Password must contain at least one number",
                  hasSymbol: (value) =>
                    /[\W]/.test(value) ||
                    "Password must contain at least one symbol",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
              {errors.password &&
                errors.password.type === "hasUpperCase" &&
                errors.password.message}
              {errors.password &&
                errors.password.type === "hasSymbol" &&
                errors.password.message}
              {errors.password &&
                errors.password.type === "hasNumber" &&
                errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel>Confirm Password</FormLabel>
            <PasswordInput
              {...register("confirmPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit">Register</Button>
        </Stack>
      </form>
    </Box>
  );
};
