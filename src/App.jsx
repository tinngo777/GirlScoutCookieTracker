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
    path: '/',
    element: <SignUpPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/signin',
    element: <SignInPage/>,
  },
  {
    path: '/troop',
    element: <PrivateRoute />,
    children: [{ path: "/troop", element: <TroopPage /> }],
  },
  {
    path: '/createTroop',
    element: <PrivateRoute />,
    children: [{ path: "/createTroop", element: <CreateTroopPage /> }],
  },
  {
    path: '/joinTroop',
    element: <PrivateRoute />,
    children: [{ path: "/joinTroop", element: <JoinTroopPage /> }],
  },
  {
    path: '/awaitJoin',
    element: <AwaitJoin/>,
  },
  {
    path: '/dashboard',
    element: <PrivateRoute />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} basename="/GirlScoutCookieTracker/"/>
    </StrictMode>
  </AuthProvider>
  
)