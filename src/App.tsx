
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/main/DashboardPage";
import { ProjectsPage } from "./pages/main/ProjectsPage";
import { ProjectDetailPage } from "./pages/main/ProjectDetailPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { MainLayout } from "./components/layout/MainLayout";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path:"/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    // App shell: authenticated screens render inside MainLayout's <Outlet />.
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
