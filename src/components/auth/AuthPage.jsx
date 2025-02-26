import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import Cookie_Logo from '../../assets/Cookie_Logo.png';

import './AuthPage.css';

import { SignUpBox } from "./SignUp/SignUpBox";
import { SignInBox } from "./SignIn/SignInBox";

export const AuthPage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    
    const [hasAccount, setHasAccount] = useState(false);

    return (
        <>
            <div className='AuthMainContainer'>
                
                <div className="AuthBox" id ="AuthLeftBox">
                    <img src={Cookie_Logo} id="AuthLeftCookieLogo"/>
                    <p><b>Order More, Worry Less</b></p>
                    <p><b>Cookie Managment That Eases The Stress</b></p>
                    
                </div>
        
            <div className="AuthBox" id="AuthRightBox">
                <div id="AuthWhiteBox">   
                    {hasAccount ? (
                        <SignInBox setHasAccount={setHasAccount}/> 
                    ) : (
                        <SignUpBox setHasAccount={setHasAccount}/>
                    )}
                    
                </div>
            </div>
        </div>
    </>
    )
}