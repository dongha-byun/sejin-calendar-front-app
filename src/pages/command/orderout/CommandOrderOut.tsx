import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import CommandOrderOutPage from "./CommandOrderOutPage";

export default function CommandOrderOut() {
    return (
        <>
            <Helmet>
                <title>세진정판 - 출고증발행</title>
            </Helmet>
            <Layout child={
                <CommandOrderOutPage />
            } />
        </>
    );
};