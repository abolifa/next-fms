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
    queryKey: ["tanks"],
    queryFn: async () => {
      const response = await axios.get("/api/tanks");
      return response.data;
    },
  });

  return (
    <div className="space-y-4">
      <Heading
        title={"خزانات الوقود"}
        action={"tanks"}
        subtitle={"إدارة الخزانات"}
        label={"إضافة خزان "}
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
