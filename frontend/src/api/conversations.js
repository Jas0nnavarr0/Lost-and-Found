import api from "./api";

export const startConversation = (postId) => {
  return api.post(`/conversations/start/${postId}`);
};

export const getMyConversations = () => {

  return api.get('/conversations');
};

export const getMessages = (conversationId) => {
  return api.get(`/messages/${conversationId}`);
};

export const sendMessage = (conversationId, content) => {
  return api.post(`/messages/${conversationId}`, content, {
    headers: { "Content-Type": "text/plain" }
  });
};

