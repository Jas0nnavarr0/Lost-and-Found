import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const createPost = (postData) => {
  const token = localStorage.getItem("token");  // <--- IMPORTANT

  return axios.post(API_URL, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
};