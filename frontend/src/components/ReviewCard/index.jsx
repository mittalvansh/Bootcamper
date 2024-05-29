import React from "react";
import { Box, Flex, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function ReviewCard({ review }) {
  const isMobileView = useMediaQuery("(max-width: 768px)");

  return (
    <Box w="100%" style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }} mb="1rem">
      <Flex bg="#374151" py="0.2rem">
        <Text
          fz={isMobileView ? "1rem" : "1.25rem"}
          fw={500}
          c="#fff"
          ml="0.5rem"
        >
          {review.title}
        </Text>
      </Flex>

      <Stack gap="1rem" mb="1rem" px="1rem">
        <Group align="center" gap="5px" mt="1rem">
          <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="#262626">
            Rating:{" "}
          </Text>
          <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={400} c="262626">
            {review.rating}
          </Text>
        </Group>

        <Text fz={isMobileView ? "1rem" : "1.15rem"} fw={400} c="#262626">
          {review.text}
        </Text>
      </Stack>
    </Box>
  );
}
