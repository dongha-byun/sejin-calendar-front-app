import Layout from "../../Layout";
import CommandPrintPage from "./CommandPrintPage";

const CommandPrint: React.FC = () => {

    return (
        <Layout child={
            <CommandPrintPage />
        }/>
    );
};

export default CommandPrint;