import React, { useState } from "react";
import {
  Modal,
  Stack,
  Group,
  TextInput,
  Textarea,
  Radio,
  Button,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";

export default function AddCourseModal({
  opened,
  close,
  bootcamp,
  onCourseAdded,
}) {
  const [minimumSkill, setMinimumSkill] = useState("beginner");
  const [scholarshipAvailable, setScholarshipAvailable] = useState("false");
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("token");

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      weeks: "",
      tuition: "",
    },
    validate: {
      title: isNotEmpty("Title is required"),
      description: isNotEmpty("Description is required"),
      weeks: isNotEmpty("Weeks is required"),
      tuition: isNotEmpty("Tuition is required"),
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = form.validate();
    if (validationErrors.hasErrors) {
      return;
    }
    const data = { ...form.values, minimumSkill, scholarshipAvailable };
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${
          bootcamp._id
        }/courses`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      if (response.status === 201) {
        onCourseAdded(response.data.data);
        close();
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Add Course"
      size="lg"
      overlay={0.5}
    >
      <form onSubmit={handleSubmit}>
        <Stack w="100%" spacing="md">
          <TextInput
            type="text"
            label="Course Title"
            description="Give your course a title"
            placeholder="Enter course title"
            size="md"
            {...form.getInputProps("title")}
          />
          <Textarea
            type="text"
            label="Course Description"
            description="Tell us about your course"
            placeholder="Enter course description"
            autosize
            minRows={3}
            size="md"
            {...form.getInputProps("description")}
          />
          <TextInput
            type="text"
            label="Weeks"
            description="Enter number of weeks"
            placeholder="Enter number of weeks"
            size="md"
            {...form.getInputProps("weeks")}
          />
          <TextInput
            type="text"
            label="Tuition"
            description="Enter tuition cost"
            placeholder="Enter tuition cost"
            size="md"
            {...form.getInputProps("tuition")}
          />
          <Radio.Group
            value={scholarshipAvailable}
            onChange={setScholarshipAvailable}
            name="scholarshipAvailable"
            label="Scholarship Available"
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="true" label="Yes" />
              <Radio value="false" label="No" />
            </Group>
          </Radio.Group>
          <Radio.Group
            value={minimumSkill}
            onChange={setMinimumSkill}
            name="minimumSkill"
            label="Select Minimum Skill"
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="beginner" label="Beginner" />
              <Radio value="intermediate" label="Intermediate" />
              <Radio value="advanced" label="Advanced" />
            </Group>
          </Radio.Group>
        </Stack>

        <Button
          fullWidth
          type="submit"
          mt="2rem"
          loading={loading}
          loaderProps={{ type: "dots" }}
          size="md"
        >
          Add Course
        </Button>
      </form>
    </Modal>
  );
}
