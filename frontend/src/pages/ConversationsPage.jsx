import { Link } from "react-router-dom";
import { getMyConversations } from "../api/conversations";
import { useEffect, useState } from "react";

const ConversationsPage = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getMyConversations()
      .then(res => setConversations(res.data))
      .catch(err => console.error("Failed to load conversations:", err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Conversations</h1>

      {conversations.length === 0 && (
        <p className="text-gray-500">No conversations yet.</p>
      )}

      <div className="flex flex-col gap-4">
        {conversations.map((convo) => (
          <Link
            key={convo.id}
            to={`/messages/${convo.id}`}
            className="p-4 bg-white shadow border rounded-lg hover:shadow-md transition"
          >
            <div className="font-semibold text-lg">
              Post: {convo.postTitle}
            </div>

            <div className="text-sm text-gray-600">
              With: {convo.user1Username} & {convo.user2Username}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Started: {convo.createdAt}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ConversationsPage;