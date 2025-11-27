import React, { useEffect, useState } from "react";
import PostCard from "./PostCard2";
import Filter from "./Filter";
import PostModal from "./PostModal2";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        title: "Lost Wallet",
        finder: "Tonny",
        description: "Black leather wallet lost near the library.",
        category: "Accessories",
        location: "Campus Library",
        date: "2 hours ago",
      },
      {
        id: 2,
        title: "Found Keys",
        description: "A set of car keys found in the parking lot.",
        category: "Keys",
        location: "Parking Lot B",
        date: "Yesterday",
        images: [
                "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=300&q=80",
                "https://vehicle-images.dealerinspire.com/cdaf-110008689/thumbnails/large/1FA6P8CF8S5402512/a1acb198906e6daaa3fde62fc36d2bb0.jpg"
              ]
      },
      {
        id: 3,
        title: "Lost Phone",
        description: "iPhone 12 Phone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrPhone 12 lost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrlost in the student centerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr.",
        category: "Electronics",
        location: "Student Center",
        date: "3 days ago",
      },
      {
        id: 4,
        title: "Found Backpack",
        description: "Blue backpack found near the cafeteria.",
        category: "Bags",
        location: "Cafeteria",
        date: "5 days ago",
      },
      {
        id: 5,
        title: "Lost Headphones",
        description: "White AirPods case lost in room 203.",
        category: "Electronics",
        location: "Room 203",
        date: "Last week",
      },
    ];

    setPosts(dummyPosts);
  }, []);

  return (
    <div style={{ padding: "30px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* MODAL POPUP */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}

      <Filter />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "24px",
          justifyContent: "center",
        }}
      >
        {posts.map((post) => (
          <div key={post.id} onClick={() => setSelectedPost(post)}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}