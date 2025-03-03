import "./DesktopSignInBox.css"
import Cookie_Logo from '../../../../assets/Cookie_Logo.png';
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth} from "../../../../config/firebase"


export const DesktopSignInBox = ({ setHasAccount }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!loading && user && !redirecting) {
            navigate("/GirlScoutCookieTracker/dashboard");
        }
    }, [user, loading, navigate, redirecting]);

    const signIn = async () => {
            try{
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/GirlScoutCookieTracker/dashboard");
            }
            catch (err){
                console.error(err)
            }
        };

    return(
        <>
            <img src={Cookie_Logo} id="SignInBoxCookieLogo"/>
            <p id="SignInBoxLabel"><b>GSC MANAGMENT</b></p>
            <div id="SignInBoxInnerBox">
    
                <p>  Sign In!</p>
    
                <br></br>
                
                <label>Email</label>
                <input id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
    
                <br></br><br></br>
    
                <label>Password</label>
                <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                
                <br></br><br></br>

                <p id="SignInBoxHaveAccount" onClick={() => setHasAccount(false)}>Don't have an account?</p>

                <button id="SignInBoxSignInButton" onClick={signIn}>Sign In</button>
    
            </div>
        </>
    );
}