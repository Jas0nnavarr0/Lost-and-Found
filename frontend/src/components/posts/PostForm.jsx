import React, { useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Camera,
  X,
  AlertCircle,
  MapPin,
  FileText,
} from "lucide-react";

const CATEGORIES = [
  "ELECTRONICS", "CLOTHING", "PETS", "KEYS", "WALLET",
  "DOCUMENTS", "JEWELRY", "BOOKS", "TOYS", "OTHER"
];

export default function PostForm() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    categories: [],
  });

  const [images, setImages] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategory = (cat) => {
    if (form.categories.includes(cat)) {
      setForm((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== cat),
      }));
      return;
    }

    if (form.categories.length < 3) {
      setForm((prev) => ({
        ...prev,
        categories: [...prev.categories, cat],
      }));
    } else {
      alert("You can select up to 3 categories only.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 3) {
      alert("You can upload max 3 images.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const uploadImages = async () => {
    const urls = [];

    for (const img of images) {
      const formData = new FormData();
      formData.append("file", img);

      const res = await axios.post(
        "http://localhost:5000/api/test/upload",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      urls.push(res.data.url);
    }

    return urls;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const urls = await uploadImages();

      await axios.post(
        "http://localhost:5000/api/test",
        {
          ...form,
          images: urls
        },
        {
          withCredentials: true
        }
      );

      alert("Post created!");

      setForm({
        title: "",
        description: "",
        location: "",
        categories: [],
      });
      setImages([]);

    } catch (err) {
      console.error(err);
      alert("Failed to submit post.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg">Submit Item</h1>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-2xl shadow-lg p-6 space-y-6"
        >
          <h2 className="text-center font-bold text-xl text-blue-900">New Post</h2>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInput}
                className="w-full pl-10 border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-bold mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleInput}
              className="w-full border px-4 py-2 rounded-lg"
            ></textarea>
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-bold mb-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleInput}
                className="w-full pl-10 border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <label className="block text-sm font-bold mb-2">Categories (max 3)</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategory(cat)}
                  className={`px-3 py-2 rounded-lg border text-sm transition ${
                    form.categories.includes(cat)
                      ? "bg-blue-200 border-blue-400"
                      : "border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* IMAGES */}
          <div>
            <label className="block text-sm font-bold mb-1">Upload Images (max 3)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />

            <div className="grid grid-cols-3 gap-2 mt-3">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-full aspect-square object-cover rounded-lg"
                    alt=""
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((_, index) => index !== i)
                      )
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <AlertCircle size={14} className="text-blue-500" />
              Clear photos help with identification.
            </p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold"
          >
            Submit Post
          </button>
        </form>
      </main>
    </div>
  );
}


