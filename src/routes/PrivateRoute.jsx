import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingComp/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return children;
    }

    return <Navigate state={{ from: location }} to="/login"></Navigate>;
};

export default PrivateRoute;