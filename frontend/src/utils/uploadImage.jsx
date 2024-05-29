import axios from "axios";

const uploadImage = async (file, bootcampId, token) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${bootcampId}/photo`,
      formData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export default uploadImage;
