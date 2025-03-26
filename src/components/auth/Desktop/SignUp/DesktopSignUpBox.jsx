import "./DesktopSignUpBox.css"
import Cookie_Logo from '../../../../assets/Cookie_Logo.png';
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../../config/firebase"
import { doc, setDoc} from 'firebase/firestore';

export const DesktopSignUpBox = ({ setHasAccount }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
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

    const signUp = async () => {
        if(name == ""){
            setAuthError("no-name");
        }else{
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
                    
                navigate("/troop");
            }
            catch (err){
                setAuthError(err.code);
                console.error(err);
            }
        }
        
    };

    function EmailErrorComponent({ ErrorCode }) {
        switch (ErrorCode) {
            case 'auth/invalid-email':
            return <p className="DesktopSignUpBoxErrorBox">Invalid Email</p>;

            case 'auth/email-already-in-use':
            return <p className="DesktopSignUpBoxErrorBox">Email Already In Use</p>;

            default:
            return <div style={{ height: "22px" }}></div>;
        }
    }

    function PasswordErrorComponent({ ErrorCode }) {
        switch (ErrorCode) {
            case 'auth/missing-password':
            return <p className="DesktopSignUpBoxErrorBox">Enter Password</p>;

            case 'auth/weak-password':
            return <p className="DesktopSignUpBoxErrorBox">Must Be 6 Characters Long</p>;

            default:
            return <div style={{ height: "22px" }}></div>;
        }
    }

    return(
        <>
            <img src={Cookie_Logo} id="SignUpBoxCookieLogo"/>
            <p id="SignUpBoxLabel"><b>GSC MANAGMENT</b></p>
            <div id="SignUpBoxInnerBox">
        
                    <p>Sign Up Today!</p>
                    <br/>

                    <label>Name</label>
                    <input id="name" type="text" onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && signUp()}/>
                    {AuthError == "no-name" ? (<p className="DesktopSignUpBoxErrorBox">Enter Your Name</p>) : (<div style={{ height: "22px" }}></div>)}

                    

                    <label>Email</label>
                    <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && signUp()}/>
                    <EmailErrorComponent ErrorCode={AuthError}/>

                    
        
                    <label>Password</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && signUp()}/>
                    <PasswordErrorComponent ErrorCode={AuthError}/>
                        
                    <br/>

                    <p id="SignUpBoxDontHaveAccount" onClick={() => setHasAccount(true)}>Already have an account?</p>

                    <button id="SignUpBoxSignUpButton" onClick={signUp}>Sign Up</button>
            </div>
        </>
    );
}