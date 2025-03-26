import "./JoinTroopPage.css";
import { useState, useEffect } from "react";
import { doc, setDoc,getDocs, collection, updateDoc, addDoc} from 'firebase/firestore'
import { db } from "../../config/firebase";
import { useAuth } from "../auth/AuthContext";
import { useNavigate} from "react-router-dom";

export const JoinTroopPage = () => {
    const { user, loading, UserData } = useAuth();
    const [TroopsList, setTroopsList] = useState([]);
    const [TroopNumber, setTroopNumber] = useState("");
    const [TableUpdate, setTableUpdate] = useState("false");
    
    const navigate = useNavigate();

    const TroopsRef = collection(db, "Troops");

    const joinTroop = async () => {
        if(TroopNumber !== ""){
            try{
                const mainDocumentRef = doc(db, "Troops", `Troop#${TroopNumber}`);
                const requestSubcollectionRef = collection(mainDocumentRef, "MemberRequests");
    
                await setDoc(doc(requestSubcollectionRef, user.uid), {
                    UserID: user.uid,
                    Username: UserData.Name,
                    RequestCompletion: false,
                });
    
                navigate("/awaitJoin");
            }
            catch (err){
                console.error(err)
            }
        }
        
    };

    useEffect(() => {

        const getTroopsList = async () => {
            try{
                const data = await getDocs(TroopsRef);
                const filteredData = data.docs
                .filter(doc => doc.id !== "PlaceholderTroop")
                .map(doc => ({id: doc.id, ...doc.data() }));

                setTroopsList(filteredData);
                setTableUpdate(false);

            }catch (err){
                console.error(err);
            }
        }
 
        getTroopsList();
    }, [TableUpdate]);

    return(
        <>
            <div id='JoinTroopPageMainContainer'>
                <div id="JoinTroopPageWhiteBox">
                    <div id="JoinTroopPageInnerBox">
                        <label>Troop Number To Join: </label>
                        <select name="TroopSelection" id="TroopSelection" defaultValue="" onChange={(e) => setTroopNumber(e.target.value)}>
                            <option value="" disabled>Choose an Option</option>
                            {TroopsList.map((Troop) => (
                                <option key={Troop.id} value={Troop.TroopNumber}>{Troop.id}</option>
                            ))}
                        </select>
                        <div style={{ height: "25px" }}></div>
                        <button id="JoinTroopButton" onClick={joinTroop}>Request To Join</button> 
                    </div>
                </div>
            </div>
        </>
    );
}