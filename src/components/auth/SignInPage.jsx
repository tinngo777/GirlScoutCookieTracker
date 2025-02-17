import { useState } from "react";
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
import Cookie_Logo from '../../assets/Cookie_Logo.png'
import "./SignUpPage.css";

export const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const signIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        }
        catch (err){
            console.error(err)
        }
    };
    
    return (
        

        <div className="body">
        <div className="Box" id ="LeftBox">
            <img src={Cookie_Logo} id="LeftCookieLogo"/>
            <p><b>Order More, Worry Less</b></p>
            <p><b>Cookie Managment That Eases The Stress</b></p>
            
        </div>
    
        <div className="Box" id="RightBox">
            <div id="SigninBox">   
                <img src={Cookie_Logo} id="SigninCookieLogo"/>
                <p id="SigninLabel"><b>GS MANAGMENT</b></p>
                <div id="SigninInnerBox">
    
                    <p>  Sign In!</p>
    
                    <label>Email</label>
                    <input id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
    
                    <br></br><br></br>
    
                    <label>Password</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    
                    <br></br><br></br>
    
                    <div id="CheckBoxDiv">
                        <input id="StaySignedIn" type="checkbox"/>
                        <label >Stay Signed In</label>
                    </div>
                    
                    <br></br><br></br>
                    <Link to="/">Don't have an account?</Link>
                    <button id="SigninButton" onClick={signIn}>Sign In</button>
    
                </div>
                
                
            </div>
        </div>
    </div>
    )
}