import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const createPost = (postData) => {
  return axios.post(API_URL, postData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
