import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Flex, Stack, Group, Loader, Image, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import getBootcamp from "../../utils/getBootcamp";
import getCourses from "../../utils/getCourses";
import getReviews from "../../utils/getReviews";
import { ToastContainer, toast } from "react-toastify";
import FileUpload from "../../components/FileUpload";
import AuthContext from "../../context/Auth";

export default function BootcampProfile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const isMobileView = useMediaQuery("(max-width: 768px)");

  const [bootcamp, setBootcamp] = useState({});
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState({
    page: false,
  });
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading({ ...loading, page: true });
      try {
        const [bootcampData, coursesData, reviewsData] = await Promise.all([
          getBootcamp(id),
          getCourses(id),
          getReviews(id),
        ]);
        setBootcamp(bootcampData);
        setCourses(coursesData);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading({ ...loading, page: false });
      }
    }

    fetchData();
  }, [id]);

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      <>
        {loading.page ? (
          <Flex justify="center" align="center" h="100vh">
            <Loader size={40} />
          </Flex>
        ) : (
          <Flex
            direction={isMobileView ? "column" : "row"}
            justify="center"
            align={isMobileView ? "center" : "flex-start"}
            w="100vw"
            h="100vh"
            p={isMobileView ? "0rem 2rem" : "2rem 7rem"}
          >
            <Stack
              justify={isMobileView ? "center" : "flex-start"}
              align={isMobileView ? "center" : "flex-start"}
              mb={isMobileView && "2rem"}
              mr={!isMobileView && "2rem"}
              gap="0.5rem"
            >
              <Text
                fz={isMobileView ? "1.25rem" : "1.75rem"}
                fw={600}
                c="#262626"
              >
                {bootcamp.name}
              </Text>
              <Text
                fz={isMobileView ? "1rem" : "1.25rem"}
                fw={500}
                c="#262626"
                ta={isMobileView ? "center" : "start"}
                pr={!isMobileView && "5rem"}
              >
                {bootcamp.description}
              </Text>
              <Group align="center" gap="5px" mb="0.5rem">
                <Text
                  fz={isMobileView ? "1rem" : "1.25rem"}
                  fw={500}
                  c="#262626"
                >
                  Rating :{" "}
                </Text>
                <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="red">
                  {bootcamp.averageRating ? bootcamp.averageRating : "N/A"}
                </Text>
              </Group>
            </Stack>
            <Stack justify="center" align="center">
              <Flex
                justify="center"
                align="center"
                p="2px"
                style={{
                  border: "2px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                }}
              >
                {!bootcamp.photo ? (
                  <Image
                    src={bootcamp.photo}
                    alt=""
                    w={isMobileView ? "20rem" : "24rem"}
                    h={isMobileView ? "15rem" : "18rem"}
                    style={{ borderRadius: "8px" }}
                  />
                ) : (
                  <FileUpload file={file} setFile={setFile} />
                )}
              </Flex>
            </Stack>
          </Flex>
        )}
      </>
    </>
  );
}
