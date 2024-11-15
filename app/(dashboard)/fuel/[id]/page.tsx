"use client";

import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormHeading from "@/components/FormHeading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FuelType } from "@prisma/client";
import { Fuel } from "lucide-react";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<FuelType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const schema = z.object({
    name: z.string().min(2),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== "new") {
          setLoading(true);
          const response = await axios.get(`/api/fuel/${id}`);
          setData(response.data);
          form.reset(response.data);
        } else {
          return;
        }
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  async function onSubmit(values: z.infer<typeof schema>) {
    setLoading(true);
    try {
      if (data) {
        await axios.put(`/api/fuel/${id}`, values);
        toast.success("تم تعديل الموظف بنجاح");
        router.push("/fuel");
      } else {
        await axios.post("/api/fuel", values);
        toast.success("تم إضافة الموظف بنجاح");
        router.push("/fuel");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <FormHeading
        title="أنواع الوقود"
        subtitle="إدارة أنواع الوقود"
        action="fuel"
        id={data ? data.id : null}
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="px-5 py-10 rounded-xl bg-primary-foreground border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>نوع الوقود</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      Icon={Fuel}
                      placeholder="اسم نوع الوقود"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Button disabled={loading} type="submit" className="px-10">
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
