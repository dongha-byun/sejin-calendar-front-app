import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import MonitorModelPage from "./MonitorModelPage";

export default function MonitorModel() {
    return (
        <>
            <Helmet>
                <title>호별 생산 내역 조회</title>
            </Helmet>
            <Layout child={
                <MonitorModelPage />
            } />
        </>
    );
}