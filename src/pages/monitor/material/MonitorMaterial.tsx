import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import MonitorMaterialPage from "./MonitorMaterialPage";


export default function MonitorMaterial() {
    return (
        <>
            <Helmet>
                <title>세진정판 - 원자재재고조회</title>
            </Helmet>
            <Layout child={
                <MonitorMaterialPage />
            }/>
        </>
    );
}