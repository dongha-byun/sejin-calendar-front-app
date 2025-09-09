import React from "react";
import Layout from "../../Layout";
import BaseInfoMaterialPage from "./BaseInfoMaterialPage";

const BaseInfoMaterial: React.FC = () => {

    return (
        <Layout child={
            <BaseInfoMaterialPage /> 
        }/>
    );
};

export default BaseInfoMaterial;