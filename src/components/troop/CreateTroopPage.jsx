import "./CreateTroopPage.css";
import { useState } from "react";
import { doc, setDoc, collection, updateDoc, addDoc} from 'firebase/firestore'
import { db } from "../../config/firebase";
import { useAuth } from "../auth/AuthContext";

import { useNavigate } from "react-router-dom";

export const CreateTroopPage = () => {
    const [TroopNumber, setTroopNumber] = useState("");
    const [TroopRegion, setTroopRegion] = useState("");
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const createTroop = async () => {
        try{
            const mainDocumentRef = doc(db, "Troops", `Troop#${TroopNumber}`);

            await setDoc(mainDocumentRef, 
                {
                    TroopLeader: user.uid,
                    TroopRegion: TroopRegion,
                });
                
            const memberSubcollectionRef = collection(mainDocumentRef, "Members");
            const requestSubcollectionRef = collection(mainDocumentRef, "MemberRequests");

            await setDoc(doc(memberSubcollectionRef, user.uid), {
                Role: "Leader",
            });

            await setDoc(doc(requestSubcollectionRef, "PlaceholderRequest"), {
                UserID: null,
                RequestCompletion: true,
            });

            await updateDoc(doc(db, "Users", user.uid),{
                TroopNumber: TroopNumber
            });

            navigate("/GirlScoutCookieTracker/dashboard");
        }
        catch (err){
            console.error(err)
        }
    };

    return (
        <>
            <div id='MainContainer'>
                <label>Troop Number:</label>
                <input id="TroopNumberInput" type="number" onChange={(e) => setTroopNumber(e.target.value)}/> 
                
                <label>Region:</label>
                <input id="RegionInput" type="text" onChange={(e) => setTroopRegion(e.target.value)}/>

                <button id="CreateTroopButton" onClick={createTroop}>Create</button> 
            </div>
        </>
    );
}