import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if(!isAuthenticated) return <Navigate to='/login' replace />

    return (
        <Outlet />
    )
};

export default ProtectedRoute;