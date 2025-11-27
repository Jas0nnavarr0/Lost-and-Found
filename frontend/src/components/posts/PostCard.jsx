import React from "react";

export default function PostCard2({ post, onClick }) {
  const truncate = (text, maxLength = 70) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        padding: "15px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      {/* Left image */}
      <div
        style={{
          flex: "0 0 120px",
          height: "120px",
          borderRadius: "8px",
          overflow: "hidden",
          marginRight: "15px",
        }}
      >
        <img
          src={
            post.image ||
            "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=300&q=80"
          }
          alt={post.item_name || post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "8px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold", color: "#222" }}>
            {post.item_name || post.title}
          </h3>
          <p style={{ margin: "4px 0", color: "#007bff", fontSize: "14px" }}>
            {post.category || "Uncategorized"}
          </p>
        </div>

        <p
          style={{
            margin: "6px 0",
            color: "#555",
            fontSize: "14px",
            lineHeight: "1.4",
            flex: "1 1 auto",
          }}
        >
          {truncate(post.description)}
        </p>

        <p style={{ margin: "4px 0", fontSize: "13px", color: "#777" }}>
          📍 {post.location || "Unknown location"}
        </p>

        <p style={{ margin: "4px 0", fontSize: "12px", color: "#aaa" }}>
          🕒 {post.date || "Posted recently"}
        </p>

        {/* Buttons — prevent modal from opening */}
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "8px 0",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Message
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              backgroundColor: "#f8f9fa",
              color: "#333",
              border: "1px solid #ddd",
              padding: "8px 0",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Save
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              flex: 1,
              backgroundColor: "#ffe5e5",
              color: "#b20000",
              border: "none",
              padding: "8px 0",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}