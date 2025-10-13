import { FC } from "react";
import {
    Sidebar,
    SidebarGroup,
    SidebarFooter,
    SidebarHeader,
    SidebarContent,
} from "./ui/sidebar";

export const AppSidebar: FC = () => {
    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>

            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>

            <SidebarFooter></SidebarFooter>
        </Sidebar>
    );
};
