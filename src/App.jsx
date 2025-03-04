import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";

import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import { AuthPage } from "./components/auth/AuthPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";
import { NotFoundPage } from "./components/notFound/NotFoundPage";
import { TroopPage } from "./components/troop/TroopPage";
import { CreateTroopPage } from "./components/troop/CreateTroopPage";
import { JoinTroopPage } from "./components/troop/JoinTroopPage";
import { AwaitJoin } from "./components/awaitJoin/AwaitJoin";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/GirlScoutCookieTracker" element={<AuthPage />} />
          <Route path="/GirlScoutCookieTracker/troop" element={<PrivateRoute><TroopPage /></PrivateRoute>} />
          <Route path="/GirlScoutCookieTracker/createTroop" element={<PrivateRoute><CreateTroopPage /></PrivateRoute>} />
          <Route path="/GirlScoutCookieTracker/joinTroop" element={<PrivateRoute><JoinTroopPage /></PrivateRoute>} />
          <Route path="/GirlScoutCookieTracker/awaitJoin" element={<AwaitJoin />} />
          <Route path="/GirlScoutCookieTracker/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </HashRouter>
    </StrictMode>
  </AuthProvider>
);
