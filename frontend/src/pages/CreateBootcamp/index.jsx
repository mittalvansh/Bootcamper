import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Stack,
  TextInput,
  Textarea,
  TagsInput,
  Text,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ToastContainer, toast } from "react-toastify";
import { useForm, isEmail, isNotEmpty, hasLength } from "@mantine/form";
import RadioGroup from "../../components/RadioGroup";
import ProtectedRoute from "../../components/ProtectedRoute";
import axios from "axios";

export default function CreateBootcamp() {
  const navigate = useNavigate();
  const isMobileView = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    housing: "",
    jobAssistance: "",
    jobGuarantee: "",
    acceptGi: "",
  });
  const authToken = localStorage.getItem("token");

  function notify(message) {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      careers: [],
      email: "",
      website: "",
      phone: "",
      address: "",
    },
    validate: {
      name: hasLength({ min: 5 }, "Name must be at least 5 characters long"),
      description: hasLength(
        { min: 100 },
        "Description must be at least 100 characters long"
      ),
      careers: isNotEmpty("Careers must be at least 1 career"),
      email: isEmail("Invalid email"),
      website: isNotEmpty("Website is required"),
      phone: isNotEmpty("Phone is required"),
      address: isNotEmpty("Address is required"),
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = form.validate();
    let radioFieldEmpty = false;

    if (
      !formData.housing ||
      !formData.jobAssistance ||
      !formData.jobGuarantee ||
      !formData.acceptGi
    ) {
      radioFieldEmpty = true;
    }

    if (validationErrors.hasErrors) {
      return;
    }

    if (radioFieldEmpty) {
      if (radioFieldEmpty) {
        notify("Please select all options in the radio groups");
      }
      return;
    }
    const data = { ...form.values, ...formData };
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      if (response.status === 201) {
        setLoading(false);
        notify("Bootcamp created successfully!");
        setTimeout(() => {
          navigate("/bootcamps");
        }, 3500);
      }
    } catch (error) {
      setLoading(false);
      notify(error.response.data.error);
    }
  };

  return (
    <ProtectedRoute>
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      <Box m="2rem">
        <Text
          fz={isMobileView ? "1.75rem" : "2.5rem"}
          fw={600}
          ta="center"
          mb="2rem"
        >
          Create a bootcamp
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex
            direction={isMobileView ? "column" : "row"}
            justify="space-around"
            align="flex-start"
            gap={isMobileView && "2rem"}
          >
            <Stack
              justify="flex-start"
              w={isMobileView ? "100%" : "45%"}
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              p="1.5rem 2rem"
              mb={!isMobileView && "2rem"}
            >
              <Text
                fz={isMobileView ? "1.25rem" : "1.75rem"}
                fw={500}
                my="1rem"
              >
                Bootcamp Details
              </Text>
              <TextInput
                type="text"
                label="Bootcamp Name"
                description="Name of the bootcamp"
                placeholder="Enter Bootcamp's Name"
                size="md"
                {...form.getInputProps("name")}
              />
              <Textarea
                type="text"
                label="Bootcamp Description"
                description="Tell us a little bit about the bootcamp"
                placeholder="Enter Bootcamp's Description"
                autosize
                minRows={3}
                size="md"
                {...form.getInputProps("description")}
              />
              <TagsInput
                label="Career Options"
                description="Select all that apply"
                placeholder="Select Career Options"
                data={[
                  "Web Development",
                  "Mobile Development",
                  "UI/UX",
                  "Data Science",
                  "Business",
                  "Other",
                ]}
                comboboxProps={{
                  transitionProps: {
                    transition: "pop",
                    position: "bottom",
                    duration: 200,
                  },
                }}
                size="md"
                {...form.getInputProps("careers")}
              />
              <TextInput
                type="email"
                label="Bootcamp Email"
                description="Contact email for the bootcamp"
                placeholder="Enter Bootcamp's Email"
                size="md"
                {...form.getInputProps("email")}
              />
              <TextInput
                type="url"
                label="Bootcamp Website"
                description="Website of the bootcamp"
                placeholder="Enter Bootcamp's Website"
                size="md"
                {...form.getInputProps("website")}
              />
              <TextInput
                type="tel"
                label="Bootcamp Phone Number"
                description="Contact phone number for the bootcamp"
                placeholder="Enter Bootcamp's Phone Number"
                size="md"
                {...form.getInputProps("phone")}
              />
            </Stack>
            <Stack
              justify="flex-start"
              w={isMobileView ? "100%" : "45%"}
              style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
              p="1.5rem 2rem"
              mb={"1rem"}
            >
              <Text
                fz={isMobileView ? "1.25rem" : "1.75rem"}
                fw={500}
                my="1rem"
              >
                Location Details
              </Text>
              <TextInput
                type="text"
                label="Bootcamp Address"
                description="Street address of the bootcamp"
                placeholder="Enter Bootcamp's Address"
                size="md"
                {...form.getInputProps("address")}
              />
              <RadioGroup
                value={formData.housing}
                onChange={(value) =>
                  setFormData({ ...formData, housing: value })
                }
                name="housing"
                label="Select Housing"
                withAsterisk
              />
              <RadioGroup
                value={formData.jobAssistance}
                onChange={(value) =>
                  setFormData({ ...formData, jobAssistance: value })
                }
                name="jobAssistance"
                label="Select Job Assistance"
                withAsterisk
              />
              <RadioGroup
                value={formData.jobGuarantee}
                onChange={(value) =>
                  setFormData({ ...formData, jobGuarantee: value })
                }
                name="jobGuarantee"
                label="Select Job Guarantee"
                withAsterisk
              />
              <RadioGroup
                value={formData.acceptGi}
                onChange={(value) =>
                  setFormData({ ...formData, acceptGi: value })
                }
                name="acceptGi"
                label="Select Accept Gi Bill"
                withAsterisk
              />
              <Button
                type="submit"
                bg="#262626"
                c="#fff"
                loading={loading}
                my="2rem"
                size="lg"
              >
                Add Bootcamp
              </Button>
            </Stack>
          </Flex>
        </form>
      </Box>
    </ProtectedRoute>
  );
}
