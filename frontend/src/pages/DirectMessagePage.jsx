import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../api/conversations";
import { useSelector } from "react-redux";


export default function DirectMessagePage() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const bottomRef = useRef(null);

  const authUser = useSelector((state) => state.auth.user);

  const loadMessages = () => {
    getMessages(conversationId)
      .then(res => {
      console.log("MESSAGES API RESPONSE:", res.data);
      setMessages(res.data);
        })
        .catch(err => console.error("Failed to fetch messages:", err));
  };

  useEffect(() => {
    loadMessages();

    const interval = setInterval(() => {
      loadMessages();
    }, 4000);

    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim().length === 0) return;

    try {
      await sendMessage(conversationId, input);
      setInput("");
      loadMessages();
    } catch (err) {
      console.error("Failed to send message:", err);
      alert("Failed to send.");
    }
  };

  return (
  <div className="w-full h-screen flex justify-center items-center bg-gray-100">

    {/* Chat Box */}
    <div className="w-[1400px] h-[800px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((m) => {
            const isMine = m.senderId === authUser.id;

            return (
                <div
                    key={m.id}
                    className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                    >
                    <div className="text-xs text-gray-500 mb-1">
                        {m.senderUsername}
                    </div>

                    <div
                        className={`
                        px-4 py-2 rounded-xl shadow
                        max-w-[60%] break-words
                        ${isMine
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-white border rounded-bl-none"
                        }
                        `}
                    >
                        {m.content}
                    </div>

                    <div className="text-[10px] text-gray-400 mt-1">
                        {m.sentAt}
                    </div>
                </div>
            );
        })}

        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 bg-white border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-xl shadow-sm"
        />

        <button
          onClick={handleSend}
          className="px-5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
        >
          Send
        </button>
      </div>

    </div>
  </div>
);
}