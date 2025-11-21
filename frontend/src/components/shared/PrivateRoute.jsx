import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ({ isPublic = false }) => {

    const { user } = useSelector((state) => state.auth);

    // Logic for public pages
    if (isPublic) {
        return user ? <Navigate to="/home" /> : <Outlet />;
    }

    // Logic for public pages
    return user ? <Outlet /> : <Navigate to="/"/>;
}

export default PrivateRoute;