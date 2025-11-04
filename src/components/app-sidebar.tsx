import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, UserCog } from "lucide-react";
import { Link, useLocation } from 'react-router';


// Link = <a></a>
const main_items = [
    {
        title: "Home",
        url: "/main",
        icon: Home
    },
    {
        title: "Users",
        url: "/main/users",
        icon: UserCog
    },
]

export function AppSideBar() {
    const currentPage = useLocation().pathname
    return (
        <Sidebar>
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {
                                main_items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.url === currentPage}>
                                            {/* <Link to="url"><icon here>text here</Link> */}
                                            <Link to={item.url}>
                                                <item.icon/> 
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}