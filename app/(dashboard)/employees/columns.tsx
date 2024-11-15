"use client";

import { Button } from "@/components/ui/button";
import { Employee } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "../layout";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "الإسم",
    cell: ({ row }) => {
      const name = row.original.name;
      const id = row.original.id;
      const router = useRouter();
      return (
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/employees/${id}`)}
        >
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "major",
    header: "الفريق",
    cell: ({ row }) => {
      return (
        <Badge className="capitalize bg-teal-500 text-black">
          {row.original.major}
        </Badge>
      );
    },
  },
  {
    accessorKey: "class",
    header: "التخصص",
    cell: ({ row }) => {
      return <Badge className="capitalize">{row.original.class}</Badge>;
    },
  },
  {
    accessorKey: "created",
    header: "تاريخ المباشرة",
    cell: ({ row }) => {
      const date = row.original.startDate;
      return format(new Date(date), "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      const id = row.original.id;
      const router = useRouter();
      const mutation = useMutation({
        mutationKey: ["employee"],
        mutationFn: async () => {
          await axios.delete(`/api/employees/${id}`);
        },
        onMutate: () => {
          toast.loading("جاري الحذف", {
            duration: 1000,
          });
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("تم الحذف بنجاح");
        },
        onError: () => {
          toast.error("فشل الحذف");
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
      });
      return (
        <div className="flex items-center justify-end gap-3">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => router.push(`/employees/${id}`)}
          >
            <Edit />
            تعديل
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size={"sm"}>
                <Trash2 />
                حذف
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutation.mutate()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
