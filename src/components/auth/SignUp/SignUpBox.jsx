import "./SignUpBox.css"
import Cookie_Logo from '../../../assets/Cookie_Logo.png';
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../config/firebase"
import { doc, setDoc} from 'firebase/firestore';

export const SignUpBox = ({ setHasAccount }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [redirecting, setRedirecting] = useState(false);
    
    useEffect(() => {
        if (!loading && user && !redirecting) {
            navigate("/GirlScoutCookieTracker/dashboard");
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
                    TroopRole: null,
                    ScoutName: "",
                    CreatedAt: new Date().toISOString(),
                });
                    
                navigate("/GirlScoutCookieTracker/troop");
            }
            catch (err){
                console.error(err)
            }
        };

    return(
        <>
            <img src={Cookie_Logo} id="SignUpBoxCookieLogo"/>
            <p id="SignUpBoxLabel"><b>GS MANAGMENT</b></p>
            <div id="SignUpBoxInnerBox">
        
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

                    <p id="SignUpBoxDontHaveAccount" onClick={() => setHasAccount(true)}>Already have an account?</p>

                    <button id="SignUpBoxSignUpButton" onClick={signUp}>Sign Up</button>
            </div>
        </>
    );
}