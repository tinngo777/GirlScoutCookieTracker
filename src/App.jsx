import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthContext'

import { PrivateRoute } from "./components/privateRoute/PrivateRoute"
import { SignUpPage } from "./components/auth/SignUpPage"
import { Dashboard } from './components/dashboard/DashboardPage'
import { SignInPage } from "./components/auth/SignInPage"
import { NotFoundPage } from './components/notFound/NotFoundPage'
import { TroopPage } from './components/troop/TroopPage'
import { CreateTroopPage } from './components/troop/CreateTroopPage'
import { JoinTroopPage } from './components/troop/JoinTroopPage'
import { AwaitJoin } from './components/awaitJoin/AwaitJoin'

const router = createBrowserRouter([
  {
    path: '/GirlScoutCookieTracker/',
    element: <SignUpPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/GirlScoutCookieTracker/signin',
    element: <SignInPage/>,
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
    children: [{ path: "/GirlScoutCookieTracker/dashboard", element: <Dashboard /> }],
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} basename="/GirlScoutCookieTracker"/>
    </StrictMode>
  </AuthProvider>
  
)