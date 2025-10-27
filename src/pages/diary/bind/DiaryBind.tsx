import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import DiaryBindPage from "./DiaryBindPage";

export default function DiaryBind() {
    return (
        <>
            <Helmet>
                <title>세진정판 - 제본</title>
            </Helmet>
            <Layout child={
                <DiaryBindPage />
            }/>
        </>
    );
};