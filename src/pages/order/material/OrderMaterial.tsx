import Layout from "../../Layout";
import OrderMaterialPage from "./OrderMaterialPage";

const OrderMaterial: React.FC = () => {

    return (
        <Layout child={
            <OrderMaterialPage />
        }/>
    );
};

export default OrderMaterial;