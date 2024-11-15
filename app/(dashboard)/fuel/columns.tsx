"use client";

import { Button } from "@/components/ui/button";
import { FuelType } from "@prisma/client";
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

export const columns: ColumnDef<FuelType>[] = [
  {
    accessorKey: "name",
    header: "الوقود",
    cell: ({ row }) => {
      const name = row.original.name;
      const id = row.original.id;
      const router = useRouter();
      return (
        <Badge
          className={cn(
            "cursor-pointer",
            name === "وقود طائرات" && "bg-red-500 text-secondary-foreground",
            name === "بنزين" && "bg-green-500 text-secondary-foreground",
            name === "ديزل" && "bg-orange-500 text-secondary-foreground"
          )}
          onClick={() => router.push(`/fuel/${id}`)}
        >
          {name}
        </Badge>
      );
    },
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
        mutationKey: ["employee"],
        mutationFn: async () => {
          await axios.delete(`/api/fuel/${id}`);
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
          queryClient.invalidateQueries({ queryKey: ["fuel"] });
        },
      });
      return (
        <div className="flex items-center justify-end gap-3">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => router.push(`/fuel/${id}`)}
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
