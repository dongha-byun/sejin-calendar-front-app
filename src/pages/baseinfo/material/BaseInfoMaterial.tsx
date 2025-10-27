import React from "react";
import Layout from "../../Layout";
import BaseInfoMaterialPage from "./BaseInfoMaterialPage";
import { Helmet } from "react-helmet-async";

const BaseInfoMaterial: React.FC = () => {

    return (
        <>
            <Helmet>
                <title>세진정판 - 원자재</title>
            </Helmet>
            <Layout child={
                <BaseInfoMaterialPage /> 
            }/>
        </>
    );
};

export default BaseInfoMaterial;