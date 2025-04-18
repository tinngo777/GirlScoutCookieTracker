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
    const [claimFilter, setClaimFilter] = useState("All Booths");

    const BoothsRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Booths");

    const fetchAndFilterBooths = async (filter) => {
        console.log("filter = " + filter);
        //Set Variables
        setClaimFilter(filter);

        //Fetch all booths
        const querySnapshot = await getDocs(BoothsRef);
        let booths = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        booths = booths.filter(booths => booths.id !== "PlaceholderBooth");

        //Filter List by timeframe and name
        const filteredBooths = booths.filter(booths => {
            if(filter === "All Booths"){
                return true;
            }else if(filter === "Unclaimed"){
                return booths.ClaimedBy === "";
            }else{
                return booths.ClaimedBy !== "";
            }
        });

        setBoothsList(filteredBooths);
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
                        <button className="BoothsButtons" onClick={() => {fetchAndFilterBooths("All Booths"); setIsCreatingBooth(false); setIsViewingBooths(!isViewingBooths)}}>View Booths</button>
                    </div>
                ):(
                    <div className="BoothsButtonBar">
                        {/* Toggle buttons */}
                        <button className="BoothsButtons" onClick={() => {fetchAndFilterBooths("All Booths"); setIsCreatingBooth(false); setIsViewingBooths(!isViewingBooths)}}>View Booths</button>
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
                                <select name="ClaimedSelection" id="ClaimedSelection" value={claimFilter} onChange={(e) =>  fetchAndFilterBooths(e.target.value)} >
                                    <option value="" disabled>Choose an Option</option>
                                    <option value="Claimed">Claimed Booths</option>
                                    <option value="Unclaimed">Unclaimed Booths</option>
                                    <option value="All Booths">All Booths</option>
                                    
                                </select>
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
                                    <div className={`ClaimBoothBox ${booth.ClaimedBy === "" ? "Unclaimed" : "Claimed"}`} >
                                        
                                        {booth.ClaimedBy === "" || booth.ClaimedBy === UserData.Name ? (
                                            <>
                                                {booth.ClaimedBy === "" ? (<span>Claim Booth</span>):(<span>Unclaim Booth</span>)}
                                                
                                                <div>
                                                    <input type="checkbox" checked={booth.ClaimedBy === "" ? (false) : (true)} onChange={() => ClaimBooth(booth.id, booth.ClaimedBy === "" ? (UserData.Name) : (""))}></input>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <span>Claimed</span>
                                            </>
                                        )}
                                        
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
