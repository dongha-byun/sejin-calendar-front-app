import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import DiaryPrintPage from "./DiaryPrintPage";

export default function DiaryPrint() {

    return (
        <>
            <Helmet>
                <title>인쇄물입고</title>
            </Helmet>
            <Layout child={
                <DiaryPrintPage />
            } />
        </>
    );
}