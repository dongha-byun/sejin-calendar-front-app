import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Layout from "../pages/Layout";
import BaseInfoCustomCompany from "../pages/baseinfo/customcompany/BaseInfoCustomCompany";
import BaseInfoMaterial from "../pages/baseinfo/material/BaseInfoMaterial";
import BaseInfoPaper from "../pages/baseinfo/paper/BaseInfoPaper";
import BaseInfoModel from "../pages/baseinfo/model/BaseInfoModel";
import OrderMaterial from "../pages/order/material/OrderMaterial";
import OrderPaper from "../pages/order/paper/OrderPaper";
import PutinMaterial from "../pages/putin/material/PutinMaterial";
import PutinPaper from "../pages/putin/paper/PutinPaper";
import CommandPaperDelivery from "../pages/command/paperdelivery/CommandPaperDelivery";
import CommandPrint from "../pages/command/print/CommandPrint";

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
    },
    {
        path: "/order/paper",
        element: (
            <OrderPaper />
        )
    },
    {
        path: "/putin/material",
        element: (
            <PutinMaterial />
        )
    },
    {
        path: "/putin/paper",
        element: (
            <PutinPaper />
        )
    },
    {
        path: "/command/paper-delivery",
        element: (
            <CommandPaperDelivery />
        )
    },
    {
        path: "/command/print",
        element: (
            <CommandPrint />
        )
    }
]);

export default router;