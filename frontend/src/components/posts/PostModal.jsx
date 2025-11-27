import React, { useState } from "react";

export default function PostModal2({ post, onClose }) {
  const [index, setIndex] = useState(0);

  const images = post.images || [
    post.image ||
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=600&q=80",
  ];

  const nextImage = () => {
    if (images.length > 1) {
      setIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 2000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          display: "flex",
          position: "relative",   // ← REQUIRED for close button absolute positioning
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          animation: "modalIn 0.25s ease",
        }}
      >

        {/* ✅ CLOSE BUTTON AT TOP RIGHT */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "white",
            border: "1px solid #ddd",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            zIndex: 20,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          ✕
        </button>
        {/* END CLOSE BUTTON */}



        {/* LEFT: IMAGE AREA */}
        <div
          style={{
            width: "50%",
            height: "450px",
            position: "relative",
            backgroundColor: "#f0f0f0",
          }}
        >
          <img
            src={images[index]}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {images.length > 1 && (
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.😎",
                border: "none",
                padding: "8px 10px",
                borderRadius: "50%",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ‹
            </button>
          )}

          {images.length > 1 && (
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.😎",
                border: "none",
                padding: "8px 10px",
                borderRadius: "50%",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* RIGHT PANEL */}

        <div
          style={{
            width: "50%",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",

            height: "450px",
            overflowY: "auto",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "26px", fontWeight: "bold" }}>{post.title}</h2>

          <p style={{ fontSize: "14px", color: "#555" }}>{post.description}</p>
          <p style={{ fontSize: "15px" }}>
            <strong>Finder:</strong> {post.finder || "Unknown"}
          </p>
          <p style={{ fontSize: "15px" }}>
            <strong>Category:</strong> {post.category || "Unknown"}
          </p>

          <p style={{ fontSize: "15px" }}>
            <strong>Location:</strong> {post.location || "Unknown"}
          </p>

          <p style={{ fontSize: "15px" }}>
            <strong>Date:</strong> {post.date || "Recently"}
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "auto" }}>
            <button
              style={{
                flex: 1,
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 0",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Message
            </button>

            <button
              style={{
                flex: 1,
                background: "#eee",
                border: "1px solid #ccc",
                padding: "10px 0",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            <button
              style={{
                flex: 1,
                background: "#ffe5e5",
                border: "none",
                padding: "10px 0",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#b20000",
                fontWeight: "600",
              }}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}