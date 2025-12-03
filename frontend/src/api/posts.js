import api from "./api";

export const getMyPosts = () =>
    api.get("/test/mine");