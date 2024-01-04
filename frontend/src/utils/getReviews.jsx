import axios from "axios";

export default async function getReviews(id) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/bootcamps/${id}/reviews`
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      console.error("Request failed with status:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Request failed:", error);
    return null;
  }
}
