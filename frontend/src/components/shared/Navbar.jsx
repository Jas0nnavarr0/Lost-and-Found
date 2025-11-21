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
        <div className="h-[70px] bg-gradient-to-r from-yellow-300 to-yellow-500 text-black z-50 flex items-center sticky top-0">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/home" className="flex items-center text-2xl font-bold">
                    <FaBoxOpen />
                    <span className="font-[Poppins]">Lost and Found</span>
                </Link>

                    {/* Moderator Tab */}
                    {hasRole(user, "ROLE_MODERATOR") && (
                        <li className="font-[500] transition-all duration-150">
                            <Link to="/moderator">Moderator</Link>
                        </li>
                    )}

                    {/* Admin Tab */}
                    {hasRole(user, "ROLE_ADMIN") && (
                        <li className="font-[500] transition-all duration-150">
                            <Link to="/admin">Admin</Link>
                        </li>
                    )}

                <ul className="flex text-black gap-5">
                    <li className="font-[500] transition-all duration-150">
                        <Link className="" to="/home">
                            Home
                        </Link>
                    </li>

                    <li
                        className="font-[500] cursor-pointer transition-all duration-150"
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
