import React from "react";
import { Flex, Text } from "@mantine/core";

export default function BootcampAttribute({ label, value, isAvailable }) {
  return (
    <Flex
      justify="start"
      align="center"
      style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }}
      p="0.5rem"
    >
      <Text fz="1rem" fw={500} c="#262626">
        {label} :{" "}
      </Text>
      <Text fz="1rem" fw={500} c={isAvailable ? "green" : "red"} ml="0.5rem">
        {value}
      </Text>
    </Flex>
  );
}
