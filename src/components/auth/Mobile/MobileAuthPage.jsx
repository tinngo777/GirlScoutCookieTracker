import "./MobileAuthPage.css"; // Load mobile-specific CSS
import { SplashScreenBox } from "./SplashScreen/SplashScreenBox";
import { MobileSignUpBox } from "./SignUp/MobileSignUpBox";
import { MobileSignInBox } from "./SignIn/MobileSignInBox";

import { useState} from "react";

export const MobileAuthPage = () => {
  const [hasAccount, setHasAccount] = useState(null);
  
  return (
    <div className="MobileAuthMainContainer">
      <div className="MobileAuthBox">
        {hasAccount == null  && <SplashScreenBox setHasAccount={setHasAccount}/>}
        {hasAccount == true  && <MobileSignInBox setHasAccount={setHasAccount}/>}
        {hasAccount == false && <MobileSignUpBox setHasAccount={setHasAccount}/>}
      </div>
    </div>
  );
};
