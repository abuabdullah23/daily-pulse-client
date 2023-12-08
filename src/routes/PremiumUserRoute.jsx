import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import usePremiumUser from "../hooks/premium/usePremiumUser";
import LoadingSpinner from "../components/LoadingComp/LoadingSpinner/LoadingSpinner";

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

    return <Navigate to='/subscription' state={{ from: location }} replace ></Navigate>;
};

export default PremiumUserRoute;