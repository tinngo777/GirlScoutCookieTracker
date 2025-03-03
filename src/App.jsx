import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthContext'

//import * as Page from  "./components" maybe
import { PrivateRoute } from "./components/privateRoute/PrivateRoute"
import { AuthPage } from "./components/auth/AuthPage"
import { DashboardPage } from './components/dashboard/DashboardPage'
import { NotFoundPage } from './components/notFound/NotFoundPage'
import { TroopPage } from './components/troop/TroopPage'
import { CreateTroopPage } from './components/troop/CreateTroopPage'
import { JoinTroopPage } from './components/troop/JoinTroopPage'
import { AwaitJoin } from './components/awaitJoin/AwaitJoin'


const router = createBrowserRouter([
  {
    path: '/GirlScoutCookieTracker/',
    element: <AuthPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/GirlScoutCookieTracker/troop',
    element: <PrivateRoute />,
    children: [{ path: "/GirlScoutCookieTracker/troop", element: <TroopPage /> }],
  },
  {
    path: '/GirlScoutCookieTracker/createTroop',
    element: <PrivateRoute />,
    children: [{ path: "/GirlScoutCookieTracker/createTroop", element: <CreateTroopPage /> }],
  },
  {
    path: '/GirlScoutCookieTracker/joinTroop',
    element: <PrivateRoute />,
    children: [{ path: "/GirlScoutCookieTracker/joinTroop", element: <JoinTroopPage /> }],
  },
  {
    path: '/GirlScoutCookieTracker/awaitJoin',
    element: <AwaitJoin/>,
  },
  {
    path: '/GirlScoutCookieTracker/dashboard',
    element: <PrivateRoute />,
    children: [{ path: "/GirlScoutCookieTracker/dashboard", element: <DashboardPage /> }],
  },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} basename="/GirlScoutCookieTracker"/>
    </StrictMode>
  </AuthProvider>
  
)