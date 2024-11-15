"use client";

import { Button } from "@/components/ui/button";
import { Tank } from "@prisma/client";
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
import { formatToLiters } from "@/lib/utils";

type ITank = Tank & {
  fuelType: {
    name: string;
  };
};

export const columns: ColumnDef<ITank>[] = [
  {
    accessorKey: "name",
    header: "إسم الخزان",
  },
  {
    accessorKey: "fuelType.name",
    header: "نوع الوقود",
    cell: ({ row }) => (
      <Badge className={"text-md"}>{row.original.fuelType.name}</Badge>
    ),
  },
  {
    accessorKey: "capacity",
    header: "السعة القصوى",
    cell: ({ row }) => (
      <Badge className="text-md bg-green-500 text-secondary-foreground">
        {formatToLiters(row.original.capacity)}
      </Badge>
    ),
  },
  {
    accessorKey: "currentLevel",
    header: "المستوى الإبتدائي",
    cell: ({ row }) => (
      <Badge className="text-md bg-orange-400 text-secondary-foreground">
        {formatToLiters(row.original.currentLevel)}
      </Badge>
    ),
  },
  {
    accessorKey: "created",
    header: "تاريخ الإنشاء",
    cell: ({ row }) => {
      const date = row.original.created;
      return format(new Date(date), "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "updated",
    header: "تاريخ التعديل",
    cell: ({ row }) => {
      const date = row.original.updated;
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
        mutationKey: ["tanks"],
        mutationFn: async () => {
          await axios.delete(`/api/tanks/${id}`);
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
          queryClient.invalidateQueries({ queryKey: ["tanks"] });
        },
      });
      return (
        <div className="flex items-center justify-end gap-3">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => router.push(`/tanks/${id}`)}
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
                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                <AlertDialogDescription>
                  هذا القرار لا يمكن التراجع عنه وسيؤدي إلى إزالة الصنف من قاعدة
                  البيانات نهائياً
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction onClick={() => mutation.mutate()}>
                  استمرار
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
