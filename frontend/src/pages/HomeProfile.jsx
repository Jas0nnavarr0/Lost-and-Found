import { useEffect, useState } from "react";
import { getUserInfo } from "../api/users";

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

    return (
        // <div>
        //     <h2>User Profile</h2>
        //     <p>ID: {user.id}</p>
        //     <p>Username: {user.username}</p>
        //     <p>Roles: {user.roles.join(', ')}</p>
        // </div>
        <>
            HOME PAGE
        </>
    );
};

export default HomeProfile;

