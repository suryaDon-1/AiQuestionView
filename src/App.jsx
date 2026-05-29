import InterviewHistory from "./pages/interviewpages/InterviewHistory.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InterviewSession from "./pages/interviewpages/InterviewSession.jsx";
import Layout from "./components/interviewcomponent/Layout.jsx";
import CreateInterview from "./pages/interviewpages/CreateInterview.jsx";
import InterviewDetail from "./pages/interviewpages/InterviewDetail.jsx";
import Home from "./components/Home.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profile } from "./features/auth/authSlice.js";
import Login from "./pages/authpages/Login.jsx";
import Register from "./pages/authpages/Register.jsx";

function App() {
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  // 1. Create router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <NotFound />, // 404 page
      children: [
        { path: "/dashboard", element: <InterviewHistory /> },
         { path: "/", element:<Home/> },
          { path: "/login", element:<Login/> },
           { path: "/register", element:<Register/> },
        { path: "interviewSession/:id", element: <InterviewSession /> },
        { path: "createInterview", element: <CreateInterview /> },
        { path: "interviewDetails/:id", element: <InterviewDetail /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
