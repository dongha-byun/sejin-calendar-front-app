import Layout from "../../Layout";
import OrderPaperPage from "./OrderPaperPage";

const OrderPaper: React.FC = () => {

    return (
        <Layout child={
            <OrderPaperPage />
        }/>
    );
};

export default OrderPaper;