import { createHashRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/projects";
import Concrete_Project from "./pages/concrete_project";
import Stack from "./pages/stack";
import ErrorPage from "./pages/ErrorPage";
import { projectsLoader } from "./loaders/projectsLoader";
import { projectLoader } from "./loaders/detailsLoader";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Navigate to="/projects" replace /> },
      { path: "projects", element: <Projects />, loader: projectsLoader },
      { path: "project/:projectId", element: <Concrete_Project />, loader: projectLoader },
      { path: "project/:projectId/stack", element: <Stack />, loader: projectLoader },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router