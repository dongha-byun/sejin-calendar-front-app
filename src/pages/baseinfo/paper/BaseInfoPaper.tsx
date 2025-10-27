import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import BaseInfoPaperPage from "./BaseInfoPaperPage";

const BaseInfoPaper: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>세진정판 - 용지</title>
            </Helmet>
            <Layout child={
                <BaseInfoPaperPage />
            } />
        </>
    );
}

export default BaseInfoPaper;
