import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import OrderManagerAcceptPage from "./OrderManagerAcceptPage";

export default function OrderManagerAccept() {
    return (
        <>
            <Helmet>
                <title>세진정판 - 주문접수</title>
            </Helmet>
            <Layout child={
                <OrderManagerAcceptPage />
            }/>
        </>
    );
}