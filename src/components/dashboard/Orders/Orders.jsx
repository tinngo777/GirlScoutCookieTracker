import "./Orders.css";

import { NewOrder } from "./NewOrder"
import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const Orders = () => {
    const { user, loading, UserData } = useAuth();

    const [OutstandingOrders, setOutstandingOrders] = useState([]);
    const [isViewingAllOrders, setViewingAllOrders] = useState(false);
    const [isViewingUserOrders, setViewingUserOrders] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const OutstandingOrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "OutstandingOrders");

    const fetchAllOutstandingOrders = async () => {
        const querySnapshot = await getDocs(OutstandingOrdersRef);
        const orders = querySnapshot.docs.map(doc => doc.data());
    
        const AllOrders = orders.filter(order => order.OrderedBy !== "placeholder");
        setOutstandingOrders(AllOrders);
    };

    const fetchUsersOutstandingOrders = async () => {
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
                    <button className="OrdersButtons" onClick={() => {setIsPlacingOrder(!isPlacingOrder); setViewingUserOrders(false); setViewingAllOrders(false);}}>Place Order</button>
                    <button className="OrdersButtons" onClick={() => {fetchUsersOutstandingOrders(); setIsPlacingOrder(false); setViewingUserOrders(!isViewingUserOrders); setViewingAllOrders(false);}}>View Your Orders</button>
                    <button className="OrdersButtons" onClick={() => {fetchAllOutstandingOrders(); setIsPlacingOrder(false); setViewingUserOrders(false); setViewingAllOrders(!isViewingAllOrders);}}>View All Outstanding Orders</button>
                </div>

                {isPlacingOrder && (
                    <NewOrder/>
                )}

                {isViewingUserOrders && ( 
                    <div className="OutstandingOrders">
                        <h3>Your Orders</h3>
                        <ul className="OutstandingOrderUL">
                            {OutstandingOrders.map((order, index) => (
                                <li className="OutstandingOrderBoxes" key={index}>
                                    <p><b>Customer Name:</b> {order.CustomerName}</p>
                                    <p><b>Customer Email:</b> {order.CustomerEmail}</p>
                                    <p><b>Order Placed:</b> {order.TimeOfOrder}</p>
                                    <p><b>Adventurefuls:</b> {order.Adventurefuls}</p>
                                    <p><b>Caramel Chocolate Chip:</b> {order.CaramelChocolateChip}</p>
                                    <p><b>Caramel deLites:</b> {order.CarameldeLites}</p>
                                    <p><b>Do-si-dos:</b> {order.Dosidos}</p>
                                    <p><b>Girl Scout S'mores:</b> {order.GirlScoutSmores}</p>
                                    <p><b>Lemon Ups:</b> {order.LemonUps}</p>
                                    <p><b>Lemonades:</b> {order.Lemonades}</p>
                                    <p><b>Peanut Butter Patties:</b> {order.PeanutButterPatties}</p>
                                    <p><b>Peanut Butter Sandwhich:</b> {order.PeanutButterSandwhich}</p>
                                    <p><b>Samoas:</b> {order.Samoas}</p>
                                    <p><b>Tagalongs:</b> {order.Tagalongs}</p>
                                    <p><b>Thin Mints:</b> {order.ThinMints}</p>
                                    <p><b>Toast-Yay!:</b> {order.ToastYays}</p>
                                    <p><b>Toffee-tastic:</b> {order.ToffeeTastic}</p>
                                    <p><b>Trefoils:</b> {order.Trefoils}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {isViewingAllOrders && ( 
                    <div className="ViewOrdersSection">
                        {/* Display outstanding orders */}
                        
                            <div className="OutstandingOrders">
                                <h3>All Member Orders</h3>
                                <ul className="OutstandingOrderUL">
                                    {OutstandingOrders.map((order, index) => (
                                        <li className="OutstandingOrderBoxes" key={index}>
                                        <p><b>Placed By:</b> {order.PlacedBy}</p>
                                        <p><b>Customer Name:</b> {order.CustomerName}</p>
                                        <p><b>Customer Email:</b> {order.CustomerEmail}</p>
                                        <p><b>Order Placed:</b> {order.TimeOfOrder}</p>
                                        <p><b>Adventurefuls:</b> {order.Adventurefuls}</p>
                                        <p><b>Caramel Chocolate Chip:</b> {order.CaramelChocolateChip}</p>
                                        <p><b>Caramel deLites:</b> {order.CarameldeLites}</p>
                                        <p><b>Do-si-dos:</b> {order.Dosidos}</p>
                                        <p><b>Girl Scout S'mores:</b> {order.GirlScoutSmores}</p>
                                        <p><b>Lemon Ups:</b> {order.LemonUps}</p>
                                        <p><b>Lemonades:</b> {order.Lemonades}</p>
                                        <p><b>Peanut Butter Patties:</b> {order.PeanutButterPatties}</p>
                                        <p><b>Peanut Butter Sandwhich:</b> {order.PeanutButterSandwhich}</p>
                                        <p><b>Samoas:</b> {order.Samoas}</p>
                                        <p><b>Tagalongs:</b> {order.Tagalongs}</p>
                                        <p><b>Thin Mints:</b> {order.ThinMints}</p>
                                        <p><b>Toast-Yay!:</b> {order.ToastYays}</p>
                                        <p><b>Toffee-tastic:</b> {order.ToffeeTastic}</p>
                                        <p><b>Trefoils:</b> {order.Trefoils}</p>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        
                    </div>
                )}
            </div>
        </>
    );
};