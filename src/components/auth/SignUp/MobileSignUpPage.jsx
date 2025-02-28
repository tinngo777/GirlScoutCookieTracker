import React from "react";
import "./MobileSignUpPage.css"; // Load mobile-specific CSS

import Cookie_Logo from "../../../assets/Cookie_Logo.png";
import GoogleLogo from "../../../assets/google-logo.png";

export const MobileSignUpPage = () => {
  return (
    <div className="mobile-signup-container">
      <div className="mobile-signup-box">
        <img src={Cookie_Logo} className="logo" alt="Logo" />
        <h1>GS MANAGEMENT</h1>
        <p className="subtitle">Create an account</p>

        <form className="signup-form">
          <label>Name</label>
          <input type="text" placeholder="Enter your name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <p className="password-info">Must be at least 8 characters.</p>

          <button className="signup-btn">Get started</button>

          <p className="login-text">
            Already have an account? <a href="/mobile-login">Log in</a>
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
