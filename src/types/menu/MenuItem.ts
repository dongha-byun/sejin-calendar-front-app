export interface MenuItem {
    id: string;
    name: string;
    path?: string;
    order: number;
    childMenus?: MenuItem[];
}
