import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Grid,
  Stack,
  Text,
  Image,
  Button,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useForm, isEmail } from "@mantine/form";
import backgroundImg from "../../assets/Image.jpg";
import AuthContext from "../../context/Auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
      password: (value) => {
        return value.trim().length < 6 ? "Password is too short" : null;
      },
    },
  });

  function notify(message) {
    toast(message, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = form.validate();
    if (validationErrors.hasErrors) {
      return;
    }
    const values = { ...form.values };

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notify("Logged in successfully!");
      setUser({
        isAuthenticated: true,
        userData: response.data.data,
      });
      window.localStorage.setItem("token", `Bearer ${response.data.token}`);
      setTimeout(() => {
        setLoading(false);
        navigate("/bootcamps");
      }, 3500);
    } catch (error) {
      setLoading(false);
      notify(error.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      <Grid h="100vh" w="100vw" overflow="hidden">
        <Grid.Col span={isMobileView ? 12 : 4}>
          <form onSubmit={handleSubmit}>
            <Flex
              direction="column"
              justify="center"
              align="center"
              h="100vh"
              px={isMobileView ? "1rem" : "3rem"}
            >
              <Text size="2rem" fw={600} mb="0.5rem">
                Sign In
              </Text>
              <Stack gap="0.2rem" w="100%">
                <TextInput
                  type="email"
                  placeholder="Email"
                  styles={{ input: { border: "1px solid #000" } }}
                  mt="md"
                  size="lg"
                  radius={0}
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  styles={{ input: { border: "1px solid #000" } }}
                  mt="md"
                  size="lg"
                  radius={0}
                  {...form.getInputProps("password")}
                />

                <Button
                  type="submit"
                  loading={loading}
                  loaderProps={{ type: "dots" }}
                  mt="2rem"
                  size="md"
                  fullWidth
                >
                  Sign In
                </Button>
                <Text size="md" c="gray" ta="center">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{
                      textDecoration: "underline",
                      fontWeight: "bold",
                      color: "gray",
                    }}
                  >
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Flex>
          </form>
        </Grid.Col>
        <Grid.Col span={isMobileView ? 0 : 8}>
          <Image src={backgroundImg} alt="background" h="100vh" />
        </Grid.Col>
      </Grid>
    </>
  );
}
