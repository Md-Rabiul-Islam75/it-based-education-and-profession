// src/services/jobPostService.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api/jobpost";

export const getJobPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getjobpostbywebscrape`);

    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch job posts:", error);
    return [];
  }
};
