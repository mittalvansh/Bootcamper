import axios from "axios";

const deleteBootcamp = async (id, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    return response.status;
  } catch (error) {
    throw new Error("Error deleting bootcamp");
  }
};

export default deleteBootcamp;
