import { Home } from "lucide-react";
import { FC, Fragment } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbEllipsis,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";

export type HistoryBreadcrumbProps = {
    id?: string;
    className?: string;
    maximumCrumbs?: number;
};

export const HistoryBreadcrumb: FC<HistoryBreadcrumbProps> = ({
    id,
    className,
    maximumCrumbs = 3,
}) => {
    const { pathname } = useLocation();
    const crumbs = pathname.split("/").slice(1);

    const visibleCrumbCount = Math.max(crumbs.length - maximumCrumbs + 1, 0);

    return (
        <Breadcrumb id={id} className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/">
                            <Home className="size-4" />
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.length > maximumCrumbs - 1 && (
                    <Fragment>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex items-center gap-1">
                                    <BreadcrumbEllipsis className="size-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="p-2 flex flex-col gap-2"
                                    align="start"
                                >
                                    {crumbs
                                        .slice(0, -maximumCrumbs + 1)
                                        .map((crumb, i) => (
                                            <DropdownMenuItem
                                                key={i}
                                                className="cursor-pointer hover:text-foreground transition-colors"
                                            >
                                                <Link
                                                    to={
                                                        "/" +
                                                        `${crumbs.slice(0, i + 1).join("/")}`
                                                    }
                                                >
                                                    {crumb}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </BreadcrumbItem>
                    </Fragment>
                )}
                {crumbs.slice(visibleCrumbCount).map((crumb, i, array) => (
                    <Fragment key={i}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {i < array.length - 1 ? (
                                <BreadcrumbLink asChild>
                                    <Link
                                        to={
                                            "/" +
                                            `${crumbs.slice(0, visibleCrumbCount + i + 1).join("/")}`
                                        }
                                    >
                                        {crumb}
                                    </Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>{crumb}</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
