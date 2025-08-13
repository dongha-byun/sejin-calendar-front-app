import DynamicTree from "../../../../component/tree/DynamicTree";
import type { MenuItem } from "../../../../types/menu/MenuItem";

interface Props {
    menus: MenuItem[];
}

export default function AdminRuleAllMenuTree({menus}: Props) {

    return (
        <div className="w-60 h-[500px] overflow-y-auto mx-auto p-3 bg-white rounded shadow text-sm leading-tight">
            <h3>전체메뉴리스트</h3>
            <DynamicTree menus={menus} />
        </div>
    );

}