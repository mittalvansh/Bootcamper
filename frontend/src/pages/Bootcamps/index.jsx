import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Group,
  Stack,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";
import BootcampCard from "../../components/BootcampCard";
import SkeletonCard from "../../components/SkeletonCard";

export default function Bootcamps() {
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const [distance, setDistance] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [averageCost, setAverageCost] = useState("");
  const [bootcamps, setBootcamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBootcamps = async (url) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setBootcamps(response.data.data);
    } catch (error) {
      console.error("Error fetching bootcamps:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/v1/bootcamps/radius/${zipcode}/${distance}`;
    fetchBootcamps(url);
    setDistance("");
    setZipcode("");
  };

  const handleCostSubmit = (e) => {
    e.preventDefault();
    const url = `${
      import.meta.env.VITE_SERVER_URL
    }/api/v1/bootcamps?averageCost[lte]=${averageCost}`;
    fetchBootcamps(url);
    setAverageCost("");
  };

  useEffect(() => {
    fetchBootcamps(`${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps`);
  }, []);

  return (
    <Grid>
      <Grid.Col
        span={isMobileView ? 12 : 3}
        style={{
          borderRight: isMobileView ? "none" : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Stack
          justify="flex-start"
          align="flex-start"
          h={isMobileView ? "auto" : "100vh"}
          p="2rem"
        >
          <Text c="#000" fz="1.75rem" fw={500}>
            Filter
          </Text>
          <form onSubmit={handleLocationSubmit}>
            <Text c="#000" fz="1.25rem" fw={500}>
              By Location
            </Text>
            <Box my="1rem">
              <TextInput
                type="number"
                placeholder="Miles From"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                styles={{ input: { border: "1px solid #000" } }}
                size="md"
                radius={0}
              />
              <TextInput
                type="number"
                placeholder="Enter Zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                styles={{ input: { border: "1px solid #000" } }}
                mt="lg"
                size="md"
                radius={0}
              />
            </Box>
            <Button type="submit" bg="#005FB8" size="md" mt="1rem" fullWidth>
              Search
            </Button>
          </form>
          <form onSubmit={handleCostSubmit} style={{ marginTop: "2rem" }}>
            <Text c="#000" fz="1.25rem" fw={500}>
              By Cost
            </Text>
            <Box my="1rem">
              <TextInput
                type="number"
                placeholder="Average Cost"
                value={averageCost}
                onChange={(e) => setAverageCost(e.target.value)}
                styles={{ input: { border: "1px solid #000" } }}
                size="md"
                radius={0}
              />
            </Box>
            <Button type="submit" bg="#005FB8" size="md" mt="1rem" fullWidth>
              Search
            </Button>
          </form>
        </Stack>
      </Grid.Col>
      <Grid.Col span={isMobileView ? 12 : 9}>
        {isLoading ? (
          <Box>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </Box>
        ) : bootcamps.length === 0 ? (
          <Group h="100vh" justify="center" align="center">
            <Text fz={isMobileView ? "1.5rem" : "2.5rem"}>
              No bootcamps found
            </Text>
          </Group>
        ) : (
          bootcamps.map((bootcamp) => (
            <BootcampCard bootcamp={bootcamp} key={bootcamp._id} />
          ))
        )}
      </Grid.Col>
    </Grid>
  );
}
