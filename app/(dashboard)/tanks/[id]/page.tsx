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
import { FuelType, Tank } from "@prisma/client";
import { Fuel } from "lucide-react";
import { MdPropaneTank } from "react-icons/md";
import {
  BsFillFuelPumpDieselFill,
  BsSortNumericDown,
  BsSortNumericUp,
} from "react-icons/bs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Tank | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [fuelTypes, setFuelTypes] = React.useState<FuelType[]>([]);
  const router = useRouter();

  const schema = z.object({
    name: z.string().min(2),
    fuelTypeId: z.string().min(2),
    capacity: z.number().min(1),
    currentLevel: z.number().min(1),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      fuelTypeId: "",
      capacity: 0,
      currentLevel: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fuelTypes = await axios.get("/api/fuel");
        setFuelTypes(fuelTypes.data);
        if (id !== "new") {
          setLoading(true);
          const response = await axios.get(`/api/tanks/${id}`);
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
        await axios.put(`/api/tanks/${id}`, values);
        toast.success("تم تعديل الموظف بنجاح");
        router.push("/tanks");
      } else {
        await axios.post("/api/tanks", values);
        toast.success("تم إضافة الموظف بنجاح");
        router.push("/tanks");
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
        title="خزانات الوقود"
        subtitle="إدارة خزانات الوقود"
        action="tanks"
        id={data ? data.id : null}
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="px-5 py-10 rounded-xl bg-primary-foreground border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 max-w-5xl">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>إسم الخزان</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                        Icon={MdPropaneTank}
                        placeholder="اسم الخزان"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الوقود</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="إختر نوع الوقود" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fuelTypes.map((fuelType) => (
                          <SelectItem key={fuelType.id} value={fuelType.id}>
                            {fuelType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>السعة القصوى</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                        type="number"
                        Icon={BsSortNumericUp}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>المستوى الإبتدائي</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="number"
                        {...field}
                        Icon={BsSortNumericDown}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
