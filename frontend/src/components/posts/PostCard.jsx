import { useState } from "react";
import { FaMessage } from "react-icons/fa6";
import PostModal from "./PostModal";

const PostCard = ({
    postId,
    postTitle,
    image,
    description,
    location,
}) => {
    const [openPostModal, setOpenPostModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState("");

    const handlePostView = (post) => {
        setSelectedPost(post);
        setOpenPostModal(true);
    }

    return (
        // Open this post when a user clicks on it
        <div className="border overflow-hidden transition-shadow rounded=lg shadow-lg">
            <div onClick={() => {
                handlePostView({
                    id: postId,
                    postTitle,
                    image,
                    description,
                    location,
                })
            }}     
                    className="w-full overflow-hidden aspect-[6/4]">
                <img className="transform hover:scale-104 w-full h-full transition-transform duration-400 cursor-pointer"
                src={image}
                alt={postTitle}>
                </img>
            </div>
            <div className="p-4">
                <h2 onClick={() => {
                    handlePostView({
                        id: postId,
                        postTitle,
                        image,
                        description,
                        location,
                        })
                    }}
                    className="text-lg mb-1 font-semibold cursor-pointer">
                    {postTitle}
                </h2>
                <div className="max-h-20 min-h-20">
                    <p className="text-small text-gray-500">{description}</p>
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-600">
                        Found in: {location}
                    </span>
                </div>

                <button 
                    className={`text-white bg-blue-500 flex justify-center opacity-90 hover:bg-blue-700  py-2 px-3 rounded-lg items-center transition-colors duration-200 w-36 `}>
                        <FaMessage className="mr-2"/>
                        {"Message"}
                </button>
            </div>
            <PostModal 
                open={openPostModal}
                setOpen={setOpenPostModal}
                post={selectedPost}

            />
        </div>
    );
}

export default PostCard;