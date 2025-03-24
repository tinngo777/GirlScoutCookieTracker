import "./DashboardPage.css";
import 'boxicons'
import Cookie_Logo from '../../assets/Cookie_Logo.png'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { signOut} from "firebase/auth";
import { useAuth } from "../auth/AuthContext";

import { Dashboard } from "./Dashboard/Dashboard";
import { Inventory } from "./Inventory/Inventory";
import { Reports } from "./Reports/Reports";
import { Members} from "./Members/Members";
import { Messages } from "./Messages/Messages";
import { Orders } from "./Orders/Orders";
import { Settings } from "./Settings/Settings";

export const DashboardPage = () => {
    
    const navigate = useNavigate();
    const { user, loading, UserData } = useAuth();
    const [NavToggleIsActive, setNavToggleIsActive] = useState(true);

    //Page visibilities
    const [ActiveTab, setActiveTab] = useState("Dashboard");

    if (loading) return <p>Loading...</p>;

    const NavToggle = () => {
        setNavToggleIsActive(!NavToggleIsActive);
    }

    const logOut = async () => {
        try {
            await navigate("/");
            await signOut(auth);
        }catch (err){
            console.error(err);
        }
    }

    return(
        <>
            <div id="MainContainer">
                <div className={`NavigationSidebar ${NavToggleIsActive ? 'active' : 'inactive'}`}>
                    
                    <div id="NavHeader">
                        <div id="Logo" style={NavToggleIsActive ? {opacity: '1'} : {opacity: '0'}}>
                            <img src={Cookie_Logo} id="CookieLogo"/>
                            <span>GSC Manager</span>
                        </div>  
                        <box-icon name='menu' id="NavToggle" onClick={NavToggle} style={NavToggleIsActive ? {left: "90%"} : {}}></box-icon> 
                    </div>

                    <hr></hr>
                    
                    <div id="User">
                        <box-icon name='user-circle' id="UserIcon" size="md"></box-icon>
                        
                        <div>
                            <p id="Username"><b>{`${UserData ? UserData.Name : "Username"}`}</b></p>
                            <p id="TroopRole">{`${UserData ? UserData.TroopRole : "TroopRole"}`}</p>
                        </div>
                    
                    </div>
                    
                    <hr></hr>
                    
                    <ul>
                        <li>
                            <Link className={`link-style ${ActiveTab=="Dashboard" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Dashboard");
                            }}>
                                <box-icon name='grid-alt'/>
                                <span className="NavItem">Dashboard</span>
                            </Link>
                            <span className="tooltip">Dashboard</span>
                        </li>
                        
                        <li>
                            <Link className={`link-style ${ActiveTab=="Inventory" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Inventory");
                            }}>
                                <box-icon name='package' className={"icon-styles"} />
                                <span className="NavItem">Inventory</span>
                            </Link>
                            <span className="tooltip">Inventory</span>
                        </li>

                        <li>
                            <Link className={`link-style ${ActiveTab=="Reports" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Reports");
                            }}>
                                <box-icon name='paperclip' className={"icon-styles"}/>
                                <span className="NavItem" >Reports</span>
                            </Link>
                            <span className="tooltip" >Reports</span>
                        </li>

                        <li>
                            <Link className={`link-style ${ActiveTab=="Members" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Members");
                            }}>
                                <box-icon name='body' className={"icon-styles"}/>
                                <span className="NavItem" >Members</span>
                            </Link>
                            <span className="tooltip" >Members</span>
                        </li>

                        <li>
                            <Link className={`link-style ${ActiveTab=="Messages" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Messages");
                            }}>
                                <box-icon name='message-dots' className={"icon-styles"}/>
                                <span className="NavItem" >Messages</span>
                            </Link>
                            <span className="tooltip" >Messages</span>
                        </li>

                        <li>
                            <Link className={`link-style ${ActiveTab=="Orders" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Orders");
                            }}>
                                <box-icon name='food-menu' className={"icon-styles"}/>
                                <span className="NavItem" >Orders</span>
                            </Link>
                            <span className="tooltip" >Orders</span>
                        </li>

                        <li>
                            <Link className={`link-style ${ActiveTab=="Settings" ? "active" : ""}`} onClick={(e) => {
                                e.preventDefault();
                                setActiveTab("Settings");
                            }}>
                                <box-icon name='cog' className={"icon-styles"}/>
                                <span className="NavItem" >Settings</span>
                            </Link>
                            <span className="tooltip" >Settings</span>
                        </li>
                        <hr></hr>
                        <li>
                            <Link className={"link-styles"} onClick={(e) => {
                                e.preventDefault();
                                logOut();
                            }}>
                                <box-icon name='log-out' className={"icon-styles"}/>
                                <span className="NavItem" >Logout</span>
                            </Link>
                            <span className="tooltip" >Logout</span>
                        </li>
                    </ul>
                </div>

                <div className = {`RightContainer ${NavToggleIsActive ? 'active' : 'inactive'}`}>
                    
                    {ActiveTab === "Dashboard" && <Dashboard/>} 
                    {ActiveTab === "Inventory" && <Inventory/>} 
                    {ActiveTab === "Reports" && <Reports/>} 
                    {ActiveTab === "Members" && <Members/>} 
                    {ActiveTab === "Messages" && <Messages/>} 
                    {ActiveTab === "Orders" && <Orders/>} 
                    {ActiveTab === "Settings" && <Settings/>} 
                </div>
                
                
            </div>
        </>
    );
}