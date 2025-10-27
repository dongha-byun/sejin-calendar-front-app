import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import CommandPaperDeliveryPage from "./CommandPaperDeliveryPage";

const CommandPaperDelivery: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>세진정판 - 용지배송</title>
            </Helmet>
            <Layout child={
                <CommandPaperDeliveryPage />
            } />
        </>
    );
};

export default CommandPaperDelivery;