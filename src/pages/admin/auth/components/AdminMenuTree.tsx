import { useEffect } from "react";
import DynamicTree from "../../../../component/tree/DynamicTree";
import type { MenuItem } from "../../../../types/menu/MenuItem";

interface Props {
    data: MenuItem[];
}

export default function AdminMenuTree({data}: Props) {

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div className="w-96 h-96 overflow-y-auto mx-auto p-3 bg-white rounded shadow text-sm leading-tight">
            <DynamicTree menus={data} />
        </div>
    );
}