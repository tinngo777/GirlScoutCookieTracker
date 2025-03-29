import { useState } from "react";
import Cookie_Logo from '../../../assets/Cookie_Logo.png';

import './DesktopAuthPage.css';

import { DesktopSignUpBox } from "./SignUp/DesktopSignUpBox";
import { DesktopSignInBox } from "./SignIn/DesktopSignInBox";

export const DesktopAuthPage = () => {

    const [hasAccount, setHasAccount] = useState(false);
    
    return (
        <>
            <div className='DesktopAuthMainContainer'>
                
                <div className="DesktopAuthBox" id ="DesktopAuthLeftBox">
                    <img src={Cookie_Logo} id="DesktopAuthLeftCookieLogo"/>
                    <p><b>Order More, Worry Less</b></p>
                    <p><b>Cookie Managment That Eases The Stress</b></p>
                    
                </div>
        
            <div className="DesktopAuthBox" id="DesktopAuthRightBox">
                <div id="DesktopAuthWhiteBox">   
                    {hasAccount ? (
                        <DesktopSignInBox setHasAccount={setHasAccount}/> 
                    ) : (
                        <DesktopSignUpBox setHasAccount={setHasAccount}/>
                    )}
                    
                </div>
            </div>
        </div>
    </>
    )
}