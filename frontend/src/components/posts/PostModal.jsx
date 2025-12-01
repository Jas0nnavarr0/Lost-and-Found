import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { startConversation } from "../../api/conversations";
import { useNavigate } from "react-router-dom";

export default function Modal({ data, onClose, onDelete, onUpdate }) {
  if (!data) return null;

  const images = data.images && data.images.length > 0
    ? data.images
    : [
        data.image ||
        "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=600&q=80",
      ];

  const navigate = useNavigate();
  
  const [index, setIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: data.title,
    description: data.description,
    location: data.location,
    categories: data.categories || [],
    images: data.images || []
  });

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  const handleMessageClick = async () => {
    try {
      const res = await startConversation(data.id);
      navigate(`/messages/${res.data.id}`)
    } catch (err) {
      console.error("Failed to start conversation:", err);
      alert("Could not start conversation.");
    }
  };

  // DELETE (with credentials)
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/test/${data.id}`,
        { withCredentials: true }
      );

      onDelete(data.id);
      onClose();

    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete post.");
    }
  };

  // ⭐ UPDATE POST (with credentials)
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/test/${data.id}`,
        editData,
        { withCredentials: true }
      );

      onUpdate(res.data);
      setIsEditing(false);
      onClose();

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update post.");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-xl relative animate-fadeIn flex"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white shadow-md border rounded-full p-2 hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* LEFT */}
        <div className="w-1/2 h-[450px] relative bg-gray-100">
          <img src={images[index]} alt="preview" className="w-full h-full object-cover" />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="w-1/2 p-6 flex flex-col gap-4 overflow-y-auto h-[450px]">
          {isEditing ? (
            <div className="flex flex-col gap-4">

              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="border rounded-lg p-2"
              />

              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="border rounded-lg p-2"
                rows="4"
              />

              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="border rounded-lg p-2"
              />

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 text-gray-800 rounded-lg py-2 font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{data.title}</h2>
              <p className="text-gray-700">{data.description}</p>

              <div className="flex items-center gap-2 text-gray-700">
                <User size={18} className="text-gray-500" />
                <span className="text-sm">
                  <strong>Posted by:</strong> {data.username}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} className="text-gray-500" />
                <span className="text-sm">
                  <strong>Location:</strong> {data.location}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} className="text-gray-500" />
                <span className="text-sm">
                  <strong>Date:</strong> {data.createdAt ? format(new Date(data.createdAt), "PPP") : "N/A"}
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-600 mb-1">Categories</p>
                {data.categories?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {data.categories.map((cat, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">None</p>
                )}
              </div>

              <div className="flex gap-3 mt-auto">
                <button 
                  onClick={handleMessageClick}
                  className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600">
                  Message
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-yellow-400 text-white rounded-lg py-2 font-semibold hover:bg-yellow-500"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white rounded-lg py-2 font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
