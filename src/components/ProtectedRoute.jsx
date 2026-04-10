import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, role, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role === 'unauthorized') {
        return <Navigate to="/unauthorized" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
