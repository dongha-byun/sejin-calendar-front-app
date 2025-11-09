import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import CommandBindPage from "./CommandBindPage";


const CommandBind: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>제본지시</title>
            </Helmet>
            <Layout child={
                <CommandBindPage />
            } />
        </>
    );
};

export default CommandBind;