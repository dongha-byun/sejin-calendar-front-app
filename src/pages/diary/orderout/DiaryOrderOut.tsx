import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import DiaryOrderOutPage from "./DiaryOrderOutPage";

export default function DiaryOrderOut() {
    return (
        <>
            <Helmet>
                <title>세진정판 - 제품출고</title>
            </Helmet>
            <Layout child={
                <DiaryOrderOutPage />
            } />
        </>
    );
}