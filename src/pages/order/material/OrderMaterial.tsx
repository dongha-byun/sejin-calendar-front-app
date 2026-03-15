import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import OrderMaterialPage from "./OrderMaterialPage";
import { useSearchParams } from "react-router-dom";
import { BindMethod } from "../../../types/baseinfo/Material";

const OrderMaterial: React.FC = () => {
    const [searchParams] = useSearchParams();
    const bindMethod = searchParams.get("bindMethod") as BindMethod || BindMethod.IRON;
    
    return (
        <>
            <Helmet>
                <title>원자재발주</title>
            </Helmet>
            <Layout child={
                <OrderMaterialPage bindMethod={bindMethod} />
            }/>
        </>
    );
};

export default OrderMaterial;