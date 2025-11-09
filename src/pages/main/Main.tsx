import { Helmet } from "react-helmet-async";
import Layout from "../Layout";

const Main: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>세진정판 - 홈</title>
            </Helmet>
            <Layout />
        </>
    );
};

export default Main;

