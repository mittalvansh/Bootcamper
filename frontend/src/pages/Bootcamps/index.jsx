import { useState, useEffect } from "react";
import { Box, Grid, Stack, Text, TextInput, Button } from "@mantine/core";
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

  const getBootcamps = () => {
    const URL = `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps`;
    let QUERY = "";
    if (averageCost) {
      QUERY = QUERY + "?averageCost[lte]=" + averageCost.toString();
    }
    axios
      .get(URL + QUERY)
      .then((response) => {
        setIsLoading(false);
        setBootcamps(response.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getBootcampsByDistance = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/v1/bootcamps/radius/${zipcode}/${distance}`
      )
      .then((response) => {
        setIsLoading(false);
        setBootcamps(response.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getBootcamps();
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              getBootcampsByDistance();
            }}
          >
            <Text c="#000" fz="1.25rem" fw={500}>
              By Location
            </Text>
            <Box my="1rem">
              <TextInput
                type="number"
                placeholder="Miles From"
                styles={{ input: { border: "1px solid #000" } }}
                size="md"
                radius={0}
              />
              <TextInput
                type="number"
                placeholder="Enter Zipcode"
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              getBootcamps();
            }}
            style={{ marginTop: "2rem" }}
          >
            <Text c="#000" fz="1.25rem" fw={500}>
              By Cost
            </Text>
            <Box my="1rem">
              <TextInput
                type="number"
                placeholder="Average Cost"
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
        ) : (
          bootcamps.map((bootcamp) => {
            return <BootcampCard bootcamp={bootcamp} key={bootcamp._id} />;
          })
        )}
      </Grid.Col>
    </Grid>
  );
}
