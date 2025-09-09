import Layout from "../../Layout";
import DiaryMachinePage from "./DiaryMachinePage";

const DiaryMachine: React.FC = () => {

    return (
        <Layout child={
            <DiaryMachinePage />
        }/>
    );
};

export default DiaryMachine;