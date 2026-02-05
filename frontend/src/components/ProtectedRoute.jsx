import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';
import LoadingSpinner from './ui/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated()) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;
