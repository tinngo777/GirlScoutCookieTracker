import "./TroopPage.css";
import { useNavigate, Link } from "react-router-dom";

export const TroopPage = () => {
    const navigate = useNavigate();
    
    const CreateTroop = () => {
        navigate("/createTroop");
    }

    const JoinTroop = () => {
        navigate("/joinTroop");
    }
    
    return (
        <>
            <div id='MainContainer'>
                <button onClick={CreateTroop}>Create Troop</button>
                <button onClick={JoinTroop}>Join Existing Troop</button>
            </div>
        </>
    );
}