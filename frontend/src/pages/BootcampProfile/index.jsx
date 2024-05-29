import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Box,
  Flex,
  Stack,
  Group,
  Button,
  Loader,
  Image,
  Text,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useParams, useNavigate } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import getBootcamp from "../../utils/getBootcamp";
import getCourses from "../../utils/getCourses";
import getReviews from "../../utils/getReviews";
import getBootcampAttributes from "../../utils/bootcampAttributes";
import deleteBootcamp from "../../utils/deleteBootcamp";
import uploadImage from "../../utils/uploadImage";
import CourseCard from "../../components/CourseCard";
import BootcampAttribute from "../../components/BootcampAttribute";
import FileUpload from "../../components/FileUpload";
import AuthContext from "../../context/Auth";
import AddCourseModal from "../../components/AddCourseModal";
import AddReviewModal from "../../components/AddReviewModal";
import ReviewDrawer from "../../components/ReviewDrawer";

export default function BootcampProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const authToken = localStorage.getItem("token");
  const { user } = useContext(AuthContext);

  const [bootcamp, setBootcamp] = useState({});
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState({
    page: false,
    addFile: false,
    delete: false,
  });
  const [file, setFile] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedReview, { open: openReview, close: closeReview }] =
    useDisclosure(false);
  const [
    openedWriteReview,
    { open: openWriteReview, close: closeWriteReview },
  ] = useDisclosure(false);

  const attributes = getBootcampAttributes(bootcamp);
  const isAuthorized = user.userData && user.userData._id === bootcamp.user;

  const notify = useCallback((message) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }, []);

  const fetchData = useCallback(async () => {
    setLoading((prev) => ({ ...prev, page: true }));
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
      setLoading((prev) => ({ ...prev, page: false }));
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onCourseAdded = (newCourse) => {
    notify("Course added successfully");
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const onReviewAdded = (newReview) => {
    notify("Review added successfully");
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleDelete = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      const status = await deleteBootcamp(id, authToken);
      if (status === 200) {
        notify("Bootcamp deleted successfully");
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, delete: false }));
          navigate("/bootcamps");
        }, 3000);
      }
    } catch (error) {
      setLoading((prev) => ({ ...prev, delete: false }));
      notify("Something went wrong");
    }
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete Bootcamp",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this bootcamp? This action is
          irreversible.
        </Text>
      ),
      labels: { confirm: "Delete bootcamp", cancel: "No, don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: handleDelete,
    });

  const handleFileUpload = async () => {
    setLoading((prev) => ({ ...prev, addFile: true }));

    if (!file) {
      setLoading((prev) => ({ ...prev, addFile: false }));
      toast.error("Please select a file");
      return;
    }

    if (user.userData && bootcamp.user !== user.userData._id) {
      setLoading((prev) => ({ ...prev, addFile: false }));
      toast.error("You are not authorized to add files to this bootcamp");
      return;
    }

    try {
      const response = await uploadImage(file, id, authToken);
      if (response.status === 200) {
        notify("File uploaded successfully");
        setTimeout(() => {
          setLoading((prev) => ({ ...prev, addFile: false }));
          navigate("/bootcamps");
        }, 3000);
      }
    } catch (error) {
      setLoading((prev) => ({ ...prev, addFile: false }));
      notify("Something went wrong");
    }
  };

  if (loading.page) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Loader size={40} />
      </Flex>
    );
  }

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      <AddCourseModal
        opened={opened}
        close={close}
        bootcamp={bootcamp}
        onCourseAdded={onCourseAdded}
      />
      <AddReviewModal
        opened={openedWriteReview}
        close={closeWriteReview}
        bootcamp={bootcamp}
        onReviewAdded={onReviewAdded}
      />
      <ReviewDrawer
        opened={openedReview}
        onClose={closeReview}
        reviews={reviews}
      />
      <Flex
        direction={isMobileView ? "column" : "row"}
        justify="flex-start"
        align={isMobileView ? "center" : "flex-start"}
        m={isMobileView ? "2rem" : "2rem 7rem"}
        h="100vh"
      >
        <Stack
          justify={isMobileView ? "center" : "flex-start"}
          align={isMobileView ? "center" : "flex-start"}
          mb={isMobileView && "2rem"}
          mr={!isMobileView && "2rem"}
          gap="0.5rem"
        >
          <Text fz={isMobileView ? "1.25rem" : "1.75rem"} fw={600} c="#262626">
            {bootcamp.name}
          </Text>
          <Text
            fz={isMobileView ? "1rem" : "1.25rem"}
            fw={400}
            c="#262626"
            ta={isMobileView ? "center" : "start"}
            pr={!isMobileView && "3rem"}
          >
            {bootcamp.description}
          </Text>
          <Group align="center" gap="5px">
            <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="#262626">
              Average Course Cost:{" "}
            </Text>
            <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="red">
              {bootcamp.averageCost ? `$${bootcamp.averageCost}` : "N/A"}
            </Text>
          </Group>
          <Group align="center" gap="5px" mb="0.5rem">
            <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="#262626">
              Rating:{" "}
            </Text>
            <Text fz={isMobileView ? "1rem" : "1.25rem"} fw={500} c="red">
              {bootcamp.averageRating ? bootcamp.averageRating : "N/A"}
            </Text>
          </Group>
          <Box w="100%" mt="1rem">
            {courses.map((course) => (
              <CourseCard
                course={course}
                bootcamp={bootcamp}
                key={course._id}
              />
            ))}
          </Box>
        </Stack>
        <Stack justify="center" align="center" gap="1rem">
          <Flex
            justify="center"
            align="center"
            p="2px"
            style={{ border: "2px solid rgba(0, 0, 0, 0.1)" }}
          >
            {bootcamp.photo ? (
              <Image
                src={bootcamp.photo}
                alt=""
                w={isMobileView ? "20rem" : "24rem"}
                h={isMobileView ? "15rem" : "18rem"}
              />
            ) : (
              <FileUpload file={file} setFile={setFile} />
            )}
          </Flex>
          {!bootcamp.photo && (
            <Button
              fullWidth
              variant="outline"
              color="#374151"
              size="md"
              fz="1.25rem"
              loading={loading.addFile}
              loaderProps={{ type: "dots" }}
              onClick={handleFileUpload}
            >
              Upload Image
            </Button>
          )}
          {isAuthorized && (
            <Button
              fullWidth
              color="#374151"
              size="md"
              fz="1.25rem"
              style={{ borderRadius: "0px" }}
              onClick={open}
            >
              Add Courses
            </Button>
          )}
          <Box w="100%">
            {attributes.map((attribute) => (
              <BootcampAttribute
                key={attribute.label}
                label={attribute.label}
                value={attribute.value}
                isAvailable={attribute.isAvailable}
              />
            ))}
          </Box>
          {reviews.length > 0 && (
            <Button
              fullWidth
              variant="outline"
              color="#374151"
              size="md"
              fz="1.25rem"
              style={{ borderRadius: "0px" }}
              onClick={openReview}
            >
              View Reviews
            </Button>
          )}
          {user.userData && user.userData.role === "user" && (
            <Button
              fullWidth
              variant="light"
              color="#374151"
              size="md"
              fz="1.25rem"
              style={{ borderRadius: "0px" }}
              onClick={openWriteReview}
            >
              Write a Review
            </Button>
          )}
          {isAuthorized && (
            <Button
              fullWidth
              leftSection={<IconTrash size={20} />}
              variant="outline"
              color="red"
              size="md"
              fz="1.25rem"
              mb="2rem"
              loading={loading.delete}
              loaderProps={{ type: "dots" }}
              style={{ borderRadius: "0px" }}
              onClick={openDeleteModal}
            >
              Delete Bootcamp
            </Button>
          )}
        </Stack>
      </Flex>
    </>
  );
}
