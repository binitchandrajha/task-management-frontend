
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/main/DashboardPage";
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
