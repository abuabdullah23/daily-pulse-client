import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import usePremiumUser from "../hooks/premium/usePremiumUser";

const PremiumUserRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isPremiumUser, isPremiumUserLoading] = usePremiumUser();

    const location = useLocation();

    if (loading || isAdminLoading || isPremiumUserLoading) {
        return <LoadingSpinner />
    }

    if (user && isAdmin || user && isPremiumUser) {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace ></Navigate>;
};

export default PremiumUserRoute;