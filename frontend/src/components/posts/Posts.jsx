import { FaExclamationTriangle } from "react-icons/fa";
import PostCard from "./PostCard";

// Contains all posts in view
const Posts = () => {
    const isInLoadingState = false;
    const error = "";

    const posts = [
        {
            postId: 322,
            postTitle: "Lost TI-84",
            image: "https://placehold.co/550x350",
            description: "Calculator that is black and white",
            location: "Engineering Building"
        },
        {
            postId: 522,
            postTitle: "Lost Pen",
            image: "https://placehold.co/550x350",
            description: "Pen that is red",
            location: "Science Building"
        },
        {
            postId: 132,
            postTitle: "Lost Charger",
            image: "https://placehold.co/550x350",
            description: "Apple charger.",
            location: "Engineering Building"
        },
        {
            postId: 132,
            postTitle: "Lost airpods",
            image: "https://placehold.co/550x350",
            description: "Airpods.",
            location: "Duncan Hall"
        }
    ]
    
    return (
        <div className="lg:px-15 sm:px-9 px-3 py-13 2xl:w-[90%] 2x1:mx-auto">
            {isInLoadingState ? (
                <p>Loading...</p>
            ) : error ? (
                <div className="flex justify-center items-center h-[190px]">
                    <FaExclamationTriangle className="text-slate-750 text-3xl mr-3"/>
                    <span className="text-slate-820 text-lg font-medium">
                        {error}
                    </span>
                </div>
            ) : (
                <div className="min-h[720px]">
                    <div className="pb-7 pt-15 grid 2x1:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-7 gap-x-7">
                        {posts && 
                        posts.map((item, i) => <PostCard key={i} {...item}/>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Posts;