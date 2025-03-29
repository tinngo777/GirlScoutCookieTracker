import "./Orders.css";

import { NewOrder } from "./NewOrder"
import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const Orders = () => {
    const { user, loading, UserData } = useAuth();

    const [OrdersList, setOrdersList] = useState([]);
    const [isViewingAllOrders, setViewingAllOrders] = useState(false);
    const [isViewingUserOrders, setViewingUserOrders] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [MemberList, setMemberList] = useState([]);
    const [SelectedMember, setSelectedMember] = useState();
    const [ReadiedOrder, setRediedOrder] = useState();
    

    const OrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Orders");
    const MembersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Members");

    const MarkOrderAsCompleted = async (OrderID) => {
        const SelectedOrderRef = doc(OrdersRef, OrderID);

        await updateDoc(SelectedOrderRef,{
            ReadyForPickup: true,
        });
        
    }

    const fetchAllOrders = async (Name) => {
        if(Name === "All Members"){
            //Fetch all orders
            const querySnapshot = await getDocs(OrdersRef);
            const orders = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        
            const AllOrders = orders.filter(order => order.id !== "PlaceholderOrder");
            setOrdersList(AllOrders);
            setSelectedMember(Name)
        }else{
            //Fetch selected member's orders
            const querySnapshot = await getDocs(OrdersRef);
            const orders = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        
            const AllOrders = orders
                .filter(order => order.id !== "PlaceholderOrder")
                .filter(order => order.PlacedBy === Name);
            
            setOrdersList(AllOrders);
            setSelectedMember(Name)
        }
        
    };

    const fetchUsersOrders = async () => {
        const querySnapshot = await getDocs(OrdersRef);
        const orders = querySnapshot.docs.map(doc => doc.data());
    
        const userOrders = orders.filter(order => order.PlacedBy === UserData.Name);
        setOrdersList(userOrders);
    };

    useEffect(() => {
        const getMemberList = async () => {
            try{
                const rolePriority = { "Leader": 2, "Co-leader": 1, "Member": 0 }; 

                const data = await getDocs(MembersRef);
                const filteredData = data.docs.map(doc => ({id: doc.id, ...doc.data() }));
                const sortedData = filteredData.sort((a, b) => (rolePriority[b.Role] || 0) - (rolePriority[a.Role] || 0));

                setMemberList(sortedData);
            }catch (err){
                console.error(err);
            }
        }

        getMemberList();
    });

    return (
        <>
            <div className="OrdersMainContainer">
                {UserData.TroopRole === "Leader" || UserData.TroopRole ==- "Co-leader" ? (
                    <div className="OrdersButtonBar">
                        {/* Toggle buttons */}
                        <button className="OrdersButtons" onClick={() => {setIsPlacingOrder(!isPlacingOrder); setViewingUserOrders(false); setViewingAllOrders(false);}}>Place Order</button>
                        <button className="OrdersButtons" onClick={() => {fetchUsersOrders(); setIsPlacingOrder(false); setViewingUserOrders(!isViewingUserOrders); setViewingAllOrders(false);}}>View Your Orders</button>
                        <button className="OrdersButtons" onClick={() => {fetchAllOrders("All Members"); setIsPlacingOrder(false); setViewingUserOrders(false); setViewingAllOrders(!isViewingAllOrders);}}>View All Outstanding Orders</button>
                    </div>
                ):(
                    <div className="OrdersButtonBar">
                        {/* Toggle buttons */}
                        <button className="OrdersButtons" onClick={() => {setIsPlacingOrder(!isPlacingOrder); setViewingUserOrders(false); setViewingAllOrders(false);}}>Place Order</button>
                        <button className="OrdersButtons" onClick={() => {fetchUsersOrders(); setIsPlacingOrder(false); setViewingUserOrders(!isViewingUserOrders); setViewingAllOrders(false);}}>View Your Orders</button>
                    </div>
                )}
                

                {isPlacingOrder && (
                    <NewOrder setIsPlacingOrder={setIsPlacingOrder}/>
                )}

                {isViewingUserOrders && ( 
                    <div className="OutstandingOrders">
                        <h3>Your Orders</h3>
                        <ul className="OutstandingOrderUL">
                            {OrdersList.map((order, index) => (
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
                        <div className="ViewOrdersSectionTopRow">
                            <div>
                                {SelectedMember === "All Members" ? (
                                    <p><b>All Member Orders </b></p>
                                ):(
                                    <p><b>{SelectedMember}'s Orders </b></p>
                                )}
                                
                            </div>
                            <div>
                                <label><b>Sort by member: </b></label>
                                <select name="MemberSelection" id="MemberSelection" defaultValue="All Members" onChange={(e) =>  fetchAllOrders(e.target.value)}>
                                    <option value="" disabled>Choose an Option</option>
                                    <option value="All Members">All members</option>
                                    {MemberList.map((Member) => (
                                        <option key={Member.id} value={Member.Name}>{Member.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                            <div className="OutstandingOrders">
                                <ul className="OutstandingOrderUL">
                                    {OrdersList.map((order, index) => (
                                        <div key={index}>
                                            <li className="OutstandingOrderBoxes" >
                                                <p><b>Placed By:</b> {order.PlacedBy}</p>
                                                <p><b>Customer Name:</b> {order.CustomerName}</p>
                                                <p><b>Customer Email:</b> {order.CustomerEmail}</p>
                                                <p><b>Order Placed:</b> {order.TimeOfOrder}</p>
                                                <hr/>
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
                                            <div className="OrdersMarkReadyBox">
                                                <span>Mark Ready For Pickup</span>
                                                <div>
                                                    <input type="checkbox" onClick={() => MarkOrderAsCompleted(order.id)}></input>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                    ))}
                                </ul>
                            </div>
                        
                    </div>
                )}
            </div>
        </>
    );
};