import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import ErrorPage from './Components/ErrorPage';
import Home from './pages/Home';
import AllDevice from './pages/AllDevice';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import AboutUs from './pages/Aboutus';


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
