import "./CreateTroopPage.css";
import { useState } from "react";
import { doc, setDoc, collection, updateDoc, addDoc} from 'firebase/firestore'
import { db } from "../../config/firebase";
import { useAuth } from "../auth/AuthContext";

import { useNavigate } from "react-router-dom";

export const CreateTroopPage = () => {
    const [TroopNumber, setTroopNumber] = useState("");
    const [TroopRegion, setTroopRegion] = useState("");
    const { user, loading, UserData } = useAuth();
    const navigate = useNavigate();

    const createTroop = async () => {
        try{
            const mainDocumentRef = doc(db, "Troops", `Troop#${TroopNumber}`);

            await setDoc(mainDocumentRef, 
                {
                    TroopLeader: user.uid,
                    TroopNumber: Number(TroopNumber),
                    TroopRegion: TroopRegion,
                });
                
            const memberSubcollectionRef = collection(mainDocumentRef, "Members");
            const requestSubcollectionRef = collection(mainDocumentRef, "MemberRequests");
            const inventorySubcollectionRef = collection(mainDocumentRef, "Inventory");
            const outstandingOrdersSubcollectionRef = collection(mainDocumentRef, "OutstandingOrders");
            const completedOrdersSubcollectionRef = collection(mainDocumentRef, "CompletedOrders"); 

            await setDoc(doc(memberSubcollectionRef, user.uid), {
                Name: UserData.Name,
                Role: "Leader",
            });

            await setDoc(doc(requestSubcollectionRef, "PlaceholderRequest"), {
                UserID: null,
                RequestCompletion: true,
            });

            await setDoc(doc(inventorySubcollectionRef, "Cookies"), {
                Adventurefuls: 0,
                CaramelChocolateChip: 0,
                CarameldeLites: 0,
                Samoas: 0,
                PeanutButterSandwich: 0,
                Dosidos: 0,
                GirlScoutSmores: 0,
                Lemonades: 0,
                LemonUps: 0,
                PeanutButterPatties: 0,
                Tagalongs: 0,
                ThinMints: 0,
                ToastYays: 0,
                ToffeeTastic: 0,
                Trefoils: 0,
            });

            await setDoc(doc(outstandingOrdersSubcollectionRef, "PlaceholderOutstandingOrder"), {
                ParentName: "placeholder",
                OrderedBy: 'placeholder',
                OrderContents: 'placeholder',
                OrderDate: '1/1/00'
            });

            await setDoc(doc(completedOrdersSubcollectionRef, "PlaceholderCompletedOrder"), {
                ParentName: "placeholder",
                OrderedBy: 'placeholder',
                OrderContents: 'placeholder',
                OrderData: '1/1/00',
                CompletionDate: '1/1/00',
            });

            await updateDoc(doc(db, "Users", user.uid),{
                TroopNumber: TroopNumber
            });

            navigate("/dashboard");
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