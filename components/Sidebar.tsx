"use client";

import { cn } from "@/lib/utils";
import {
  Fuel,
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const pages = [
  {
    name: "الرئيسية",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "الموظفين",
    path: "/employees",
    icon: User,
  },
  {
    name: "الخزانات",
    path: "/tanks",
    icon: Fuel,
  },
  {
    name: "طلبات",
    path: "/orders",
    icon: Receipt,
  },
  {
    name: "عمليات",
    path: "/operations",
    icon: Package,
  },
  {
    name: "الإعدادات",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <TooltipProvider>
      <div className="w-auto h-screen p-5 border">
        <div className="flex flex-col items-center gap-6">
          <Link href={"/"} className="mb-5">
            <Image src={"/images/Logo.svg"} height={50} width={50} alt="" />
          </Link>
          {pages.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex gap-2 items-center bg-primary-foreground p-3 rounded-full text-muted-foreground hover:text-primary transition-colors ease-in-out",
                      isActive && "bg-primary text-white hover:text-white"
                    )}
                    key={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
