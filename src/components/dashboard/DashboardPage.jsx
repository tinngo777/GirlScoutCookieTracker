import { useState, useEffect } from "react";

import { DesktopDashboardPage } from "./Desktop/DesktopDashboardPage";
import { MobileDashboardPage } from "./Mobile/MobileDashboardPage";

export const DashboardPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? <MobileDashboardPage /> : <DesktopDashboardPage />;
};
