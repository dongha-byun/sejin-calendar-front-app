import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import DiaryPackagingPage from "./DiaryPackagingPage";

export default function DiaryPackaging() {

    return (
        <>
            <Helmet>
                <title>세진정판 - 포장</title>
            </Helmet>
            <Layout child={
                <DiaryPackagingPage />
            } />
        </>
    );
}