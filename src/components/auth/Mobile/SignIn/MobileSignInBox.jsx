import "./MobileSignInBox.css"; // Load mobile-specific CSS
import Cookie_Logo from "../../../../assets/Cookie_Logo.png";
import GoogleLogo from "../../../../assets/google-logo.png";

import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../../config/firebase";

export const MobileSignInBox = ({ setHasAccount }) => {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [AuthError, setAuthError] = useState("");
  	
	const { user, loading } = useAuth();
	const navigate = useNavigate();
	const [redirecting, setRedirecting] = useState(false);
	  
	useEffect(() => {
		if (!loading && user && !redirecting) {
			navigate("/dashboard");
		}
	}, [user, loading, navigate, redirecting]);
    
 	const signIn = async () => {
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
		}
        catch (err){
          setAuthError(err.code);
          console.error(err)
        }
    };

    return (
        <>
            <img src={Cookie_Logo} className="MobileSignInBoxLogo" alt="Logo" />
            <h1 className="MobileSignInBoxHeader">GS MANAGEMENT</h1>
            <p className="MobileSignInBoxSubtitle">Log in to your account</p>

            <div className="MobileSignInBoxSignInDiv">
                
            <label>Email</label>
            <input id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
            {AuthError == "auth/invalid-email" ? (<p className="MobileSignInBoxErrorBox">Invalid Email</p>) : (<div style={{ height: "19px" }}></div>)}

            <label>Password</label>
            <input id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
            {AuthError == "auth/invalid-credential" ? (<p className="MobileSignInBoxErrorBox">Incorrect Password</p>) : (<div style={{ height: "19px" }}></div>)}

            <div className="MobileSignInBoxRememberForgot">
            <div className="MobileSignInBoxRememberLabel">
                <input type="checkbox" id="MobileSignInBoxRememberCheckbox" />
                <label >Remember Me</label>
            </div>
            <div>
                <p></p>
            </div>
            <div className="MobileSignInBoxForgotPassword">
                <p>Forgot password?</p>
            </div>  
            </div>

            <button id="MobileSignInBoxSignInButton" onClick={signIn}>Sign In</button>

            <div className="MobileSignInBoxSignUpDiv">
            <p className="MobileSignInBoxSignUpText">
                Don't have an account? 
            </p>

            <p className="MobileSignInBoxSignUpButton" >
                <b onClick={() => setHasAccount(false)}>Sign Up</b>
            </p>

            
            </div>
                {/*
                <button className="MobileSignInBoxGoogleButton">
                    <img src={GoogleLogo} alt="Google logo" className="MobileSignInBoxGoogleLogo" />
                    Sign in with Google
                </button>
                */}
            </div>
        </>
    );
};
