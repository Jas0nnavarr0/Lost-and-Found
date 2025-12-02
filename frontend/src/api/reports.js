import api from "./api";

export const reportPost = (postId, payload) => {
  return api.post(`/reports/${postId}`, payload);
};