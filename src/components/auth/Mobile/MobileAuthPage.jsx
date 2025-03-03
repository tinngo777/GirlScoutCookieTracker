import { useNavigate } from "react-router-dom"; // Import navigation
import "./MobileAuthPage.css"; // Load mobile-specific CSS

import Cookie_Logo from "../../../assets/Cookie_Logo.png";
import { useState } from "react";


export const MobileAuthPage = ({ setHasAccount }) => {
  //const [hasAccount, setHasAccount] = useState(false);

  return (
    <div className="MobileAuthMainContainer">
      <div className="MobileAuthBox">
        <h1>GSC Management</h1>
        <img src={Cookie_Logo} id="MobileAuthCookieLogo" alt="Logo" />
        <p>Order More, Worry Less – Cookie Management That Eases the Stress!</p>
        
         
        <button id="MobileSignInButton" onClick={() => navigate("/GirlScoutCookieTracker/mobile-login")}>Sign In</button>

        
        <a id="MobileSignUpButton" onClick={() => navigate("/GirlScoutCookieTracker/mobile-signup")}>Create an Account</a>
      </div>
    </div>
  );
};
