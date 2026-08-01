import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import EtcSamplePage from "./EtcSamplePage";

const EtcSample: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>견본</title>
            </Helmet>
            <Layout child={<EtcSamplePage />} />
        </>
    );
};

export default EtcSample;
