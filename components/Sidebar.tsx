"use client";

import { usePathname, useRouter } from "next/navigation";
import UserIcon from "./UserIcon";
import GlobalSearch from "./GlobalSearch";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { BsFuelPumpFill } from "react-icons/bs";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { MdPropaneTank } from "react-icons/md";
import { cn } from "@/lib/utils";

const pages = [
  {
    name: "الرئيسية",
    path: "/",
    icon: MdDashboard,
  },
  {
    name: "الموظفين",
    path: "/employees",
    icon: HiUsers,
    add: "/employees/new",
  },
  {
    name: "أنواع الوقود",
    path: "/fuel",
    icon: BsFuelPumpFill,
    add: "/fuel/new",
  },
  {
    name: " الخزانات",
    path: "/tanks",
    icon: MdPropaneTank,
    add: "/tanks/new",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-64 lg:w-72 p-3">
      <div className="w-full h-full border py-10 rounded-3xl space-y-8">
        <UserIcon />
        <GlobalSearch />
        <div className="flex flex-col items-start w-full px-3 gap-5">
          {pages.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center justify-between w-full py-3 bg-muted rounded-full px-3 relative hover:text-primary transition-colors ease-in-out",
                  isActive && "bg-primary text-secondary hover:text-secondary"
                )}
              >
                <div className="flex items-center justify-start gap-3">
                  <item.icon
                    className={cn(
                      "w-5 h-5 text-primary",
                      isActive && "text-secondary"
                    )}
                  />
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>

                <div>
                  {item.add && (
                    <Button
                      className="absolute left-1 top-1 rounded-full"
                      size={"icon"}
                      variant={"outline"}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.add);
                      }}
                    >
                      <Plus className="text-primary" />
                    </Button>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
