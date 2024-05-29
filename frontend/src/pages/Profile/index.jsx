import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import backgroundImg from "../../assets/backgroundImg.jpg";
import avatarImg from "../../assets/avatar.png";
import { useMediaQuery } from "@mantine/hooks";
import { Box, Stack, Image, Text, Button } from "@mantine/core";
import AuthContext from "../../context/Auth";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Profile() {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const { user } = useContext(AuthContext);
  const data = user.userData;

  return (
    <ProtectedRoute>
      <Box
        pos="relative"
        m={isMobileView ? "3rem 1rem" : "3rem"}
        style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }}
      >
        <Image src={backgroundImg} alt="" w="100%" h="15rem" />
        <Text pos="absolute" className={styles.role}>
          {data && data.role}
        </Text>
        <Stack
          justify="center"
          align="center"
          p="1rem"
          gap="0.5rem"
          className={styles.details}
        >
          <Image
            src={avatarImg}
            alt=""
            w="5rem"
            h="5rem"
            mx="0.5rem"
            className={styles.avatar}
          />
          <Text fz="1.5rem" fw={500} mb="0.5rem">
            {data && data.name}
          </Text>
          <Box>
            <span style={{ fontWeight: "bold" }}>Email : </span>
            <span>{data && data.email}</span>
          </Box>
          <Box>
            <span style={{ fontWeight: "bold" }}>Member Since : </span>
            <span>{data && data.createdAt.slice(0, 10)}</span>
          </Box>
          {data && data.role === "publisher" && (
            <Box mt="1rem">
              <Button
                size="md"
                bg="#005FB8"
                c="#fff"
                onClick={() => navigate("/createbootcamp")}
              >
                Create Bootcamp
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
