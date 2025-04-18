import "./Orders.css";

import { NewOrder } from "./NewOrder"
import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useAuth } from "../../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

export const Orders = () => {
    const { user, loading, UserData } = useAuth();

    const [OrdersList, setOrdersList] = useState([]);
    const [isViewingAllOrders, setViewingAllOrders] = useState(false);
    const [isViewingUserOrders, setViewingUserOrders] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [MemberList, setMemberList] = useState([]);
    const [SelectedMember, setSelectedMember] = useState("All Members");
    const [SelectedTime, setSelectedTime] = useState("All Time");
    
    const OrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Orders");
    const MembersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Members");

    const MarkOrderAsCompleted = async (OrderID, IsReady) => {
        const SelectedOrderRef = doc(OrdersRef, OrderID);

        await updateDoc(SelectedOrderRef,{
            ReadyForPickup: !IsReady,
        });

        setOrdersList(prevOrders =>
            prevOrders.map(order =>
                order.id === OrderID ? { ...order, ReadyForPickup: !order.ReadyForPickup } : order
            )
        );
    }

    const MarkOrderAsPickedUp = async (OrderID, IsPickedUp) => {
        console.log("OrderId = " + OrderID);
        const SelectedOrderRef = doc(OrdersRef, OrderID);
        
        await updateDoc(SelectedOrderRef,{
            PickedUpStatus: !IsPickedUp,
        });

        setOrdersList(prevOrders =>
            prevOrders.map(order =>
                order.id === OrderID ? { ...order, PickedUpStatus: !order.PickedUpStatus } : order
            )
        );
    }

    const fetchAndFilterOrders = async (Name, Time) => {
        //Set Variables
        setSelectedMember(Name);
        setSelectedTime(Time);

        //Fetch all orders
        const querySnapshot = await getDocs(OrdersRef);
        let orders = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
        orders = orders.filter(order => order.id !== "PlaceholderOrder");

        //Create time window
        const now = new Date();
        let startDate;

        switch (Time) {
            case 'Today':
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                break;
            case 'Past Week':
                startDate = new Date(now);
                startDate.setDate(now.getDate() - 7);
                break;
            case 'Past Month':
                startDate = new Date(now);
                startDate.setMonth(now.getMonth() - 1);
                break;
            default:
                startDate = new Date(0); // All time
                break;
        }

        //Filter List by timeframe and name
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.TimeOfOrder);
            if(Name === "All Members"){
                return orderDate >= startDate;
            } else {
                return order.PlacedBy === Name && orderDate >= startDate;
            }
            
        });
    
        setOrdersList(filteredOrders);
    }

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
                {UserData.TroopRole === "Leader" || UserData.TroopRole === "Co-leader" ? (
                    <div className="OrdersButtonBar">
                        {/* Toggle buttons */}
                        <button className="OrdersButtons" onClick={() => {setIsPlacingOrder(!isPlacingOrder); setViewingUserOrders(false); setViewingAllOrders(false);}}>Place Order</button>
                        <button className="OrdersButtons" onClick={() => {fetchAndFilterOrders(UserData.Name, "All Time"); setIsPlacingOrder(false); setViewingUserOrders(!isViewingUserOrders); setViewingAllOrders(false);}}>View Your Orders</button>
                        <button className="OrdersButtons" onClick={() => {fetchAndFilterOrders("All Members", "All Time"); setIsPlacingOrder(false); setViewingUserOrders(false); setViewingAllOrders(!isViewingAllOrders);}}>View All Orders</button>
                    </div>
                ):(
                    <div className="OrdersButtonBar">
                        {/* Toggle buttons */}
                        <button className="OrdersButtons" onClick={() => {setIsPlacingOrder(!isPlacingOrder); setViewingUserOrders(false); setViewingAllOrders(false);}}>Place Order</button>
                        <button className="OrdersButtons" onClick={() => {fetchAndFilterOrders(UserData.Name, "All Time"); setIsPlacingOrder(false); setViewingUserOrders(!isViewingUserOrders); setViewingAllOrders(false);}}>View Your Orders</button>
                    </div>
                )}
                

                {isPlacingOrder && (
                    <NewOrder setIsPlacingOrder={setIsPlacingOrder}/>
                )}

                {isViewingUserOrders && ( 
                    <div className="OutstandingOrders">
                        <div className="ViewOrdersSectionTopRow">
                            <p><b>Your Orders From {SelectedTime}</b></p>
                            <div>
                                <label><b>Sort by time: </b></label>
                                <select name="TimeSelection" id="TimeSelection" value={SelectedTime} onChange={(e) =>  fetchAndFilterOrders(UserData.Name, e.target.value)} >
                                    <option value="" disabled>Choose an Option</option>
                                    <option value="Today">Today</option>
                                    <option value="Past Week">Past Week</option>
                                    <option value="Past Month">Past Month</option>
                                    <option value="All Time">All</option>
                                </select>
                            </div>
                            <div>
                                <button className="ClearFiltersButton" onClick={() => {fetchAndFilterOrders(UserData.Name, "All Time")}}>Clear Filters</button>
                            </div>
                        </div>
                        <ul className="OutstandingOrderUL">
                            {OrdersList.map((order, index) => (
                                <div key={index}>
                                    <li className="OutstandingOrderBoxes" >
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
                                    <div className={order.ReadyForPickup == true ? "OrdersMarkReadyBoxReadied":"OrdersMarkReadyBox"} >
                                        {order.ReadyForPickup == true ? (<span>Ready For Pick-up </span>):(<span>Not Ready For Pick-up </span>)}
                                    </div>
                                    <div className={order.PickedUpStatus == true ? "OrdersPickedUp":"OrdersNotPickedUp"} >
                                        {order.PickedUpStatus == true ? (<span>Picked-up: </span>):(<span>Not Picked-up: </span>)}
                                        {order.ReadyForPickup == true ? 
                                        (
                                            <div>
                                                <input type="checkbox" checked={order.PickedUpStatus} onChange={() => MarkOrderAsPickedUp(order.id, order.PickedUpStatus)}></input>
                                            </div>
                                        ):(
                                            <></>
                                        )}  
                                        
                                    </div>
                                </div>
                                
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
                                    <p><b> All Member </b> Orders From <b> {SelectedTime} </b></p>
                                ):(
                                    <p><b> {SelectedMember}'s </b> Orders From <b> {SelectedTime} </b></p>
                                )}
                                
                            </div>
                            <div>
                                <label><b>Sort by time: </b></label>
                                <select name="TimeSelection" id="TimeSelection" value={SelectedTime} onChange={(e) =>  fetchAndFilterOrders(SelectedMember, e.target.value)} >
                                    <option value="" disabled>Choose an Option</option>
                                    <option value="Today">Today</option>
                                    <option value="Past Week">Past Week</option>
                                    <option value="Past Month">Past Month</option>
                                    <option value="All Time">All</option>
                                    
                                </select>
                            </div>
                            <div>
                                <label><b>Sort by member: </b></label>
                                <select name="MemberSelection" id="MemberSelection" value={SelectedMember} onChange={(e) =>  fetchAndFilterOrders(e.target.value, SelectedTime)}>
                                    <option value="" disabled>Choose an Option</option>
                                    <option value="All Members">All members</option>
                                    {MemberList.map((Member) => (
                                        <option key={Member.id} value={Member.Name}>{Member.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="ClearFiltersButton" onClick={() => {fetchAndFilterOrders("All Members", "All Time")}}>Clear Filters</button>
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
                                            <div className={order.ReadyForPickup == true ? "OrdersMarkReadyBoxReadied":"OrdersMarkReadyBox"} >
                                                {order.ReadyForPickup == true ? (<span>Unmark Ready For Pick-up: </span>):(<span>Mark Ready For Pick-up: </span>)}
                                                <div>
                                                    <input type="checkbox" checked={order.ReadyForPickup} onChange={() => MarkOrderAsCompleted(order.id, order.ReadyForPickup)}></input>
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