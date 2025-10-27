import { Helmet } from "react-helmet-async";
import Layout from "../../Layout"
import BaseInfoModelPage from "./BaseInfoModelPage";

const BaseInfoModel: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>세진정판 - Model</title>
            </Helmet>
            <Layout child={
                <BaseInfoModelPage />
            } />
        </>
    );
};

export default BaseInfoModel;