import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, User, Trash2 } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

export default function Modal({ data, onClose, onDelete, onUpdate }) {
  if (!data) return null;

  console.log("🔥 DATA RECEIVED BY MODAL:", data);

  const images = Array.isArray(data.images) ? data.images : data.image ? [data.image] : [];

  const [index, setIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  // EDIT MODE
  const [editData, setEditData] = useState({
    title: data.title,
    description: data.description,
    location: data.location,
    categories: data.categories || [],
    images: images,        // existing image URLs
    newFiles: []           // new files to upload
  });

  // ---------------------------------------
  // IMAGE SLIDER BUTTONS
  // ---------------------------------------
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  // ---------------------------------------
  // DELETE POST
  // ---------------------------------------
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/test/${data.id}`, { withCredentials: true });

      onDelete(data.id);
      onClose();

    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete post.");
    }
  };

  // ---------------------------------------
  // DELETE (REMOVE) IMAGE LOCALLY
  // ---------------------------------------
  const removeImage = (i) => {
    setEditData({
      ...editData,
      images: editData.images.filter((_, idx) => idx !== i)
    });
  };

  // ---------------------------------------
  // UPDATE POST (WITH FILE UPLOAD)
  // ---------------------------------------
  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      // TEXT FIELDS
      formData.append("title", editData.title);
      formData.append("description", editData.description);
      formData.append("location", editData.location);

      // EXISTING IMAGES (not deleted)
      editData.images.forEach((img) => {
        formData.append("existingImages", img);
      });

      // NEW FILES
      editData.newFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await axios.put(
        `http://localhost:5000/api/test/${data.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      onUpdate(res.data);
      setIsEditing(false);
      onClose();

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update post.");
    }
  };

  // ---------------------------------------
  // RENDER
  // ---------------------------------------
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-xl relative animate-fadeIn flex"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white shadow-md border rounded-full p-2 hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* ---------------------------------------
            LEFT SIDE — IMAGE SLIDER
        --------------------------------------- */}
        <div className="w-1/2 h-[450px] relative bg-gray-100">
          {images.length > 0 ? (
            <img
              src={images[index]}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No Images
            </div>
          )}

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

        {/* ---------------------------------------
            RIGHT SIDE — DETAILS / EDIT MODE
        --------------------------------------- */}
        <div className="w-1/2 p-6 flex flex-col gap-4 overflow-y-auto h-[450px]">

          {isEditing ? (
            // ---------------------------------------
            // EDIT MODE
            // ---------------------------------------
            <div className="flex flex-col gap-4">

              {/* TITLE */}
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="border rounded-lg p-2"
              />

              {/* DESCRIPTION */}
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="border rounded-lg p-2"
                rows="4"
              />

              {/* LOCATION */}
              <input
                type="text"
                value={editData.location}
                onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                className="border rounded-lg p-2"
              />

              {/* ---------------------------------------
                  IMAGE MANAGEMENT (PREVIEW + DELETE)
              --------------------------------------- */}
              <div>
                <p className="text-sm font-semibold mb-1">Images</p>

                {/* EXISTING IMAGES */}
                <div className="flex flex-wrap gap-2">
                  {editData.images.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      {/* TRASH ICON */}
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* UPLOAD NEW FILES */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setEditData({ ...editData, newFiles: files });
                  }}
                  className="border p-2 rounded-lg w-full mt-3"
                />
              </div>

              {/* SAVE / CANCEL BUTTONS */}
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
            // ---------------------------------------
            // VIEW MODE
            // ---------------------------------------
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
                  <strong>Date:</strong>{" "}
                  {data.createdAt ? format(new Date(data.createdAt), "PPP") : "N/A"}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-blue-500 text-white rounded-lg py-2 font-semibold hover:bg-blue-600">
                  Message
                </button>

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-yellow-400 text-white rounded-lg py-2 font-semibold hover:bg-yellow-500"
                >a
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
