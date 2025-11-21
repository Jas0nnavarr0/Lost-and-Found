import { useEffect, useState } from "react";
import { fetchModerators, fetchUsers, grantModerator, revokeModerator } from "../api/admin";

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [moderators, setModerators] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const [usersRes, modRes] = await Promise.all([
                fetchUsers(),
                fetchModerators()
            ]);

            setUsers(usersRes.data);
            setModerators(modRes.data);
        } catch (err) {
            console.error("Error loading admin data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return <div className="text-center mt-20 text-white text-xl">Loading...</div>;
    }

    const handleGrantMod = async (userId) => {
        try {
            await grantModerator(userId);
            loadData(); 
        } catch (err) {
            console.error("Error granting moderator:", err);
        }
    };

    const handleRevokeMod = async (userId) => {
        try {
        await revokeModerator(userId);
            loadData();  
        } catch (err) {
            console.error("Error revoking moderator:", err);
        }
    };

    return (
        <div className="min-h-screen bg-blue-500 p-10 flex gap-10 justify-center">

            {/* USERS LIST */}
            <div className="bg-white rounded-lg shadow-xl w-[360px]">
                <div className="bg-yellow-400 text-black font-bold text-xl p-3 rounded-t-lg text-center">
                    Users
                </div>

                <ul className="p-4 space-y-3">
                    {users.map((user) => (
                        <li key={user.userId} className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">{user.username}</span>

                            <button
                                onClick={() => handleGrantMod(user.userId)}
                                className="bg-purple-600 text-white text-sm px-4 py-1 rounded-full hover:bg-purple-700 transition"
                            >
                                Grant Mod
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* MODERATORS LIST */}
            <div className="bg-white rounded-lg shadow-xl w-[360px]">
                <div className="bg-yellow-400 text-black font-bold text-xl p-3 rounded-t-lg text-center">
                    Moderators
                </div>

                <ul className="p-4 space-y-3">
                    {moderators.map((mod) => (
                        <li key={mod.userId} className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">{mod.username}</span>

                            <button
                                onClick={() => handleRevokeMod(mod.userId)}
                                className="bg-purple-600 text-white text-sm px-4 py-1 rounded-full hover:bg-purple-700 transition"
                            >
                                Revoke
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default AdminPage;