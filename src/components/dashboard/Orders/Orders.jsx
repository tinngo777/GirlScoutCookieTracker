import "./Orders.css";

import { useState } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";

export const Orders = () => {
    const { user, loading, UserData} = useAuth();

    const [CustomerName, setCustomerName] = useState("");
    const [CustomerEmail, setCustomerEmail] = useState("");
    const [Adventurefuls, setAdventurefuls] = useState("");
    const [ToastYays, setToastYays] = useState("");
    const [Lemonades, setLemonades] = useState("");
    const [Trefoils, setTrefoils] = useState("");
    const [ThinMints, setThinMints] = useState("");
    const [PeanutButterPatties, setPeanutButterPatties] = useState("");
    const [CarameldeLites, setCarameldeLites] = useState("");
    const [PeanutButterSandwhich, setPeanutButterSandwhich] = useState("");
    
    const OutstandingOrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "OutstandingOrders");

    const SubmitOrder = async () => {
        await addDoc(OutstandingOrdersRef, {
            PlacedBy: UserData.Name,
            CustomerName: CustomerName,
            CustomerEmail: CustomerEmail,
            TimeOfOrder: new Date().toISOString(),
            Adventurefuls: Adventurefuls,
            ToastYays: ToastYays,
            Lemonades: Lemonades,
            Trefoils: Trefoils,
            ThinMints: ThinMints,
        })

        setCustomerName("");

        setCustomerEmail("");
        setAdventurefuls("");
        setToastYays("");
        setLemonades("");
        setTrefoils("");
        setThinMints("");
    }

    
    return(
        <>
            <div className="MainContainer">
                <div className="OrdersWhiteBox">
                    <label>Customer Name: </label>
                    <input id="name" type="text" onChange={(e) => setCustomerName(e.target.value)} />
                    
                    <br></br><br></br>
                    
                    <label>Customer Email: </label>
                    <input id="email" type="email" onChange={(e) => setCustomerEmail(e.target.value)} />
    
                    <br></br><br></br>

                    <label>Number of Adventurefuls: </label>
                    <input id="OrdersAdventurefuls" type="number" onChange={(e) => setAdventurefuls(e.target.value)} />

                    <br></br><br></br>

                    <label>Number of Toast-Yays: </label>
                    <input id="OrdersToastYays" type="number" onChange={(e) => setToastYays(e.target.value)} />

                    <br></br><br></br>

                    <label>Number of Lemonades: </label>
                    <input id="OrdersLemonades" type="number" onChange={(e) => setLemonades(e.target.value)} />

                    <br></br><br></br>

                    <label>Number of Trefoils: </label>
                    <input id="OrdersTrefoils" type="number" onChange={(e) => setTrefoils(e.target.value)} />

                    <br></br><br></br>

                    <label>Number of ThinMints: </label>
                    <input id="OrdersThinMints" type="number" onChange={(e) => setThinMints(e.target.value)} />

                    <br></br><br></br>

                    <button onClick={SubmitOrder}>Submit</button>
                    

                    
                </div>
            </div>
        </>
    );
}