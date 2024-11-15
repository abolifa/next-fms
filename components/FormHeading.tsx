import React from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { queryClient } from "@/app/(dashboard)/layout";

interface FormHeadingProps {
  title: string;
  subtitle: string;
  action?: string;
  id?: string | null;
}

const FormHeading: React.FC<FormHeadingProps> = ({
  title,
  subtitle,
  action,
  id,
}) => {
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
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {action && id && (
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
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
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
      )}
    </div>
  );
};

export default FormHeading;
