import "./Dashboard.css";
import { useAuth } from "../../../auth/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export const Dashboard = () => {
    const { user, loading, UserData } = useAuth();
    const [statusMessage, setStatusMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrediction = async () => {
            if (!UserData?.TroopNumber) return;

            try {
                const response = await axios.post(
                    "https://girlscoutcookietracker.onrender.com/predict",
                    {
                        TroopNumber: UserData.TroopNumber
                    }
                );

                console.log("Prediction API response:", response.data); // 🔍 Debug log

                if (response.data.message) {
                    setStatusMessage(response.data.message);
                } else {
                    setError("Unexpected response from server.");
                }
            } catch (err) {
                console.error("Prediction error:", err);
                setError(err.response?.data?.error || "Failed to fetch prediction.");
            }
        };

        fetchPrediction();
    }, [UserData?.TroopNumber]);

    return (
        <div className="DashbboardMainContainer">
            <div className="DashboardHeaderBar">
                <span><b>{`Welcome to Troop#${UserData?.TroopNumber}'s Dashboard!`}</b></span>
            </div>

            <div className="PredictionContainer">
                {statusMessage ? (
                    <p><b>Status:</b> {statusMessage}</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : (
                    <p>Loading prediction...</p>
                )}
            </div>
        </div>
    );
};
