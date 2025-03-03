import Cookie_Logo from "../../../../assets/Cookie_Logo.png";
import "./SplashScreenBox.css"

export const SplashScreenBox = ({ setHasAccount }) => {
    return(
        <>
            <h1 className="SplashScreenBoxHeader">GSC Management</h1>
            <img src={Cookie_Logo} id="SplashScreenBoxCookieLogo" alt="Logo" />
            <p className="SplashScreenBoxSlogan">Order More, Worry Less – Cookie Management That Eases the Stress!</p>
                     
            <button id="SplashScreenBoxSignInButton" onClick={() => setHasAccount(true)}>Sign In</button>
            
                    
            <a id="SplashScreenBoxCreateAccountButton" onClick={() => setHasAccount(false)}>Create an Account</a>
        </>
    );
}