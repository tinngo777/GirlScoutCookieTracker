import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { doc, setDoc} from 'firebase/firestore';

import Cookie_Logo from '../../assets/Cookie_Logo.png';
import "./SignUpPage.css";

export const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!loading && user && !redirecting) {
            navigate("/dashboard");
        }
    }, [user, loading, navigate, redirecting]);

    const signUp = async () => {
        try{
            setRedirecting(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            await setDoc(doc(db,"Users", newUser.uid),{
                UserEmail: newUser.email,
                Name: name,
                TroopNumber: null,
                ScoutName: "",
                createdAt: new Date().toISOString(),
            });
                
            navigate("/troop");
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
    
                    <p>  Sign Up Today!</p>
    
                    <label>Email</label>
                    <input id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
    
                    <br></br><br></br>

                    <label>Name</label>
                    <input id="name" type="text" onChange={(e) => setName(e.target.value)}/>
    
                    <br></br><br></br>
    
                    <label>Password</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                    
                    <br></br><br></br>
    
                    <div id="CheckBoxDiv">
                        <input id="StaySignedIn" type="checkbox"/>
                        <label >Stay Signed In</label>
                    </div>
                    
                    <br></br><br></br>
                    <Link to="/signin">Already have an account?</Link>
                    <button id="SigninButton" onClick={signUp}>Sign Up</button>
    
                </div>
                
                
            </div>
        </div>
    </div>
    )
}