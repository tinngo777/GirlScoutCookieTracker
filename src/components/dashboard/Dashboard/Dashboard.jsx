import "./Dashboard.css";
import { useAuth } from "../../auth/AuthContext";

export const Dashboard = () => {
    const { user, loading, UserData } = useAuth();

    return(
        <>
            <div className="DashbboardMainContainer">
                <div className="DashboardHeaderBar">
                    <span><b>{`Welcome to Troop#${UserData.TroopNumber}'s Dashboard!`}</b></span>
                </div>

            </div>
        </>
    );
}