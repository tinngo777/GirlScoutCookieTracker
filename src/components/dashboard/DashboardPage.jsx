import "./Dashboard.css";
import Cookie_Logo from '../../assets/Cookie_Logo.png'
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { signOut} from "firebase/auth";
import { useAuth } from "../auth/AuthContext";

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    
    if (loading) return <p>Loading...</p>;

    const logOut = async () => {
        try {
            await navigate("/GirlScoutCookieTracker/");
            await signOut(auth);
        }catch (err){
            console.error(err);
        }
    }

    return(
        <>
            <div id="MainContainer">
                <div id="NavigationTab">
                    <div id="NavHeader">
                        <img src={Cookie_Logo} id="CookieLogo"/>
                        <p>GS Manager</p>
                    </div>
                    
                    <Link to="/GirlScoutCookieTracker/dashboard">Dashboard</Link>
                    <Link to="/GirlScoutCookieTracker/dashboard">Inventory</Link>
                    <Link to="/GirlScoutCookieTracker/dashboard">Reports</Link>
                    <Link to="/GirlScoutCookieTracker/dashboard">Customers</Link>
                    <Link to="/GirlScoutCookieTracker/dashboard">Messages</Link>
                    <Link to="/GirlScoutCookieTracker/dashboard">Orders</Link>
                    <br></br>
                    <Link to="/GirlScoutCookieTracker/dashboard">Settings</Link>
                    <button onClick={logOut}>Log Out</button>

                </div>

                <div id="RightContainer">
                    <div id="TitleBox">
                        <p> {user.email} Dashboard</p>
                    </div>
                    <div id="OverviewContainer">
                        <div id="SalesOverview">
                            Sales Overview
                        </div>
                        <div id="PurchaseOverview">
                            Purchase Overview
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}