import api from "./api";

export const fetchUsers = () => api.get("/admin/users");

export const fetchModerators = () => api.get("/admin/moderators");

export const grantModerator = (userId) =>
    api.post(`/admin/grant-mod/${userId}`);

export const revokeModerator = (userId) =>
    api.post(`/admin/revoke-mod/${userId}`);
