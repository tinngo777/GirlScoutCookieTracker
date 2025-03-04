import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const PrivateRoute = () => {
  const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

 
