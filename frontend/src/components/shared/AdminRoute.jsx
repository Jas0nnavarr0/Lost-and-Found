import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hasRole } from "../../utils/roles";

export default function AdminRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    return hasRole(user, "ROLE_ADMIN") ? children : <Navigate to="/home" />;
}