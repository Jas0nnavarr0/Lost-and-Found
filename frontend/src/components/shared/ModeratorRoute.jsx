import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hasRole } from "../../utils/roles";

export default function ModeratorRoute({ children }) {
    const { user } = useSelector((state) => state.auth);
    return hasRole(user, "ROLE_MODERATOR") ? children : <Navigate to="/home" />;
}