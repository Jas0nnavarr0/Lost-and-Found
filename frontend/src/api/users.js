import api from './api';

export const getUserInfo = () => api.get('/auth/retrieve_user_info');