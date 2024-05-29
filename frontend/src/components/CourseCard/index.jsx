import React from "react";
import { Box, Flex, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function CourseCard({ course }) {
  const isMobileView = useMediaQuery("(max-width: 768px)");

  const renderScholarship = () => {
    return course.scholarshipAvailable ? "Yes" : "No";
  };

  return (
    <Box w="100%" style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }} mb="1rem">
      <Flex bg="#374151" py="0.2rem">
        <Text
          fz={isMobileView ? "1rem" : "1.25rem"}
          fw={500}
          c="#fff"
          ml="0.5rem"
        >
          {course.title}
        </Text>
      </Flex>
      <Box px="1rem">
        <Group gap="5px" mt="1rem">
          <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="#262626">
            Duration:{" "}
          </Text>
          <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={400} c="262626">
            {course.weeks} Weeks
          </Text>
        </Group>

        <Text
          fz={isMobileView ? "1rem" : "1.15rem"}
          fw={400}
          c="#262626"
          mt="1rem"
        >
          {course.description}
        </Text>

        <Box my="1rem">
          {["tuition", "minimumSkill"].map((key) => (
            <Box
              key={key}
              p="0.5rem"
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
            >
              <span>{key === "tuition" ? "Cost" : "Skills Required"}: </span>
              <span>
                {key === "tuition" ? `$${course[key]} USD` : course[key]}
              </span>
            </Box>
          ))}
          <Box p="0.5rem" style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
            <span>Scholarship Available: </span>
            <span>{renderScholarship()}</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
