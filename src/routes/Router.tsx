import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Layout from "../pages/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/login"} replace />
    },
    {
        path: "/login",
        element: (
            <LoginPage />
        ),
    },
    {
        path: "/main",
        element: (
            <Layout />
        )
    }
]);

export default router;