import { Box, Flex, Stack, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function SkeletonCard() {
  const isMobileView = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      direction={isMobileView ? "column" : "row"}
      m="2rem 10% 1rem"
      pr={isMobileView ? "0" : "2rem"}
      style={{
        borderRadius: "0.5rem",
        boxShadow: "2px 0px 10px rgba(142, 140, 140, 0.5)",
      }}
    >
      <Box
        mr={!isMobileView && "1rem"}
        mb={isMobileView && "1rem"}
        style={{ flex: "1" }}
      >
        <Skeleton
          width={isMobileView ? "80vw" : "360px"}
          height={220}
          animate={true}
        />
      </Box>
      <Stack
        justify="center"
        gap="0.5rem"
        p={isMobileView && "1rem"}
        style={{ flex: "3" }}
      >
        <Skeleton
          animation="wave"
          width={200}
          height={isMobileView ? 25 : 35}
        />
        <Skeleton h={isMobileView ? 24 : 28} animate={false} />
        <Skeleton h={isMobileView ? 24 : 28} animate={false} />
        <Skeleton h={isMobileView ? 24 : 28} animate={false} />
      </Stack>
    </Flex>
  );
}
