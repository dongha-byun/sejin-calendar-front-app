import React from "react";
import Layout from "../../Layout";
import BaseInfoCustomCompanyPage from "./BaseInfoCustomCampanyPage";
import { useSearchParams } from "react-router-dom";

const BaseInfoCustomCompany: React.FC = () => {
    const [searchParams] = useSearchParams();
    const companyType = searchParams.get("type") || undefined;
    const companyName = searchParams.get("name") || undefined;

    return (
        <Layout child={
            <BaseInfoCustomCompanyPage 
                companyName={companyName} 
                companyType={companyType} 
            />
        } />
    );
}

export default BaseInfoCustomCompany;