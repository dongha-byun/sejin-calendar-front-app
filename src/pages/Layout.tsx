import React from "react";
import Header from "../component/header/Header";

interface Props {
    child?: React.ReactNode;
}

const Layout: React.FC<Props> = ({child}) => {

    return (
        <>
            <Header></Header>
            {child}
        </>
    );
}

export default Layout;