import React from "react";
import 'boxicons'
import "./MobileDashboardPage.css";
import Cookie_Logo from "../../../assets/Cookie_Logo.png";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../../config/firebase";
import { signOut} from "firebase/auth";
import { useAuth } from "../../auth/AuthContext";
import { Menu, UserCircle} from "../../../assets/Icons"

import { Dashboard } from "./Dashboard/Dashboard";
import { Inventory } from "./Inventory/Inventory";
import { Booths } from "./Booths/Booths";
import { Members} from "./Members/Members";
import { Messages } from "./Messages/Messages";
import { Orders } from "./Orders/Orders";
import { Settings } from "./Settings/Settings";

export const MobileDashboardPage = () => {
    const { UserData } = useAuth();
    const navigate = useNavigate();
    const [NavToggleIsActive, setNavToggleIsActive] = useState(false);

    const [ActiveTab, setActiveTab] = useState(() => {
        // Try to get from localStorage first
        return localStorage.getItem("ActiveTab") || "Dashboard";
    });

    // Update localStorage every time the tab changes
    useEffect(() => {
        localStorage.setItem("ActiveTab", ActiveTab);
    }, [ActiveTab]);

    const logOut = async () => {
        try {
            await navigate("/");
            await signOut(auth);
        }catch (err){
            console.error(err);
        }
    }

    return (
        <div className="MobileDashboardMainContainer">
            <div className="MobileNavigationBar">
                <div id="Logo">
                    <img src={Cookie_Logo} id="CookieLogo"/>
                    <span><b>GSC Manager</b></span>
                </div>
                <div className="MobileMenuButtonDiv">
                    <Menu className="MobileMenuButton" width="40" height="40" onClick={() => {setNavToggleIsActive(!NavToggleIsActive)}}/>
                </div>
            </div>
            <div className={`MobileNavListBox ${NavToggleIsActive==true ? "Active" : "Inactive"}`}>
                <div id="User">
                    <UserCircle id="UserIcon" size="md"/>
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
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='grid-alt'/>
                            <span className="NavItem">Dashboard</span>
                        </Link>
                    </li>
                    
                    <li>
                        <Link className={`link-style ${ActiveTab=="Inventory" ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("Inventory");
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='package' className={"icon-styles"} />
                            <span className="NavItem">Inventory</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={`link-style ${ActiveTab=="Booths" ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("Booths");
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='store' className={"icon-styles"}/>
                            <span className="NavItem" >Booths</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={`link-style ${ActiveTab=="Members" ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("Members");
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='body' className={"icon-styles"}/>
                            <span className="NavItem" >Members</span>
                        </Link>
                        
                    </li>

                    <li>
                        <Link className={`link-style ${ActiveTab=="Messages" ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("Messages");
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='message-dots' className={"icon-styles"}/>
                            <span className="NavItem" >Messages</span>
                        </Link>
                        
                    </li>

                    <li>
                        <Link className={`link-style ${ActiveTab=="Orders" ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("Orders");
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='food-menu' className={"icon-styles"}/>
                            <span className="NavItem" >Orders</span>
                        </Link>
                    </li>

                    <li>
                        <Link className={`link-style ${ActiveTab=="Settings" ? "active" : ""}`} onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("Settings");
                            setNavToggleIsActive(!NavToggleIsActive);
                        }}>
                            <box-icon name='cog' className={"icon-styles"}/>
                            <span className="NavItem" >Settings</span>
                        </Link>
                        
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
                        
                    </li>
                </ul>
            </div>

            <div className="MobileTabsContainer">
                {ActiveTab === "Dashboard" && <Dashboard/>} 
                {ActiveTab === "Inventory" && <Inventory/>} 
                {ActiveTab === "Booths" && <Booths/>} 
                {ActiveTab === "Members" && <Members/>} 
                {ActiveTab === "Messages" && <Messages/>} 
                {ActiveTab === "Orders" && <Orders/>} 
                {ActiveTab === "Settings" && <Settings/>} 
            </div>
        </div>
    );
};
