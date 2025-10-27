import React from "react";
import Header from "../component/header/Header";
import { Helmet } from "react-helmet-async";

interface Props {
    child?: React.ReactNode;
}

const Layout: React.FC<Props> = ({child}) => {

    return (
        <>
            <Helmet>
              <title>세진정판 - 홈</title>
            </Helmet>
            <Header></Header>
            {child}
        </>
    );
}

export default Layout;