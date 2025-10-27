import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import CommandCustomPrintPage from "./CommandCustomPrintPage";


const CommandCustomPrint: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>세진정판 - 상호쇄입지시</title>
            </Helmet>
            <Layout child={
                <CommandCustomPrintPage />
            } />
        </>
    );
};

export default CommandCustomPrint;