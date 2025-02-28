import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import { DesktopAuthPage } from "./DesktopAuthPage";
import { MobileAuthPage } from "./MobileAuthPage";

export const AuthPage = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <MobileAuthPage /> : <DesktopAuthPage />;
};
