import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./index.module.css";
import AuthContext from "../../context/Auth";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          Find Top Coding <br /> Bootcamps Near You
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Explore and enroll in top-rated coding bootcamps located in your area.
          Elevate your coding skills with expert-led courses designed to help
          you succeed in the tech industry. Start your learning journey today
          and take a step towards your dream career!
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
          onClick={() => {
            user?.isAuthenticated
              ? navigate("/bootcamps")
              : navigate("/signup");
          }}
        >
          Get Started
        </Button>
      </Container>
    </div>
  );
}
