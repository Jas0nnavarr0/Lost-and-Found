import { useEffect, useState } from "react";
import { getUserInfo } from "../api/users";
import { FaRegSmileBeam } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getMyPosts } from "../api/posts";
import PostCard from "../components/posts/PostCard";

const HomeProfile = () => {
    // const [user, setUser] = useState(null);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     getUserInfo()
    //         .then(res => setUser(res.data))
    //         .catch(err => setError(err.response?.data?.message || 'Failed to fetch user'));
    // }, []);

    // if (error) return <div>Error: {error}</div>;
    // if (!user) return <div>Loading...</div>;

    // <div>
        //     <h2>User Profile</h2>
        //     <p>ID: {user.id}</p>
        //     <p>Username: {user.username}</p>
        //     <p>Roles: {user.roles.join(', ')}</p>
        // </div> ../../public/home_banner.jpg

    const [userInfo, setUserInfo] = useState(null);
    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        getUserInfo()
            .then(res => setUserInfo(res.data))
            .catch(err => console.error("Error fetching user info:", err));
    }, []);

    useEffect(() => {
        getMyPosts()
            .then(res => setMyPosts(res.data))
            .catch(err => console.error("Error fetching my posts:", err));
    }, []);

     return (
        <div className="w-full">
            {/* Banner */}
            <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
                <div className="w-full h-[40vh] md:h-[55vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden">
                    <img
                        src="/../../public/home_banner.jpg"
                        alt="Banner"
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </div>

            <div className="w-full flex justify-start gap-6 mt-6 mb-10 px-10">

                <Link
                    to="/posts"
                    className="w-48 h-14 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl shadow-lg text-lg flex items-center justify-center"
                >
                    Browse for Items
                </Link>

                <Link
                    to="/messages"
                    className="w-48 h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg text-lg flex items-center justify-center"
                >
                    Messages
                </Link>

                <Link
                    to="/create-post"
                    className="w-48 h-14 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg text-lg flex items-center justify-center"
                >
                    Create Post
                </Link>

            </div>

            <div className="absolute top-[20%] left-[8%] flex items-center gap-4 bg-blue-600 px-6 py-4 rounded-xl shadow-xl text-white">
                <FaRegSmileBeam className="text-5xl text-white" />

                <div className="text-2xl md:text-3xl font-semibold">
                    Hello: <span className="text-yellow-300">{userInfo?.username}</span>
                </div>
            </div>

            <div className="px-10 mb-20">

            <h2 className="text-xl font-bold mb-4">Your Posts</h2>

                {myPosts.length === 0 && (
                    <p className="text-gray-500">You have no posts yet.</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myPosts.map(post => (
                        <PostCard 
                            key={post.id}
                            data={post}
                            onClick={() => {}} // optional
                        />
                    ))}
                </div>

            </div>


        </div>
    );
};

export default HomeProfile;

