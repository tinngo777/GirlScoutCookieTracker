import "./AwaitJoin.css";

import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";

export const AwaitJoin = () => {
    const { user, loading, UserData } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Make sure UserData is available and TroopNumber exists
        if (UserData && UserData.TroopNumber) {
            navigate("/dashboard");
        }
    }, [UserData, navigate]);
    
    return(
        <>
            <div id='AwaitJoinMainContainer'>
                <p><b>Let Your Troop Leader Know To Accept You</b></p>
                
                <p><b>Refresh The Page When Accepted</b></p>
            </div>
        </>
    );
}