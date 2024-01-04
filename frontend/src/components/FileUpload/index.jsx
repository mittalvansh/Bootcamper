import { Box, Flex, Stack, Image, Text } from "@mantine/core";
import styles from "./index.module.css";
import { IconFilePlus } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";

export default function FileUpload(props) {
  function notify(message) {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      progress: undefined,
    });
  }

  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (file.size > 2097152) {
      notify("File is too big!");
    } else {
      props.setFile(file);
    }
  };

  return (
    <>
      <ToastContainer
        toastStyle={{ backgroundColor: "#262626", color: "#fff" }}
      />
      {!props.file ? (
        <Stack
          justify="center"
          align="center"
          bg="#edf2f7"
          miw="320px"
          mih="230px"
          gap="4px"
          style={{ borderRadius: "8px" }}
        >
          <Box pos="relative" mb="1.5em">
            <input type="file" onChange={uploadHandler} accept="image/*" />
            <button>
              <IconFilePlus size={24} strokeWidth={2} color={"white"} />
              Upload
            </button>
          </Box>

          <Text fz="1rem" fw={500} mb="0.2em" c="#4a5068a5">
            Supported files
          </Text>
          <Text fz="0.8rem" fw={400} c="#4a5068a5">
            JPG, PNG
          </Text>
          <Text>Size Limit : 2Mb</Text>
        </Stack>
      ) : (
        <Flex
          justify="center"
          align="center"
          bg="#edf2f7"
          miw="20rem"
          mih="15rem"
        >
          <Image
            src={URL.createObjectURL(props.file)}
            alt=""
            maw="20rem"
            mah="30rem"
          />
        </Flex>
      )}
    </>
  );
}
