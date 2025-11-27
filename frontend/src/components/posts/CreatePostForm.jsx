import React, { useState } from 'react';
import {createPost} from "../../api/create_post.js";

import {
  Camera,
  MapPin,
  Calendar,
  ArrowLeft,
  X,
  AlertCircle,
  Lock,
  CheckCircle2,
  User,
} from 'lucide-react';

const POST_TYPE = 'found';

const CATEGORIES = [
  'Electronics', 'Pets', 'Keys', 'Wallet', 'Clothing', 'Documents', 'Jewelry', 'Other'
];

const CreatePostForm = () => {

  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    title: '',
    category: '',
    date: '',
    description: '',
    location: '',
    securityQuestion: '',
  });

  const primaryBg = 'bg-yellow-400';
  const buttonTextClass = 'text-blue-900';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setForm(prev => ({ ...prev, category }));
  };

  const handleImageUpload = () => {
    if (images.length < 4) {
      setImages([...images, 'https://placehold.co/200x200/4c4c4c/ffffff?text=Item']);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    const postData = {
      postType: POST_TYPE,
      title: form.title,
      category: form.category,
      description: form.description,
      date: form.date,
      location: form.location,
      images: images,
    };

    try {
      const res = await createPost(postData);  //send to backend
      console.log("Post saved to backend:", res.data);
      alert("Post created successfully!");

      // Reset form
      setImages([]);
      setForm({
        title: '',
        category: '',
        date: '',
        description: '',
        location: '',
        securityQuestion: '',
      });

    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      handlePublish();
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-12">

      {/* --- Navbar (Title Bar) --- */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="font-bold text-lg text-gray-800">Create Found Post</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 pt-8">

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* --- Fixed Post Type Display --- */}
          <div className="py-4 text-center font-bold text-yellow-800 bg-yellow-50 border-b border-yellow-200">
             I Found Something
          </div>

          {/* --- Form Content --- */}
          <div className="p-6 sm:p-8 space-y-8">

            {/* SECTION 1: Details, Location, and Photos */}
            <section className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-800">Item Details, Location & Photos</h2>

                {/* Item Name */}
                <div>
                  <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
                    Item Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    placeholder="e.g. iPhone 13 Pro Max"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0 transition shadow-sm"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Category <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {CATEGORIES.map(cat => (
                      <button
                        type="button" // Important: Prevents button from submitting the form
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition ${
                          form.category === cat
                            ? 'bg-yellow-400 text-blue-900 border-yellow-500 shadow-md'
                            : 'border-gray-200 text-gray-600 hover:border-yellow-400 hover:text-yellow-700 hover:bg-yellow-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                   <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
                   <textarea
                      rows="4"
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0 transition resize-none shadow-sm"
                      placeholder="Describe the item in detail. Include scratches, unique marks, color, or contents for verification."
                   ></textarea>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">Date Found</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={form.date}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0 transition shadow-sm"
                      />
                    </div>
                  </div>
                  {/* Location */}
                  <div>
                     <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-2">Found Location <span className="text-red-500">*</span></label>
                     <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={form.location}
                          onChange={handleInputChange}
                          placeholder="Enter address, building, or landmark where the item was found"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:border-yellow-500 focus:bg-white focus:ring-0 transition shadow-sm"
                          required
                        />
                     </div>
                  </div>
                </div>

                {/* Photos (Image Uploading) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Photos (Max 4)</label>
                  <div className="grid grid-cols-4 gap-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden group shadow-md border border-gray-200">
                        <img src={img} alt="Upload" className="w-full h-full object-cover" />
                        <button
                          type="button" // Important: Prevents button from submitting the form
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-100 transition hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {images.length < 4 && (
                      <button
                        type="button" // Important: Prevents button from submitting the form
                        onClick={handleImageUpload}
                        className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-yellow-500 hover:text-yellow-500 hover:bg-yellow-50 transition gap-2 shadow-sm"
                      >
                        <Camera size={24} />
                        <span className="text-xs font-medium">Add Photo</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                    <AlertCircle size={14} className="text-yellow-500 flex-shrink-0" />
                    Adding clear photos significantly boosts match chances.
                  </p>
                </div>
            </section>
          </div>

          {/* --- Footer Actions -- */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">

            <button
              type="button"
              onClick={handlePublish}
              className="px-6 py-2.5 text-gray-500 font-bold hover:text-gray-900 transition rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex items-center gap-2
                ${primaryBg} ${buttonTextClass} hover:opacity-90`}
            >
              Publish Post
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default CreatePostForm;