import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeMain from './pages/HomeMain.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';





import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
import Secret from './pages/Secret.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AllUsers from './pages/AllUsers.jsx';
import ReviewShow from './pages/ReviewShow.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeMain></HomeMain>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/secret',
        element:<ProtectedRoute><Secret></Secret></ProtectedRoute>
      },
      {
        path:'/allusers',
        element:<AllUsers></AllUsers>
      },
      {
        path:'/review/:id',
        element:<ReviewShow></ReviewShow>
      }
  
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    


      <QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  </QueryClientProvider>
  </StrictMode>,
)
