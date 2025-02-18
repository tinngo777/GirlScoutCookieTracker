import "./JoinTroopPage.css";
import { useState } from "react";
import { doc, setDoc, collection, updateDoc, addDoc} from 'firebase/firestore'
import { db } from "../../config/firebase";
import { useAuth } from "../auth/AuthContext";
import { useNavigate} from "react-router-dom";

export const JoinTroopPage = () => {
    const [TroopNumber, setTroopNumber] = useState("");
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const joinTroop = async () => {
        try{
            const mainDocumentRef = doc(db, "Troops", `Troop#${TroopNumber}`);
            const requestSubcollectionRef = collection(mainDocumentRef, "MemberRequests");

            await setDoc(doc(requestSubcollectionRef, user.uid), {
                UserID: user.uid,
                RequestCompletion: false,
            });

            navigate("/GirlScoutCookieTracker/awaitJoin");
        }
        catch (err){
            console.error(err)
        }
    };

    return(
        <>
            <div id='MainContainer'>
                <label>Troop Number To Join</label>
                <input id="TroopNumberInput" type="number" onChange={(e) => setTroopNumber(e.target.value)}/> 
                <button id="JoinTroopButton" onClick={joinTroop}>Request To Join</button> 
            </div>
        </>
    );
}