import { Navigate} from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    
    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;

    
};

 
