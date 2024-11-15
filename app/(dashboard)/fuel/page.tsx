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
    queryKey: ["fuel"],
    queryFn: async () => {
      const response = await axios.get("/api/fuel");
      return response.data;
    },
  });

  return (
    <div className="space-y-4">
      <Heading
        title={"أنواع الوقود"}
        action={"fuel"}
        subtitle={"إدارة الأنواع"}
        label={"إضافة نوع "}
      />
      <Separator />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="text-red-500">{error.message}</div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default Page;