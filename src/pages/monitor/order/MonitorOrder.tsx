import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import MonitorOrderPage from "./MonitorOrderPage";

export default function MonitorOrder() {
    return (
        <>
            <Helmet>
                <title>세진정판 - 접수내역 조회</title>
            </Helmet>
            <Layout child={
                <MonitorOrderPage />
            } />
        </>
    );
}