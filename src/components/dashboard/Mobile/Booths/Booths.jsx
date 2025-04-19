import "./Booths.css";  
import { NewBooth } from "./NewBooth";  
import { useState, useEffect } from "react";  
import { doc, collection, addDoc, updateDoc, query, where } from "firebase/firestore";  
import { db } from "../../../../config/firebase";  
import { useAuth } from "../../../auth/AuthContext";  
import { getDocs } from "firebase/firestore";  

export const Booths = () => {  
    const { user, loading, UserData } = useAuth();  
    const [isCreatingBooth, setIsCreatingBooth] = useState(false);  
    const [isViewingBooths, setIsViewingBooths] = useState(false);  
    const [boothsList, setBoothsList] = useState([]);  
    const [filter, setFilter] = useState("All Booths");  
    const [searchTerm, setSearchTerm] = useState("");  

    const BoothsRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Booths");  

    const fetchBooths = async () => {  
        const querySnapshot = await getDocs(BoothsRef);  
        let booths = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));  
        booths = booths.filter(booth => booth.id !== "PlaceholderBooth");  
        setBoothsList(booths);  
    }  

    const ClaimBooth = async (id, name) => {  
        const claimedBoothRef = doc(BoothsRef, id);  
        await updateDoc(claimedBoothRef, {  
            ClaimedBy: name,  
        });  
        fetchBooths(); // Refresh the list after claiming  
    }  

    const filteredBooths = boothsList.filter(booth => {  
        // Filter by claim status  
        const claimMatch =   
            filter === "All Booths" ||   
            (filter === "Claimed" && booth.ClaimedBy) ||   
            (filter === "Unclaimed" && !booth.ClaimedBy);  
        
        // Filter by search term  
        const searchMatch =   
            booth.BoothLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||  
            booth.DayOfBooth.toLowerCase().includes(searchTerm.toLowerCase()) ||  
            booth.TimeOfBooth.toLowerCase().includes(searchTerm.toLowerCase());  
        
        return claimMatch && searchMatch;  
    });  

    useEffect(() => {  
        if (isViewingBooths) {  
            fetchBooths();  
        }  
    }, [isViewingBooths]);  

    return (  
        <div className="BoothsContainer">  
            <div className="BoothsHeader">  
                <h2>Booth Management</h2>  
                {UserData.TroopRole === "Leader" || UserData.TroopRole === "Co-leader" ? (  
                    <div className="BoothsButtonBar">  
                        <button   
                            className={`BoothsButton ${isCreatingBooth ? "active" : ""}`}   
                            onClick={() => {  
                                setIsCreatingBooth(!isCreatingBooth);   
                                setIsViewingBooths(false);  
                            }}  
                        >  
                            {isCreatingBooth ? "Cancel" : "Create Booth"}  
                        </button>  
                        <button   
                            className={`BoothsButton ${isViewingBooths ? "active" : ""}`}   
                            onClick={() => {  
                                fetchBooths();  
                                setIsCreatingBooth(false);  
                                setIsViewingBooths(!isViewingBooths);  
                            }}  
                        >  
                            {isViewingBooths ? "Hide Booths" : "View Booths"}  
                        </button>  
                    </div>  
                ) : (  
                    <div className="BoothsButtonBar">  
                        <button className="BoothsButton">Place Order</button>  
                        <button className="BoothsButton">View Your Orders</button>  
                    </div>  
                )}  
            </div>  

            {isCreatingBooth && (  
                <NewBooth setIsCreatingBooth={setIsCreatingBooth} fetchBooths={fetchBooths}/>  
            )}  

            {isViewingBooths && (  
                <div className="ViewBoothsContainer">  
                    <div className="BoothsControls">  
                        <div className="SearchBox">  
                            <input  
                                type="text"  
                                placeholder="Search booths..."  
                                value={searchTerm}  
                                onChange={(e) => setSearchTerm(e.target.value)}  
                            />  
                        </div>  
                        <div className="FilterControls">  
                            <select   
                                value={filter}  
                                onChange={(e) => setFilter(e.target.value)}  
                            >  
                                <option value="All Booths">All Booths</option>  
                                <option value="Claimed">Claimed Booths</option>  
                                <option value="Unclaimed">Unclaimed Booths</option>  
                            </select>  
                            <button   
                                className="ClearFiltersButton"  
                                onClick={() => {  
                                    setFilter("All Booths");  
                                    setSearchTerm("");  
                                }}  
                            >  
                                Clear Filters  
                            </button>  
                        </div>  
                    </div>  

                    {filteredBooths.length === 0 ? (  
                        <div className="NoBoothsMessage">  
                            <p>No booths found matching your criteria</p>  
                        </div>  
                    ) : (  
                        <div className="BoothsGrid">  
                            {filteredBooths.map((booth) => (  
                                <div className="BoothCard" key={booth.id}>  
                                    <div className="BoothCardHeader">  
                                        <h3>{booth.BoothLocation}</h3>  
                                        <span className={`StatusBadge ${booth.ClaimedBy ? "claimed" : "unclaimed"}`}>  
                                            {booth.ClaimedBy ? "CLAIMED" : "AVAILABLE"}  
                                        </span>  
                                    </div>  
                                    <div className="BoothDetails">  
                                        <p><span>Date:</span> {booth.DayOfBooth}</p>  
                                        <p><span>Time:</span> {booth.TimeOfBooth}</p>  
                                        {booth.ClaimedBy && (  
                                            <p><span>Claimed By:</span> {booth.ClaimedBy}</p>  
                                        )}  
                                    </div>  
                                    <div className="BoothActions">  
                                        <label className="ClaimToggle">  
                                            <input  
                                                type="checkbox"  
                                                checked={!!booth.ClaimedBy}  
                                                onChange={() => ClaimBooth(  
                                                    booth.id,   
                                                    booth.ClaimedBy ? "" : UserData.Name  
                                                )}  
                                            />  
                                            <span className="ToggleSlider">  
                                                {booth.ClaimedBy ? "Unclaim" : "Claim"}  
                                            </span>  
                                        </label>  
                                    </div>  
                                </div>  
                            ))}  
                        </div>  
                    )}  
                </div>  
            )}  
        </div>  
    );  
};  