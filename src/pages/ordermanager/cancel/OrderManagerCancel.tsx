import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import OrderManagerCancelPage from "./OrderManagerCancelPage";

export default function OrderManagerCancel() {
    return (
        <>
            <Helmet>
                <title>주문취소</title>
            </Helmet>
            <Layout child={
                <OrderManagerCancelPage />
            }/>
        </>
    );
}