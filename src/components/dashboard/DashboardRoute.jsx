import { useEffect, useState } from "react";
import { DashboardPage } from "./DashboardPage";
import { MobileDashboardPage } from "./MobileDashboardPage";


const DashboardRoute = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MobileDashboardPage /> : <DashboardPage />;
};

export default DashboardRoute;
