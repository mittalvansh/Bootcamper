import { useContext } from "react";
import {
  AppShell,
  Menu,
  Avatar,
  Text,
  Image,
  Button,
  rem,
  Burger,
  Group,
  UnstyledButton,
} from "@mantine/core";
import { IconPhoto, IconSearch, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../assets/logo.svg";
import avatarImg from "../../assets/avatar.png";
import classes from "./index.module.css";
import AuthContext from "../../context/Auth";

export default function MainAppShell({ children }) {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="lg">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Image
              src={logo}
              alt=""
              height={40}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <Group gap="1rem" visibleFrom="sm">
              <Button size="md" onClick={() => navigate("/bootcamps")}>
                Browse All Bootcamps
              </Button>
              {!user.isAuthenticated ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              ) : (
                <Menu shadow="lg" width={200} position="top-end">
                  <Menu.Target>
                    <Avatar
                      src={avatarImg}
                      size="md"
                      radius="xl"
                      style={{ border: "2px solid #000", cursor: "pointer" }}
                    />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => navigate("/profile")}
                      leftSection={
                        <IconPhoto
                          style={{ width: rem(24), height: rem(24) }}
                        />
                      }
                    >
                      <Text fz="1rem" fw={400}>
                        My Profile
                      </Text>
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => navigate("/bootcamps")}
                      leftSection={
                        <IconSearch
                          style={{ width: rem(24), height: rem(24) }}
                        />
                      }
                    >
                      <Text fz="1rem" fw={400}>
                        Browse Bootcamps
                      </Text>
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                      color="red"
                      onClick={() => {
                        window.localStorage.removeItem("token");
                        navigate("/login");
                      }}
                      leftSection={
                        <IconTrash
                          style={{ width: rem(24), height: rem(24) }}
                        />
                      }
                    >
                      <Text fz="1rem" fw={400}>
                        Logout
                      </Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton
          className={classes.control}
          onClick={() => navigate("/bootcamps")}
        >
          Browse All Bootcamps
        </UnstyledButton>
        {!user.isAuthenticated ? (
          <UnstyledButton
            onClick={() => navigate("/signup")}
            className={classes.control}
          >
            Sign Up
          </UnstyledButton>
        ) : (
          <>
            <UnstyledButton
              onClick={() => navigate("/profile")}
              className={classes.control}
            >
              My Profile
            </UnstyledButton>
            <UnstyledButton
              onClick={() => {
                window.localStorage.removeItem("token");
                navigate("/login");
              }}
              className={classes.control}
            >
              Logout
            </UnstyledButton>
          </>
        )}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
