import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const createPost = (post) => {
  return axios.post(API_URL, post);
};

export const getPosts = () => {
  return axios.get(API_URL);
};