"use client";

import { ReactNode, useEffect, useState } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Grid3x3,
    Users,
    Star,
    Settings,
    Bell,
    Search,
    Menu,
    ChevronLeft
} from "lucide-react";
import { NavLink } from "../component/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
    children: ReactNode;
}

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ShoppingBag },
    { name: "Products", href: "/products", icon: Package },
    { name: "Categories", href: "/categories", icon: Grid3x3 },
    { name: "Users", href: "/users", icon: Users },
    { name: "Reviews", href: "/reviews", icon: Star },
    { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="min-h-screen w-full flex bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen transition-all duration-300 border-r border-border bg-card",
                    "w-20",
                    !isMobile && sidebarOpen && "md:w-64"
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between px-6 border-b border-border">
                        {sidebarOpen && (
                            <div className="flex items-center gap-2 animate-fade-in">
                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                    <ShoppingBag className="w-5 h-5 text-primary-foreground" />
                                </div>
                                <span className="font-bold text-lg">FoodDash</span>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="ml-auto"
                        >
                            {sidebarOpen ? (
                                <ChevronLeft className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5 md:flex hidden" />
                            )}
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
                                activeClassName="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {sidebarOpen && (
                                    <span className="font-medium animate-fade-in">{item.name}</span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User profile */}
                    {sidebarOpen && (
                        <div className="border-t border-border p-4 animate-fade-in">
                            <div className="flex items-center gap-3 px-3 py-2">
                                <Avatar className="w-9 h-9">
                                    <AvatarImage src="" />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">Joshua</p>
                                    <p className="text-xs text-muted-foreground truncate">Admin</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300",
                    // Mobile: always ml-20, Desktop: toggle based on sidebarOpen
                    "ml-20",
                    !isMobile && sidebarOpen && "md:ml-64"
                )}
            >
                {/* Top bar */}
                <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/80 backdrop-blur-sm">
                    <div className="flex h-full items-center justify-between px-6">
                        {/* Search */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search dishes, restaurants..."
                                    className="pl-10 bg-secondary border-transparent focus:border-primary/50"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                            </Button>
                            <Avatar className="w-9 h-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/50 transition-all">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    JD
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}
