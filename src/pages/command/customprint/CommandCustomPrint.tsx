import Layout from "../../Layout";
import CommandCustomPrintPage from "./CommandCustomPrintPage";


const CommandCustomPrint: React.FC = () => {

    return (
        <Layout child={
            <CommandCustomPrintPage />
        } />
    );
};

export default CommandCustomPrint;