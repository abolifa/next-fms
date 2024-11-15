import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";

const UserIcon = () => {
  return (
    <div className="w-full flex items-center justify-between px-5 relative">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-md font-bold">محمد علي</p>
          <p className="text-xs text-gray-500">مسئول</p>
        </div>
      </div>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button className="absolute left-0 rounded-l-none rounded-r-full bg-teal-500">
            <ArrowLeft />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>admin@gmail.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User />
            <span>الحساب</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            <span>الإعدادات</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            <span>خروج</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserIcon;
