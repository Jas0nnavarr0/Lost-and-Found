import { FaStore } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/actions";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOutUser(navigate));
    };

    const path = useLocation().path;

    return (
        <div className="h-[70px] bg-gradient-to-r from-yellow-300 to-yellow-500 text-black z-50 flex items-center sticky top-0">
            <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <FaStore className="mr-2 text-3xl" />
                    <span className="font-[Poppins]">Lost and Found</span>
                </Link>

                <ul className="flex text-black gap-5">
                    <li className="font-[500] transition-all duration-150">
                        <Link className="" to="/">
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
