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
import AcademicPage from './pages/AcademicPage';
import Course from './pages/Course/Course';
import CourseDetails from './Components/Course/CourseDetails';


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
        element: <AllDevice></AllDevice>,
        
      },
      {
        path:"/academic",
        element: <AcademicPage></AcademicPage>,
        loader: () => fetch('http://localhost:8080/api/academicsubject/getall')
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
      },

      {
        path: "academic/course/:subjectName",
        element: <Course />,
        children: [
          {
            path: "/academic/course/:subjectName/:TopicName",
            element: <CourseDetails></CourseDetails>,
            loader: ({params}) => fetch(`http://localhost:8080/api/course/coursedetail/getbyIndexName?SubjectName=${decodeURIComponent(params.subjectName)}&TopicName=${decodeURIComponent(params.TopicName)}`)
          }
        ]
      },

      
      


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
