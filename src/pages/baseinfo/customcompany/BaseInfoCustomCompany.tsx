import React from "react";
import Layout from "../../Layout";
import BaseInfoCustomCompanyPage from "./BaseInfoCustomCampanyPage";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const BaseInfoCustomCompany: React.FC = () => {
    const [searchParams] = useSearchParams();
    const companyType = searchParams.get("type") || undefined;
    const companyName = searchParams.get("name") || undefined;

    return (
        <>
            <Helmet>
                <title>세진정판 - 홈</title>
            </Helmet>
            <Layout child={
                <BaseInfoCustomCompanyPage 
                    companyName={companyName} 
                    companyType={companyType} 
                />
            } />
        </>
    );
}

export default BaseInfoCustomCompany;