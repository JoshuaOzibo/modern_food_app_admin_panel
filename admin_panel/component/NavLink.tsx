"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className" | "href"> {
    className?: string;
    activeClassName?: string;
    children: ReactNode;
    to: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
    ({ className, activeClassName, to, children, ...props }, ref) => {
        const pathname = usePathname();
        const isActive = pathname === to;
        const { href, ...rest } = props as any;

        return (
            <Link
                ref={ref}
                href={to}
                className={cn(className, isActive && activeClassName)}
                {...rest}
            >
                {children}
            </Link>
        );
    },
);

NavLink.displayName = "NavLink";

export { NavLink };
