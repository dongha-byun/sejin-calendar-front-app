import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Layout from "../pages/Layout";
import BaseInfoCustomCompany from "../pages/baseinfo/customcompany/BaseInfoCustomCompany";
import BaseInfoMaterial from "../pages/baseinfo/material/BaseInfoMaterial";
import BaseInfoPaper from "../pages/baseinfo/paper/BaseInfoPaper";
import BaseInfoModel from "../pages/baseinfo/model/BaseInfoModel";
import OrderMaterial from "../pages/order/material/OrderMaterial";

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
    },
    {
        path: "/base-info/custom-company",
        element: (
            <BaseInfoCustomCompany />
        )
    },
    {
        path: "/base-info/material",
        element: (
            <BaseInfoMaterial />
        )
    },
    {
        path: "/base-info/paper",
        element: (
            <BaseInfoPaper />
        )
    },
    {
        path: "/base-info/model",
        element: (
            <BaseInfoModel />
        )
    },
    {
        path: "/order/material",
        element: (
            <OrderMaterial />
        )
    }
]);

export default router;