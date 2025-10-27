import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import CommandPrintPage from "./CommandPrintPage";

const CommandPrint: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>세진정판 - 인쇄지시</title>
            </Helmet>
            <Layout child={
                <CommandPrintPage />
            }/>
        </>
    );
};

export default CommandPrint;