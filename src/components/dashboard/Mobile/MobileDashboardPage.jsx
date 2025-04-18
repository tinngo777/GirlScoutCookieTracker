import React from "react";
import "./MobileDashboardPage.css";
import Cookie_Logo from "../../../assets/Cookie_Logo.png";
import { useAuth } from "../../auth/AuthContext";


export const MobileDashboardPage = () => {
  const { UserData } = useAuth();

  return (
    <div className="mobile-dashboard-container">
      {/* Header with logo and title */}
      <div className="mobile-dashboard-header">
        <img src={Cookie_Logo} alt="Cookie Logo" className="cookie-logo" />
        <h1 className="title">GSC Management</h1>
      </div>

      {/* User Info */}
      <div className="mobile-user-info">
        <div className="user-icon">👤</div>
        <div className="user-details">
          <p className="user-name"><b>{UserData?.Name || "Username"}</b></p>
          <p className="user-role">{UserData?.TroopRole || "Troop Role"}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mobile-nav-buttons">
        <button>Dashboard</button>
        <button>Inventory</button>
        <button>Booths</button>
        <button>Members</button>
        <button>Messages</button>
        <button>Orders</button>
        <button>Settings</button>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};
