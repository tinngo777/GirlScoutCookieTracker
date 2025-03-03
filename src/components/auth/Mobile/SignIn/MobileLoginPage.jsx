import React from "react";
import "./MobileLoginPage.css"; // Load mobile-specific CSS

import Cookie_Logo from "../../../../assets/Cookie_Logo.png";
import GoogleLogo from "../../../../assets/google-logo.png";

export const MobileLoginPage = () => {
  
  
  
  
  
  return (
    <div className="mobile-login-container">
      <div className="mobile-login-box">
        <img src={Cookie_Logo} className="logo" alt="Logo" />
        <h1>GS MANAGEMENT</h1>
        <p className="subtitle">Log in to your account</p>

        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="remember-forgot">
            <div className="remember-label">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember for 30 days</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>

          <button className="login-btn">Sign in</button>

          <p className="signup-text">
            Don't have an account? <a href="/GirlScoutCookieTracker/mobile-signup">Sign up</a>
          </p>

          <button className="google-btn">
            <img src={GoogleLogo} alt="Google logo" className="google-logo" />
            Sign in with Google
          </button>

        </form>
      </div>
    </div>
  );
};
