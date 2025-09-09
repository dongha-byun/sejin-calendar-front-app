import Layout from "../../Layout"
import BaseInfoModelPage from "./BaseInfoModelPage";

const BaseInfoModel: React.FC = () => {
    return (
        <Layout child={
            <BaseInfoModelPage />
        } />
    );
};

export default BaseInfoModel;