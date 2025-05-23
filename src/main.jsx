import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Root from "./Components/Root";
import ErrorPage from "./Components/ErrorPage";
import Home from "./pages/Home";
import AllDevice from "./pages/AllDevice";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import AboutUs from "./pages/Aboutus";
import AcademicPage from "./pages/AcademicPage";
import Course from "./pages/Course/Course";
import CourseDetails from "./Components/Course/CourseDetails";
import AuthProvider from "./providers/AuthProvider";
import EntireAcademicTopicListPage from "./pages/EntireAcademicTopicListPage";
import AllSubjectCtQuestionsPage from "./pages/CtPage/AllSubjectCtQuestionsPage";
import CtQuestionsPage from "./pages/CtPage/CtQuestionsPage";
import CtContainerPage from "./pages/CtPage/CtContainerPage";
import AllLabSubject from "./pages/LabManualPage/AllLabSubject";
import LabManualDayContainer from "./pages/LabManualPage/LabManualDayContainer";
import LabTask from "./pages/LabManualPage/LabTask";
import ProgrammingStartingPage from "./pages/Programming/ProgrammingStartingPage";
import Chatbot2 from "./Components/ChatBot/Chatbot2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/alldevice",
        element: <AllDevice></AllDevice>,
      },

      {
        path:"/entireAcademic",
        element: <EntireAcademicTopicListPage></EntireAcademicTopicListPage>
      },

      {
        path:"/programming",
        element: <ProgrammingStartingPage></ProgrammingStartingPage>
      },

      {
        path: "/allCtQuestionPage",
        element: <AllSubjectCtQuestionsPage></AllSubjectCtQuestionsPage>,
        loader: () => fetch("http://localhost:8080/api/ctSubject/getall")
      },

      {
          path: "/ctContainerPage",
          element: <CtContainerPage></CtContainerPage>
      },

      {
        path: "/ctFormPage",
        element: <CtQuestionsPage></CtQuestionsPage>
      },

      {
        path: "/allLabSubject",
        element: <AllLabSubject></AllLabSubject>,
        loader: () => fetch("http://localhost:8080/api/lab/labsubject/getall")
      },

      {
         path: "/labManualDay",
         element: <LabManualDayContainer></LabManualDayContainer>
      },

      {
        path: "/labOfToday",
        element: <LabTask></LabTask>
      },
    
      {
        path: "/academic",
        element: <AcademicPage></AcademicPage>,
        loader: () => fetch("http://localhost:8080/api/academicsubject/getall"),
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },

      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },

      {
          path: "/chatBot",
          element: <Chatbot2></Chatbot2>
      },

      {
        path: "academic/course/:subjectName",
        element: <Course />,
        children: [
          {
            path: "/academic/course/:subjectName/:TopicName",
            element: <CourseDetails></CourseDetails>,
            loader: ({ params }) =>
              fetch(
                `http://localhost:8080/api/course/coursedetail/getbyIndexName?SubjectName=${decodeURIComponent(
                  params.subjectName
                )}&TopicName=${decodeURIComponent(params.TopicName)}`
              ),
          },
        ],
      },
    ],
  },

  // {
  //   path: "/",
  //   element:
  // }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
