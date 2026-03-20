import React from "react";
import Header from "../component/header/Header";

interface Props {
    child?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ child }) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
            <div className="shrink-0">
                <Header />
            </div>
            <main className="flex-1 min-h-0 overflow-auto">
                {child}
            </main>
        </div>
    );
};

export default Layout;