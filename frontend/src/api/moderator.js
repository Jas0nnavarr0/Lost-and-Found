import api from "./api";

export const getReportedPosts = () => {
  return api.get("/moderator/reports");
};

export const deletePostAsModerator = (postId) =>
  api.delete(`/moderator/delete-post/${postId}`);