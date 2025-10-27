
import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import MonitorPaperPage from "./MonitorPaperPage";


export default function MonitorPaper() {
    return (
        <>
            <Helmet>    
                <title>세진정판 - 용지재고조회(용지별)</title>
            </Helmet>
            <Layout child={
                <MonitorPaperPage />
            }/>
        </>
    );
}