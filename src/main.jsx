import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import ErrorPage from './Components/ErrorPage';
import Home from './Components/Home';
import AllDevice from './Components/Device/AllDevice';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
       
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path:"/alldevice",
        element: <AllDevice></AllDevice>
      },
      {
        path:"/aboutus",
        element: <AboutUs></AboutUs>
      },

      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },

      
      {
      path: "/login",
      element: <Login></Login>
      }


    ]
  },

  


  // {
  //   path: "/",
  //   element: 
  // }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
