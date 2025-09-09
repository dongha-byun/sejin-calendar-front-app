import Layout from "../../Layout";
import PutinPaperPage from "./PutinPaperPage";

const PutinPaper: React.FC = () => {

    return (
        <Layout child={
            <PutinPaperPage />
        }/>
    );
};

export default PutinPaper;