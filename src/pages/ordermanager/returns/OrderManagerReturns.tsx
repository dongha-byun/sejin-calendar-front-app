import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import OrderManagerReturnsPage from "./OrderManagerReturnsPage";


export default function OrderManagerReturns() {
    return (
        <>
            <Helmet>
                <title>주문반품</title>
            </Helmet>
            <Layout child={
                <OrderManagerReturnsPage />
            }/>
        </>
    );
}