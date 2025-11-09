import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import OrderMaterialPage from "./OrderMaterialPage";

const OrderMaterial: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>원자재발주</title>
            </Helmet>
            <Layout child={
                <OrderMaterialPage />
            }/>
        </>
    );
};

export default OrderMaterial;