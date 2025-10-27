import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import DiaryPrintCnPage from "./DiaryPrintCnPage";

export default function DiaryPrintCn() {

    return (
        <>
            <Helmet>
                <title>세진정판 - 상호인쇄</title>
            </Helmet>
            <Layout child={
                <DiaryPrintCnPage />
            } />
        </>
    );
}