
import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import MonitorPrintPage from "./MonitorPrintPage";


export default function MonitorPrint() {
    return (
        <>
            <Helmet>
                <title>용지재고조회(인쇄소별)</title>
            </Helmet>
            <Layout child={
                <MonitorPrintPage />
            }/>
        </>
    );
}