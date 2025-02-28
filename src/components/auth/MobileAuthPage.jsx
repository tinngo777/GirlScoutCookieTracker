import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import "./MobileAuthPage.css"; // Load mobile-specific CSS

import Cookie_Logo from "../../assets/Cookie_Logo.png";
import GreenBackground from "../../assets/Green.png"; // Import background image

export const MobileAuthPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mobile-container"
      style={{
        backgroundImage: `url(${GreenBackground})`, 
      }}
    >
      <div className="content">
        <h1>GSC Management</h1>
        <img src={Cookie_Logo} className="logo" alt="Logo" />
        <p>Order More, Worry Less – Cookie Management That Eases the Stress!</p>
        
         
        <button className="login-btn" onClick={() => navigate("/mobile-login")}>LOGIN</button>

        
        <a className="signup-link" onClick={() => navigate("/mobile-signup")}>Create an Account</a>
      </div>
    </div>
  );
};
