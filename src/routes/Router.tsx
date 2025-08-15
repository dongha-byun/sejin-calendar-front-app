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
import CommandBind from "../pages/command/bind/CommandBind";
import DiaryMachine from "../pages/diary/machine/DiaryMachine";
import DiaryBind from "../pages/diary/bind/DiaryBind";
import OrderManagerAccept from "../pages/ordermanager/accept/OrderManagerAccept";
import CommandCustomPrint from "../pages/command/customprint/CommandCustomPrint";
import CommandOrderOut from "../pages/command/orderout/CommandOrderOut";
import OrderManagerCancel from "../pages/ordermanager/cancel/OrderManagerCancel";
import OrderManagerReturns from "../pages/ordermanager/returns/OrderManagerReturns";
import MonitorMaterial from "../pages/monitor/material/MonitorMaterial";
import MonitorPaper from "../pages/monitor/paper/MonitorPaper";
import MonitorPrint from "../pages/monitor/print/MonitorPrint";
import MonitorModel from "../pages/monitor/model/MonitorModel";
import MonitorOrder from "../pages/monitor/order/MonitorOrder";
import AdminMember from "../pages/admin/member/AdminMember";
import AdminAuth from "../pages/admin/auth/AdminAuth";
import AdminRule from "../pages/admin/rule/AdminRule";
import DiaryPrint from "../pages/diary/print/DiaryPrint";

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
    },
    {
        path: "/command/bind",
        element: (
            <CommandBind />
        )
    },
    {
        path: "/command/custom-print",
        element: (
            <CommandCustomPrint />
        )
    },
    {
        path: "/command/order-out",
        element: (
            <CommandOrderOut />
        )
    },
    {
        path: "/diary/print", // 작업일지 - 인쇄물입고
        element: (
            <DiaryPrint />
        )
    },
    {
        path: "/diary/machine", // 작업일지 - 정합
        element: (
            <DiaryMachine />
        )
    },
    {
        path: "/diary/bind", // 작업일지 - 제본
        element: (
            <DiaryBind />
        )
    },
    {
        path: "/order-manager/accept", // 주문접수
        element: (
            <OrderManagerAccept />
        )
    },
    {
        path: "/order-manager/cancel", // 주문취소
        element: (
            <OrderManagerCancel />
        )
    },
    {
        path: "/order-manager/returns", // 주문반품
        element: (
            <OrderManagerReturns />
        )
    },
    {
        path: "/monitor/material", // 원자재재고조회
        element: (
            <MonitorMaterial />
        )
    },
    {
        path: "/monitor/paper", // 용지재고조회(용지별)
        element: (
            <MonitorPaper />
        )
    },
    {
        path: "/monitor/print", // 용지재고조회(인쇄소별)
        element: (
            <MonitorPrint />
        )
    },
    {
        path: "/monitor/model", // 호별생산내역조회
        element: (
            <MonitorModel />
        )
    },
    {
        path: "/monitor/orders", // 접수내역 조회
        element: (
            <MonitorOrder />
        )
    },
    {
        path: "/admin/member", // 관리자 - 사용자관리
        element: (
            <AdminMember />
        )
    },
    {
        path: "/admin/auth", // 관리자 - 권한관리
        element: (
            <AdminAuth />
        )
    },
    {
        path: "/admin/auth/rule", // Rule 관리 팝업
        element: (
            <AdminRule />
        )
    }
]);

export default router;