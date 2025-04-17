import "./Booths.css";

import { NewBooth } from "./NewBooth"
import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const Booths = () => {
    const { user, loading, UserData } = useAuth();
    const [isCreatingBooth, setIsCreatingBooth] = useState(false);
    const [isViewingBooths, setIsViewingBooths] = useState(false);
    const [boothsList, setBoothsList] = useState([]);

    const BoothsRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Booths");

    const fetchBooths = async () => {
        const querySnapshot = await getDocs(BoothsRef);
        let booths = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        booths = booths.filter(booths => booths.id !== "PlaceholderBooth");
        setBoothsList(booths);
    }

    const ClaimBooth = async (id, name) => {
    
        const claimedBoothRef = doc(BoothsRef, id);
        
        await updateDoc(claimedBoothRef,{
            ClaimedBy: name,
        })

        setBoothsList(prevBooths =>
            prevBooths.map(booth =>
                booth.id === id ? { ...booth, ClaimedBy: name} : booth
            )
        );
    }
    return (
        <>
            <div className="BoothsMainContainer">
                {UserData.TroopRole === "Leader" || UserData.TroopRole === "Co-leader" ? (
                    <div className="BoothsButtonBar">
                        {/* Toggle buttons */}
                        <button className="BoothsButtons" onClick={() => {setIsCreatingBooth(!isCreatingBooth); setIsViewingBooths(false)}}>Create Booth Listing</button>
                        <button className="BoothsButtons" onClick={() => {fetchBooths(); setIsCreatingBooth(false); setIsViewingBooths(!isViewingBooths)}}>View Booths</button>
                    </div>
                ):(
                    <div className="BoothsButtonBar">
                        {/* Toggle buttons */}
                        <button className="BoothsButtons" >Place Order</button>
                        <button className="BoothsButtons" >View Your Orders</button>
                    </div>
                )}
                

                {isCreatingBooth && (
                    <NewBooth setIsCreatingBooth={setIsCreatingBooth}/>
                )}

                {isViewingBooths && (
                    <div className="ViewBoothsContainer">
                        <div className="ViewBoothsTopRow">
                            <p><b>Booths</b></p>
                            <div>
                                <label><b>Sort: </b></label>
                                <select name="ClaimedSelection" id="ClaimedSelection" >
                                    <option value="" disabled>Choose an Option</option>
                                    <option value="Claimed">Claimed Booths</option>
                                    <option value="Unclaimed">Unclaimed Booths</option>
                                    <option value="All Booths">All Booths</option>
                                    
                                </select>
                            </div>
                            <div>
                                <button className="ClearFiltersButton" >Clear Filters</button>
                            </div>
                        </div>
                        <ul className="BoothsUL">
                            {boothsList.map((booth, index) => (
                                <div key={index}>
                                    <li className="BoothsBoxes" >
                                        <p><b>Booth Location: </b> {booth.BoothLocation}</p>
                                        <p><b>Date: </b> {booth.DayOfBooth}</p>
                                        <p><b>Time: </b> {booth.TimeOfBooth}</p>
                                        <p><b>Claimed By: </b> {booth.ClaimedBy === "" ? ("Nobody") : (booth.ClaimedBy)}</p>
                                    </li>
                                    <div className="ClaimBoothBox">
                                        <span>Claim Booth</span>
                                        <div>
                                            <input type="checkbox" checked={booth.ClaimedBy === "" ? (false) : (true)} onChange={() => ClaimBooth(booth.id, booth.ClaimedBy === "" ? (UserData.Name) : (""))}></input>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
                
            </div>
        </>
    );
};
