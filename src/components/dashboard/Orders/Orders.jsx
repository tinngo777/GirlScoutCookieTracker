import "./Orders.css";

import { NewOrder } from "./NewOrder"
import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const Orders = () => {
    const { user, loading, UserData } = useAuth();

    const [CustomerName, setCustomerName] = useState("");
    const [CustomerEmail, setCustomerEmail] = useState("");
    const [Adventurefuls, setAdventurefuls] = useState("");
    const [ToastYays, setToastYays] = useState("");
    const [Lemonades, setLemonades] = useState("");
    const [Trefoils, setTrefoils] = useState("");
    const [ThinMints, setThinMints] = useState("");
    const [OutstandingOrders, setOutstandingOrders] = useState([]);
    const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

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
        });

        setIsOrderSubmitted(true);
        setCustomerName("");
        setCustomerEmail("");
        setAdventurefuls("");
        setToastYays("");
        setLemonades("");
        setTrefoils("");
        setThinMints("");
    };

    const fetchOutstandingOrders = async () => {
        const querySnapshot = await getDocs(OutstandingOrdersRef);
        const orders = querySnapshot.docs.map(doc => doc.data());
    
        const userOrders = orders.filter(order => order.PlacedBy === UserData.Name);
        setOutstandingOrders(userOrders);
    };

    return (
        <>
            <div className="OrdersMainContainer">
                <div className="OrdersButtonBar">
                    {/* Toggle buttons */}
                    <button className="OrdersButtons" onClick={() => setIsPlacingOrder(!isPlacingOrder)}>Place Order</button>
                    <button className="OrdersButtons"onClick={() => setIsPlacingOrder(false)}>View Orders</button>
                </div>

                {isPlacingOrder && (
                    <NewOrder/>
                )}

                {!isPlacingOrder && ( 
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
                )}
            </div>
        </>
    );
};