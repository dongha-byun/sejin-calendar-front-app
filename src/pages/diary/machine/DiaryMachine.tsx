import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import DiaryMachinePage from "./DiaryMachinePage";

const DiaryMachine: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>정합</title>
            </Helmet>
            <Layout child={
                <DiaryMachinePage />
            }/>
        </>
    );
};

export default DiaryMachine;