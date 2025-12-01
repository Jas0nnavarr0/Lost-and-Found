import React from "react";

import { UserCircle, MapPin, Calendar, Images } from "lucide-react";
import { format } from "date-fns";

export default function PostCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white shadow-md border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 transition hover:shadow-lg"
    >
      {/* Username */}
      <div className="flex items-center gap-3">
        <UserCircle size={40} className="text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Posted by</p>
          <p className="font-semibold text-gray-900">
            {data.username || "Unknown"}
          </p>
        </div>
      </div>

      {/* Title */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Title</p>
        <p className="font-bold text-gray-900 text-lg">{data.title}</p>
      </div>

      {/* Description */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Description</p>
        <p className="text-gray-700 line-clamp-3">{data.description}</p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-700">
        <MapPin size={18} className="text-gray-500" />
        <span className="text-sm">{data.location || "Unknown location"}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-gray-700">
        <Calendar size={18} className="text-gray-500" />
        <span className="text-sm">
          {data.createdAt ? format(new Date(data.createdAt), "PPP") : "N/A"}
        </span>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs text-gray-500 mb-1">Categories</p>
        {data.categories?.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.categories.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No categories</p>
        )}
      </div>

      {/* Images */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Images size={18} className="text-gray-500" />
          <p className="text-xs text-gray-500">Images</p>
        </div>

        {data.images?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {data.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="uploaded"
                className="w-full aspect-square rounded-lg object-cover border border-gray-200 shadow-sm"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No images</p>
        )}
      </div>
    </div>
  );
}