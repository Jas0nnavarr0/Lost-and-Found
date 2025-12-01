import React from "react";

export default function TestCard({ test, onClick }) {
  const truncate = (text, maxLength = 70) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const image =
    test.image ||
    (test.images && test.images[0]) ||
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=300&q=80";

  return (
    <div
      onClick={onClick}
      className="
        bg-white rounded-xl p-4 shadow-md border border-gray-100 cursor-pointer
        flex gap-4 transition transform hover:-translate-y-1 hover:shadow-xl
      "
    >
      {/* LEFT IMAGE */}
      <div className="w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={test.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col flex-1">
        {/* Title + Category */}
        <div className="mb-1">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {test.title}
          </h3>
          <p className="text-sm text-blue-600">
            {test.category || "Uncategorized"}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 flex-1">
          {truncate(test.description)}
        </p>

        {/* Location */}
        <p className="text-sm text-gray-500 mt-1">
          📍 {test.location || "Unknown location"}
        </p>

        {/* Date */}
        <p className="text-xs text-gray-400">
          🕒 {test.date || test.createdAt || "Recently posted"}
        </p>

        {/* BUTTONS — prevent modal from opening */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-blue-500 text-white text-sm py-2 rounded-lg font-medium hover:bg-blue-600"
          >
            Message
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 rounded-lg border hover:bg-gray-200"
          >
            Save
          </button>
          <button
            className="flex-1 bg-yellow-400 text-white rounded-lg py-2 font-semibold hover:bg-yellow-500"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-red-100 text-red-600 text-sm py-2 rounded-lg font-medium hover:bg-red-200"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}