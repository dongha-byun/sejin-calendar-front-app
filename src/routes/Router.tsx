import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Main from "../pages/main/Main";
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
import DiaryPrintCn from "../pages/diary/printcn/DiaryPrintCn";
import DiaryPackaging from "../pages/diary/packaging/DiaryPackaging";
import DiaryOrderOut from "../pages/diary/orderout/DiaryOrderOut";
import CommandCustomPrintPrintTemplate from "../pages/command/customprint/print/CommandCustomPrintPrintTemplate";
import CommandOrderOutPrintPreview from "../pages/command/orderout/print/CommandOrderOutPrintPreview";

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
            <Main />
        )
    },
    {
        path: "/base-info/custom-company", // 기초자료 등록 - 거래처
        element: (
            <BaseInfoCustomCompany />
        )
    },
    {
        path: "/base-info/material", // 기초자료 등록 - 원자재
        element: (
            <BaseInfoMaterial />
        )
    },
    {
        path: "/base-info/paper", // 기초자료 등록 - 용지
        element: (
            <BaseInfoPaper />
        )
    },
    {
        path: "/base-info/model", // 기초자료 등록 - 모델
        element: (
            <BaseInfoModel />
        )
    },
    {
        path: "/order/material", // 자재발주 - 원자재발주
        element: (
            <OrderMaterial />
        )
    },
    {
        path: "/order/paper", // 자재발주 - 용지발주
        element: (
            <OrderPaper />
        )
    },
    {
        path: "/putin/material", // 자재입고 - 원자재입고
        element: (
            <PutinMaterial />
        )
    },
    {
        path: "/putin/paper", // 자재입고 - 용지입고
        element: (
            <PutinPaper />
        )
    },
    {
        path: "/command/paper-delivery", // 작업지시 - 용지배송
        element: (
            <CommandPaperDelivery />
        )
    },
    {
        path: "/command/print", // 작업지시 - 인쇄지시
        element: (
            <CommandPrint />
        )
    },
    {
        path: "/command/bind", // 작업지시 - 제본지시
        element: (
            <CommandBind />
        )
    },
    {
        path: "/command/custom-print", // 작업지시 - 상호쇄입
        element: (
            <CommandCustomPrint />
        )
    },
    {
        path: "/command/custom-print/print", // 작업지시 - 상호쇄입
        element: (
            <CommandCustomPrintPrintTemplate />
        )
    },
    {
        path: "/command/order-out", // 작업지시 - 출고증발행
        element: (
            <CommandOrderOut />
        )
    },
    {
        path: "/command/order-out/print/preview", // 작업지시 - 출고증발행 인쇄미리보기 (팝업)
        element: (
            <CommandOrderOutPrintPreview />
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
        path: "/diary/print-cn", // 작업일지 - 상호인쇄
        element: (
            <DiaryPrintCn />
        )
    },
    {
        path: "/diary/packaging", // 작업일지 - 포장
        element: (
            <DiaryPackaging />
        )
    },
    {
        path: "/diary/order-out", // 작업일지 - 제품출고
        element: (
            <DiaryOrderOut />
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
        path: "/monitor/material", // 각종조회 - 원자재재고조회
        element: (
            <MonitorMaterial />
        )
    },
    {
        path: "/monitor/paper", // 각종조회 - 용지재고조회(용지별)
        element: (
            <MonitorPaper />
        )
    },
    {
        path: "/monitor/print", // 각종조회 - 용지재고조회(인쇄소별)
        element: (
            <MonitorPrint />
        )
    },
    {
        path: "/monitor/model", // 각종조회 - 호별생산내역조회
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