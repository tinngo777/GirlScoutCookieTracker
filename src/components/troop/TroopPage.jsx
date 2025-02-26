import "./TroopPage.css";
import { useNavigate, Link } from "react-router-dom";

export const TroopPage = () => {
    const navigate = useNavigate();
    
    const CreateTroop = () => {
        navigate("/GirlScoutCookieTracker/createTroop");
    }

    const JoinTroop = () => {
        navigate("/GirlScoutCookieTracker/joinTroop");
    }
    
    return (
        <>
            <div id='TroopPageMainContainer'>
                <div id="WhiteBox">
                    <button onClick={CreateTroop}>Create Troop</button>
                    <button onClick={JoinTroop}>Join Existing Troop</button>
                </div>
            </div>
        </>
    );
}