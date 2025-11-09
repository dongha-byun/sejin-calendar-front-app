import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import PutinPaperPage from "./PutinPaperPage";

const PutinPaper: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>용지입고</title>
            </Helmet>
            <Layout child={
                <PutinPaperPage />
            }/>
        </>
        
    );
};

export default PutinPaper;