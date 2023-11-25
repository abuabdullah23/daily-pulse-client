import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <LoadingSpinner />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace ></Navigate>;
};

export default AdminRoute;