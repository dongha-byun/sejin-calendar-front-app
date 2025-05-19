import { useQuery } from "@tanstack/react-query";
import { menuService } from "../api/menu/menuService";

export const useMenus = () => {
    return useQuery({
        queryKey: ["menus"],
        queryFn: menuService.list,
    });
}