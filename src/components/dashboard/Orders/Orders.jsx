import "./Orders.css";

import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";


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
    const [OutstandingOrders, setOutstandingOrders] = useState([]);
    //const [CompletedOrders, setCompletedOrders] = useState([]);
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    
    const OutstandingOrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "OutstandingOrders");
    //const CompletedOrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "CompletedOrders");

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

        setIsOrderSubmitted(true);
        setCustomerName("");
        
        setCustomerEmail("");
        setAdventurefuls("");
        setToastYays("");
        setLemonades("");
        setTrefoils("");
        setThinMints("");
    }

    const fetchOutstandingOrders = async () => { 
        const querySnapshot = await getDocs(OutstandingOrdersRef);
        const orders = querySnapshot.docs.map(doc => doc.data());
        setOutstandingOrders(orders);
    };

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
                    
                    {isOrderSubmitted && (
                        <div className="OrderConfirmation">
                            <h3>Order Submitted Successfully!</h3>
                            <p><strong>Customer Name:</strong> {CustomerName}</p>
                            <p><strong>Adventurefuls:</strong> {Adventurefuls}</p>
                            <p><strong>Toast-Yays:</strong> {ToastYays}</p>
                            <p><strong>Lemonades:</strong> {Lemonades}</p>
                            <p><strong>Trefoils:</strong> {Trefoils}</p>
                            <p><strong>ThinMints:</strong> {ThinMints}</p>
                        </div>
                    )}                    
                </div>
                <div className="ViewOrdersSection">
                    <button onClick={fetchOutstandingOrders}>View Outstanding Orders</button>  

                    {/* Display outstanding orders */}
                    {OutstandingOrders.length > 0 && (   
                        <div className="OutstandingOrders"> 
                            <h3>Outstanding Orders</h3>
                            <ul>
                                {OutstandingOrders.map((order, index) => (  
                                    <li key={index}>
                                        <p><strong>Customer Name:</strong> {order.CustomerName}</p>
                                        <p><strong>Adventurefuls:</strong> {order.Adventurefuls}</p>
                                        <p><strong>Toast-Yays:</strong> {order.ToastYays}</p>
                                        <p><strong>Lemonades:</strong> {order.Lemonades}</p>
                                        <p><strong>Trefoils:</strong> {order.Trefoils}</p>
                                        <p><strong>ThinMints:</strong> {order.ThinMints}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};