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
import { employeeSchema } from "@/lib/schemas";
import FormHeading from "@/components/FormHeading";
import { Separator } from "@/components/ui/separator";
import {
  Award,
  BookUser,
  Briefcase,
  CalendarIcon,
  Crosshair,
  Figma,
  Joystick,
  Mail,
  Phone,
  Plane,
  Rocket,
  SatelliteDish,
  User,
  Wrench,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Employee } from "@prisma/client";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = React.useState<Employee | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      active: true,
      name: "",
      email: "",
      phone: "",
      major: "else",
      class: "else",
      startDate: new Date(),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== "new") {
          setLoading(true);
          const response = await axios.get(`/api/employees/${id}`);
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

  async function onSubmit(values: z.infer<typeof employeeSchema>) {
    setLoading(true);
    try {
      if (data) {
        await axios.put(`/api/employees/${id}`, values);
        toast.success("تم تعديل الموظف بنجاح");
        router.push("/employees");
      } else {
        await axios.post("/api/employees", values);
        toast.success("تم إضافة الموظف بنجاح");
        router.push("/employees");
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
        title="الموظفين"
        subtitle="إدارة الموظفين"
        action="employees"
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
                  <FormLabel required>الإسم</FormLabel>
                  <FormControl>
                    <Input {...field} Icon={User} placeholder="اسم الموظف" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      Icon={Mail}
                      placeholder="البريد الإلكتروني"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl>
                    <Input {...field} Icon={Phone} placeholder="091XXXXXXX" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الفريق</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفريق" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem icon={Plane} value="akinci">
                        Akinci
                      </SelectItem>
                      <SelectItem icon={Plane} value="tb2">
                        TB2
                      </SelectItem>
                      <SelectItem icon={BookUser} value="hr">
                        موارد بشرية
                      </SelectItem>
                      <SelectItem icon={Briefcase} value="supervisor">
                        مشرف
                      </SelectItem>
                      <SelectItem icon={Award} value="manager">
                        مدير
                      </SelectItem>
                      <SelectItem icon={Figma} value="else">
                        غير ذلك
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التخصص</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التخصص" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem icon={Joystick} value="operator">
                        مشغل
                      </SelectItem>
                      <SelectItem icon={Crosshair} value="payload">
                        كاميرا
                      </SelectItem>
                      <SelectItem icon={Rocket} value="ammunition">
                        تسليح
                      </SelectItem>
                      <SelectItem icon={SatelliteDish} value="avionics">
                        إلكتروني
                      </SelectItem>
                      <SelectItem icon={Wrench} value="mechanics">
                        ميكانيكي
                      </SelectItem>
                      <SelectItem icon={Figma} value="else">
                        غير ذلك
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2.5">
                  <FormLabel>تاريخ المباشرة</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="mr-auto h-4 w-4 text-black" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex items-center justify-end">
            <Button type="submit" className="px-10">
              حفظ
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
