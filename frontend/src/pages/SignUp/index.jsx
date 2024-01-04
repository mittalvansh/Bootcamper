import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Grid,
  Stack,
  Group,
  Text,
  Image,
  Button,
  TextInput,
  PasswordInput,
  Radio,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { useForm, isEmail } from "@mantine/form";
import backgroundImg from "../../assets/Image.jpg";
import AuthContext from "../../context/Auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const [role, setRole] = useState("student");
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value) => {
        return value.trim() === "" ? "Name is required" : null;
      },
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
    const values = { ...form.values, role };
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/auth/register`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      notify("Account Created!");
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
              <Text size="2rem" fw={500} mb="0.5rem">
                Register Now
              </Text>
              <Stack gap="0.2rem" w="100%">
                <TextInput
                  type="text"
                  placeholder="Username"
                  styles={{ input: { border: "1px solid #000" } }}
                  mt="md"
                  size="lg"
                  radius={0}
                  {...form.getInputProps("name")}
                />
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
                <Radio.Group
                  value={role}
                  onChange={setRole}
                  mt="md"
                  name="role"
                  label="Select Role"
                  withAsterisk
                >
                  <Group mt="xs">
                    <Radio value="student" label="Student" />
                    <Radio value="publisher" label="Publisher" />
                  </Group>
                </Radio.Group>

                <Button
                  type="submit"
                  loading={loading}
                  loaderProps={{ type: "dots" }}
                  mt="2rem"
                  size="md"
                  fullWidth
                >
                  Sign Up
                </Button>
                <Text size="md" c="gray" ta="center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "underline",
                      fontWeight: "bold",
                      color: "gray",
                    }}
                  >
                    Sign In
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
