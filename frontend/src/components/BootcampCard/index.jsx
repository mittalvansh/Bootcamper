import React from "react";
import { Box, Flex, Stack, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function BootcampCard({ bootcamp }) {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      direction={isMobileView ? "column" : "row"}
      m={isMobileView ? "1.5rem 10%" : "2rem 10% 0.5rem"}
      pos="relative"
      className={styles.card}
      onClick={() => navigate(`/bootcamp-profile/${bootcamp._id}`)}
    >
      <Image
        src={
          bootcamp.photo
            ? bootcamp.photo
            : "https://res.cloudinary.com/drtmfrghg/image/upload/v1716415061/bootcamper/ixcrdokvkzj8dncukfff.png"
        }
        alt="bootcampImage"
        width={isMobileView ? "80vw" : "360px"}
        height="220px"
        loading="lazy"
        style={{
          borderRadius: isMobileView
            ? "0.5rem 0.5rem 0 0"
            : "0.5rem 0 0 0.5rem",
        }}
      />
      <Box m={isMobileView ? "1rem 2rem" : "2rem"}>
        <Stack gap="0.5rem">
          <Text fz={isMobileView ? "1.25rem" : "1.75rem"} fw={500}>
            {bootcamp.name}
          </Text>
          <Text pos="absolute" className={styles.city}>
            {bootcamp.location.city}
          </Text>
          <Text fz="1rem">{bootcamp.careers[0]}</Text>
          <Box>
            <span style={{ fontWeight: "bold" }}>Publisher : </span>
            <span>{bootcamp.user.name}</span>
          </Box>
        </Stack>
        <Box style={{ margin: "0.5rem 0" }}>
          <Link
            to={`/bootcamp-profile/${bootcamp._id}`}
            style={{
              textDecoration: "none",
              color: "gray",
              fontSize: "1.2rem",
            }}
          >
            View Profile
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}
