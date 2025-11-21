import { FaBox, FaBoxOpen, FaStore } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/actions";
import { hasRole } from "../../utils/roles";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logOutUser(navigate));
    };

    const path = useLocation().path;

    return (
        <div className="h-[70px] bg-gradient-to-r from-yellow-300 to-yellow-500 text-black z-50 flex items-center sticky top-0 shadow-md">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">

                <Link to="/home" className="flex items-center text-2xl font-bold">
                    <FaBoxOpen className="mr-2 text-3xl" />
                    <span className="font-[Poppins]">Lost and Found</span>
                </Link>

                <ul className="flex items-center gap-8 text-lg font-medium">

                    {hasRole(user, "ROLE_MODERATOR") && (
                        <li className="hover:text-white transition">
                            <Link to="/moderator">Moderator</Link>
                        </li>
                    )}

                    {hasRole(user, "ROLE_ADMIN") && (
                        <li className="hover:text-white transition">
                            <Link to="/admin">Admin</Link>
                        </li>
                    )}

                    <li className="hover:text-white transition">
                        <Link to="/home">Home</Link>
                    </li>

                    <li
                        className="cursor-pointer hover:text-white transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;
