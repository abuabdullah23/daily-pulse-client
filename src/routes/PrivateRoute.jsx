import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

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