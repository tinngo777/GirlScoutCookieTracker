import { useState, useEffect } from "react";
import { DesktopAuthPage } from "./Desktop/DesktopAuthPage";
import { MobileAuthPage } from "./Mobile/MobileAuthPage";

export const AuthPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <MobileAuthPage /> : <DesktopAuthPage />;
};
