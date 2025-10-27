import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import PutinMaterialPage from "./PutinMaterialPage";

const PutinMaterial: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>세진정판 - 원자재입고</title>
            </Helmet>
            <Layout child={
                <PutinMaterialPage />
            }/>
        </>
    );
};

export default PutinMaterial;