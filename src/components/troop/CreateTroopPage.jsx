import "./CreateTroopPage.css";
import { useState, useEffect } from "react";
import { doc, setDoc, collection, updateDoc, addDoc, getDocs} from 'firebase/firestore'
import { db } from "../../config/firebase";
import { useAuth } from "../auth/AuthContext";

import { useNavigate } from "react-router-dom";

export const CreateTroopPage = () => {
    const [TroopNumber, setTroopNumber] = useState("");
    const [TroopRegion, setTroopRegion] = useState("");
    const { user, loading, UserData } = useAuth();
    const [TroopsList, setTroopsList] = useState([]);
    const [TroopExsists, setTroopExsists] = useState();
    const TroopsRef = collection(db, "Troops");
    const navigate = useNavigate();

    useEffect(() => {
        const getTroopsList = async () => {
            try{
                const data = await getDocs(TroopsRef);
                const filteredData = data.docs
                .filter(doc => doc.id !== "PlaceholderTroop")
                .map(doc => ({id: doc.id, ...doc.data() }));

                setTroopsList(filteredData);
                

            }catch (err){
                console.error(err);
            }
        }

        getTroopsList();
    });

    const checkIfTroopExsists = () => {
        TroopsList.forEach(Element => {
            if(Element.TroopNumber == TroopNumber){
                setTroopExsists(true);
                console.log("Troop Exsisis");
                return;
            }else{
                setTroopExsists(false);
            }
        })
    }

    const createTroop = async () => {
        checkIfTroopExsists();

        if(TroopExsists == false){
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
                const boothRequestsSubcollectionRef = collection(mainDocumentRef, "BoothRequests");
                const boothsSubcollectionRef = collection(mainDocumentRef, "Booths");
                
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

                await setDoc(doc(boothRequestsSubcollectionRef, "PlaceholderBoothRequest"), {
                    RequesterID: null,
                    RequestStatus: "Pending",
                    BoothLocation: "TBD",
                    RequestDate: "1/1/00",
                });

                // Initialize Booths (could be a placeholder or actual booth setup)
                await setDoc(doc(boothsSubcollectionRef, "PlaceholderBooth"), {
                    Location: "TBD",
                    AvailableDates: ["1/1/00"],
                    ScheduledTime: "TBD",
                    Available: true,
                });
    
                await updateDoc(doc(db, "Users", user.uid),{
                    TroopNumber: TroopNumber
                });
    
                navigate("/dashboard");
            }
            catch (err){
                console.error(err)
            }
        }   
    };

    return (
        <>
            <div id='CreateTroopPageMainContainer'>
                <div id="CreateTroopPageWhiteBox">
                    <div id="CreateTroopPageInnerBox">
                        <label>Troop Number:</label>
                        <br/>
                        <input id="TroopNumberInput" type="number" onChange={(e) => setTroopNumber(e.target.value)}/> 
                        {TroopExsists == true ? (<><p className="MobileSignInBoxErrorBox">Troop Number Already In Use</p><div style={{ height: "8px" }}></div></>) : (<div style={{ height: "25px" }}></div>)}
                        
                        <label>Region:</label>
                        <input id="RegionInput" type="text" onChange={(e) => setTroopRegion(e.target.value)}/>

                        <div style={{ height: "25px" }}></div>
                        <button id="CreateTroopButton" onClick={createTroop}>Create Troop</button> 
                    </div>
                </div>
            </div>
        </>
    );
}
