import "./DashboardBarGraph.css";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, } from "chart.js";
import { useState, useEffect } from "react";
import { doc, collection, addDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { useAuth } from "../../../auth/AuthContext";
import { getDocs } from "firebase/firestore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const DashboardBarGraph = () => {
    const options = {};
    const { UserData } = useAuth();
    const OrdersRef = collection(db, "Troops", `Troop#${UserData.TroopNumber}`, "Orders");
    const [OrdersList, setOrdersList] = useState([]);
    

    const [BarGraphData, setBarGraphData] = useState({
        labels: getPastWeekDays(),
        datasets: [{
            label: "Cookie Orders Placed This Week",
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: "#feb764",
            borderWidth: 0,
        }]
    });

    function getPastWeekDates() {
        const dates = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push(date.toISOString().split('T')[0]); // format: YYYY-MM-DD
        }
        return dates;
    }

    useEffect(() => {
        const fetchOrders = async () => {
            const querySnapshot = await getDocs(OrdersRef);
            let orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            orders = orders.filter(order => order.id !== "PlaceholderOrder");

            const now = new Date();
            const startDate = new Date();
            startDate.setDate(now.getDate() - 6); // last 7 days, including today

            // Create a map to count orders per day
            const dateCounts = {};
            getPastWeekDates().forEach(date => {
                dateCounts[date] = 0;
            });

            orders.forEach(order => {
                const orderDate = new Date(order.TimeOfOrder);
                const orderDateStr = orderDate.toISOString().split('T')[0];
                if (orderDate >= startDate && dateCounts.hasOwnProperty(orderDateStr)) {
                    dateCounts[orderDateStr]++;
                }
            });

            const counts = Object.values(dateCounts);

            setBarGraphData({
                labels: getPastWeekDays(),
                datasets: [{
                    label: "Cookie Orders Placed This Week",
                    data: counts,
                    backgroundColor: "#feb764",
                    borderWidth: 0,
                }]
            });
        };

        fetchOrders();
    }, []);
 
    function orderCounter() {
        //let orderCounts = [0, 0, 0, 0, 0, 0, 0];
        OrdersList.forEach(order => {
            console.log(order.TimeOfOrder)
        });
        
        
    }

    function getPastWeekDays() {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = new Date();
        const todayIndex = today.getDay();
      
        const result = [];
      
        // Add the past 6 days
        for (let i = 6; i >= 1; i--) {
          const dayIndex = (todayIndex - i + 7) % 7;
          result.push(daysOfWeek[dayIndex]);
        }
      
        // Add today at the end
        result.push("Today");
      
        return result;
    }

    return (
        <div className="BarGraphDiv">
            <Bar options={options} data={BarGraphData} />
            
        </div>
    )
}