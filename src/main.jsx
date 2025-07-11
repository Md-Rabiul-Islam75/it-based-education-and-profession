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
import MockInterview from "./pages/Professional/MockInterview";
import StartInterviewForm from "./pages/Professional/StartInterviewForm";
import JobSite from "./pages/Professional/JobSite";
import ProblemSolvingPage from "./pages/Professional/ProblemSolvingPage";
import CompetitiveProgrammingPage from "./pages/Professional/CompetitiveProgrammingPage/CompetitiveProgrammingPage";
import TopicDetails from "./pages/Professional/CompetitiveProgrammingPage/TopicDetails"
import ResumeBuilder from "./pages/Professional/ResumeBuilder";
import ResumeForm from "./pages/Professional/ResumeBuilder";
import ResumePreview from "./pages/Professional/ResumePreview";



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
        path: "/entireAcademic",
        element: <EntireAcademicTopicListPage></EntireAcademicTopicListPage>,
      },

      {
        path: "/professional",
        element: <ProgrammingStartingPage></ProgrammingStartingPage>,
      },

      {
        path: "/problemSolvingPage",
        element: <ProblemSolvingPage></ProblemSolvingPage>,
      },

      {
        path: "/competitiveProgrammingPage",
        element: <CompetitiveProgrammingPage></CompetitiveProgrammingPage>,
        children: [
          {
            index: true,
            element: <p>Select a topic to get started.</p>,
          },
          {
            path: "topic/:id",
            element: <TopicDetails></TopicDetails>,
          },
        ],
      },

      {
        path: "/mockInterviewForm",
        element: <StartInterviewForm></StartInterviewForm>,
      },

      {
        path: "/mockInterview",
        element: <MockInterview></MockInterview>,
      },

      {
        path: "/jobSite",
        element: <JobSite></JobSite>,
      },
       {
        path: "/resumeBuilder",
        element: <ResumeBuilder></ResumeBuilder>
      },
      {
        path: "/preview",
        element: <ResumePreview></ResumePreview>
      },
      // {
      //   path: "/problem_solving",
      //   element: <PorblemSolvingDetails></PorblemSolvingDetails>
      // },

      {
        path: "/allCtQuestionPage",
        element: <AllSubjectCtQuestionsPage></AllSubjectCtQuestionsPage>,
        loader: () => fetch("http://localhost:8080/api/ctSubject/getall"),
      },

      {
        path: "/ctContainerPage",
        element: <CtContainerPage></CtContainerPage>,
      },

      {
        path: "/ctFormPage",
        element: <CtQuestionsPage></CtQuestionsPage>,
      },

      {
        path: "/allLabSubject",
        element: <AllLabSubject></AllLabSubject>,
        loader: () => fetch("http://localhost:8080/api/lab/labsubject/getall"),
      },

      {
        path: "/labManualDay",
        element: <LabManualDayContainer></LabManualDayContainer>,
      },

      {
        path: "/labOfToday",
        element: <LabTask></LabTask>,
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
        element: <Chatbot2></Chatbot2>,
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
