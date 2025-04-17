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
        console.log("fetching");
        const querySnapshot = await getDocs(BoothsRef);
        let booths = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        booths = booths.filter(booths => booths.id !== "PlaceholderBooth");
        setBoothsList(booths);
    }

    return (
        <>
            <div className="OrdersMainContainer">
                {UserData.TroopRole === "Leader" || UserData.TroopRole === "Co-leader" ? (
                    <div className="OrdersButtonBar">
                        {/* Toggle buttons */}
                        <button className="OrdersButtons" onClick={() => {setIsCreatingBooth(!isCreatingBooth); setIsViewingBooths(false)}}>Create Booth Listing</button>
                        <button className="OrdersButtons" onClick={() => {fetchBooths(); setIsCreatingBooth(false); setIsViewingBooths(!isViewingBooths)}}>View Booths</button>
                    </div>
                ):(
                    <div className="OrdersButtonBar">
                        {/* Toggle buttons */}
                        <button className="OrdersButtons" >Place Order</button>
                        <button className="OrdersButtons" >View Your Orders</button>
                    </div>
                )}
                

                {isCreatingBooth && (
                    <NewBooth setIsCreatingBooth={setIsCreatingBooth}/>
                )}

                {isViewingBooths && (
                    <div className="OutstandingOrders">
                    <div className="ViewOrdersSectionTopRow">
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
                    <ul className="OutstandingOrderUL">
                        {boothsList.map((booth, index) => (
                            <div key={index}>
                                <li className="OutstandingOrderBoxes" >
                                    <p><b>Booth Location: </b> {booth.BoothLocation}</p>
                                    <p><b>Date: </b> {booth.DayOfBooth}</p>
                                    <p><b>Time: </b> {booth.TimeOfBooth}</p>
                                    <p><b>Claimed By: </b> {booth.ClaimedBy === "" ? ("Nobody") : (booth.ClaimedBy)}</p>
                                </li>
                            </div>
                            
                        ))}
                    </ul>
                    </div>
                )}
                
            </div>
        </>
    );
};
