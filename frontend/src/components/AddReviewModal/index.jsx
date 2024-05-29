import React, { useState } from "react";
import { Modal, Stack, Text, TextInput, Textarea, Button } from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import axios from "axios";

export default function AddReviewModal({
  opened,
  close,
  bootcamp,
  onReviewAdded,
}) {
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("token");

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: isNotEmpty("Title is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = form.validate();
    if (validationErrors.hasErrors) {
      return;
    }
    const data = { ...form.values, rating, text: form.values.description };
    delete data.description;

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${
          bootcamp._id
        }/reviews`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );

      if (response.status === 201) {
        onReviewAdded(response.data.data);
        close();
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Write a review"
      centered
      size="lg"
      overlay={0.5}
    >
      <form onSubmit={handleSubmit}>
        <Stack w="100%" spacing="md">
          <Stack gap="8px">
            <Text fz="md" fw={600}>
              Rating : {rating}
            </Text>

            <input
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: "100%" }}
              type="range"
              name="rating"
              min="1"
              max="10"
              step="1"
            />
          </Stack>

          <TextInput
            type="text"
            label="Review Title"
            description="Give your review a title"
            placeholder="Enter review title"
            size="md"
            {...form.getInputProps("title")}
          />
          <Textarea
            type="text"
            label="Review Description"
            description="Tell us about your experience"
            placeholder="Enter review description"
            autosize
            minRows={5}
            size="md"
            {...form.getInputProps("description")}
          />
        </Stack>

        <Button
          fullWidth
          type="submit"
          size="md"
          loading={loading}
          loaderProps={{ type: "dots" }}
          mt="2rem"
        >
          Add Review
        </Button>
      </form>
    </Modal>
  );
}
