import React from "react";
import Header from "../component/header/Header";

interface Props {
    child?: React.FC;
}

const Layout: React.FC<Props> = ({child}) => {

    return (
        <>
            <Header></Header>
            {child && React.createElement(child)}
        </>
    );
}

export default Layout;