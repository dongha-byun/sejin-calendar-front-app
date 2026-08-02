import React from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../../Layout";
import EtcRevenuePage from "./EtcRevenuePage";

const EtcRevenue: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>매출현황</title>
            </Helmet>
            <Layout child={<EtcRevenuePage />} />
        </>
    );
};

export default EtcRevenue;
