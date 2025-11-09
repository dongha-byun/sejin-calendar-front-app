import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import OrderPaperPage from "./OrderPaperPage";

const OrderPaper: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>용지발주</title>
            </Helmet>
            <Layout child={
                <OrderPaperPage />
            }/>
        </>
        
    );
};

export default OrderPaper;