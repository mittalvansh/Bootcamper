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
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconAt } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useForm, isEmail } from "@mantine/form";
import backgroundImg from "../../assets/Image.webp";
import AuthContext from "../../context/Auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;
  const [role, setRole] = useState("user");
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
              <Text size="2rem" fw={500} mb="1.5rem">
                Register Now
              </Text>
              <Stack gap="0.2rem" w="100%">
                <TextInput
                  label="Username"
                  description="Username must be unique"
                  placeholder="Enter Username"
                  mt="md"
                  size="md"
                  radius={0}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  type="email"
                  label="Email"
                  description="Email must be unique"
                  placeholder="Enter Email"
                  leftSectionPointerEvents="none"
                  leftSection={icon}
                  mt="md"
                  size="md"
                  radius={0}
                  {...form.getInputProps("email")}
                />
                <PasswordInput
                  type="password"
                  label="Password"
                  description="Password must be at least 6 characters"
                  placeholder="Enter Password"
                  mt="md"
                  size="md"
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
                    <Radio value="user" label="Student" />
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
