import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { ArrowLeft, UserCircle, MapPin, Calendar, Images } from "lucide-react";
import Modal from "./PostModal";
import PostCard from "./PostCard";

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
            <PostCard
              key={u.id}
              data={u}
              onClick={() => setSelectedUser(u)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}


