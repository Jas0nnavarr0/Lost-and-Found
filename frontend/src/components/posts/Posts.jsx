import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ArrowLeft, UserCircle, MapPin, Calendar, Images } from "lucide-react";
import Modal from "./PostModal";

export default function Posts() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // FETCH POSTS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/test", { withCredentials: true })
      .then((res) => {
        console.log("Received from backend:", res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  // Delete callback
  const handlePostDelete = (deletedId) => {
    setUsers((prev) => prev.filter((u) => u.id !== deletedId));
    setSelectedUser(null);
  };

  // Update callback
  const handlePostUpdate = (updatedPost) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedPost.id ? updatedPost : u))
    );
    setSelectedUser(updatedPost);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
      {selectedUser && (
        <Modal
          data={selectedUser}
          onClose={() => setSelectedUser(null)}
          onDelete={handlePostDelete}
          onUpdate={handlePostUpdate}
        />
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg text-gray-800">Users & Posts</h1>
          <div className="w-8"></div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Users</h2>

        {users.length === 0 && (
          <p className="text-gray-500 text-center py-12">No users found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className="cursor-pointer bg-white shadow-md border border-gray-100 rounded-2xl p-6 flex flex-col gap-4 transition hover:shadow-lg"
            >
              {/* Username */}
              <div className="flex items-center gap-3">
                <UserCircle size={40} className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Posted by</p>
                  <p className="font-semibold text-gray-900">
                    {u.username || "Unknown"}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Title</p>
                <p className="font-bold text-gray-900 text-lg">{u.title}</p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-gray-700 line-clamp-3">{u.description}</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} className="text-gray-500" />
                <span className="text-sm">{u.location || "Unknown location"}</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} className="text-gray-500" />
                <span className="text-sm">
                  {u.createdAt ? format(new Date(u.createdAt), "PPP") : "N/A"}
                </span>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Categories</p>
                {u.categories?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {u.categories.map((cat, i) => (
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

                {u.images?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {u.images.map((img, idx) => (
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
          ))}
        </div>
      </main>
    </div>
  );
}


