"use client";

import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "@/components/Loading";

const Page = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await axios.get("/api/employees");
      return response.data;
    },
  });

  return (
    <div className="space-y-4">
      <Heading
        title={"الموظفين"}
        action={"employees"}
        subtitle={"إدارة الموظفين"}
        label={"إضافة موظف"}
      />
      <Separator />
      <div className="p-6">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div className="text-red-500">{error.message}</div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default Page;
